
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toaster } from "../components/ui/toaster";

/**
 * 
 * hook wyświetlający Chakra UI toast zależnie od statusu
 * zapytania do bazy.
 * 
 * 
 * Użycie:
 * updateFunc()
 * przyjmuje: 1 obiekt z wartościami
 * zwraca: wynik zapytania

  const updateFunc = async ({valueName1: value1, valueName1: value1}) => {
    return axios.put(`/group/${id}/group-training/${valueName1}`, {
      valName: val1 
     });
   };

 *
 * optimisticSetterFunc()
 * przyjmuje: 2 obiekty, old - stare dane, i obiekt z nową wartością
 * zwraca: nowy objekt z zaktualizowanymi wartościami
 * 
  
  const optimisticSetterFunc = (old, {valueName1: vauel1, valueName1: value1}) => {
     return old.map((value) => 
      val1 !== undefined
      ? {...value, valName1: val1}
      : {...value});
  };

 *
 * useUpdateData()
 * przyjmuje: tablicę z kluczami stanu, 
 * funkcję wysyłającą zapytanie,
 * funkcję ustawiającą wartość optymistyczną
 * communikaty wyświetlane na status 'loading', 'success', 'error' 
 * zwraca: obiekt useMutation z react-query
 *
 
  const updateMutation = useUpdateData(
     ['keyDataName'], // klucz stanu 
     updateFunc, // funkcja aktualizująca dane w bazie   
     optimisticSetterFunc, // funkcja ustawiająca wartość 'optymistyczną'
     { loading: { description: "Proszę czekać, trwa zapisywanie..." },
       success: { description: "Wartości zostały zaktualizowane." },
       error: { description: "Błędna aktualizacja wartości." } // komunikaty statusu 'loading', 'success' i 'error'
     },
   );
  
 *
 * updateMutation.mutate( )
 * pryjmuje: 1 obiekt z nazwami i wartościami argumentów
 * 
  
  updateMutation.mutate({vaueName1: value1, valueName2: value2});

*/

export function updateObject(oldObj, newObj) {
  const output = { ...oldObj };

  for (const key in newObj) {
    if (newObj[key] !== undefined) {
      output[key] = newObj[key]; // Nadpisujemy tylko jeśli nie jest undefined
    }
  }

  return output;
};

const toasterName = "loading-toaster";

export function useUpdateData(
    queryKeys, // klucz zapytania, dostępu do obiektu w cache
    updateValues, // funkcja wywołująca zapytanie    
    optimisticValueSetter, // funkcja ustawiająca wartość optymistyczną
    comunicates, // komunikaty 'loading', 'success' i 'error'
    clearCache = false, // flaga, do czyszczenia cachu React Queries
  ) {
   
    const queryClient = useQueryClient();
    let singleQueryKey = undefined;
    console.log(" useUpdateData()", {queryKeys, updateValues, optimisticValueSetter});
    const updateMutation = useMutation({
        mutationFn: updateValues,  
        // Gdy 'mutate()' jest wywołane:
        onMutate: async (values) => {
          // Wyświetlenie toastu o rozpoczęciu operacji
          
          singleQueryKey = values.singleQueryKey;
          let tempKey = undefined;
          if (singleQueryKey !== undefined) {
            if (Array.isArray(singleQueryKey)) {
              tempKey = [...queryKeys, ...singleQueryKey];
            }
            else {
              tempKey = [...queryKeys, singleQueryKey];
            }
          }
          else {
            tempKey = [...queryKeys];
          }
          const multiKey = tempKey;
          
          if (optimisticValueSetter) {
            console.warn({cmd: "cancelQueries on mutate", key: multiKey});

            // Anuluj ponowne pobieranie
            // (żeby nie nadpisało optymistycznego pobrania)
            await queryClient.cancelQueries({ queryKey: multiKey });
          }

          // Zapisz poprzednią wartość
          const previousValue = (optimisticValueSetter) 
            ? queryClient.getQueryData(multiKey) 
            : undefined;
          
          // Optymistycznie ustaw wartość  
          if (optimisticValueSetter !== undefined) {        
            console.warn({cmd: "setQueryData on mutate", key: multiKey});
            queryClient.setQueryData(multiKey, (old) => {
              const updatedValues = optimisticValueSetter(old, values, multiKey);
              return updatedValues ?? old; // Zawsze zwracaj tablicę, nigdy `undefined`
          });
          }


          toaster.promise(
            new Promise(( ) => { }),
            { loading : 
              { 
                title: "Zapisuję ...", description: comunicates.loading.description, 
                duration: null,   
                type: 'loading',    
                id: toasterName,
          } });
    
          // Zwraca zapisaną wartość optymistyczną
          return {previousValue, multiKey};
        },
        // Jeżeli mutacja zawiedzie
        // Uzyj konteksu z zapisaną poprednio wartością
        // Nie udało się pobrać godzin dla zajęć grupowych
        onError: (error, values, context) => {
          const {previousValue, multiKey} = context;
          toaster.update(toasterName,
            { title: 'Błąd!', description:  comunicates.error.description,
              type: 'error',
              action : { label: "Zamknij",
                onClick: () => (toaster.remove(toasterName)),
            } } ); 
    
          if (optimisticValueSetter) {
            // cofnij zapis 'optymistyczny' i załaduj poprzednią wartość
            queryClient.setQueryData(multiKey, () => previousValue);          
            console.warn(previousValue);
            console.warn({ onError: "onErrorCallback", context} );
          }
          
          if (context?.onErrorCallback ) {
            context.onErrorCallback();
          }

          // usuwa cache react query, powoduje natychmiastowe odświeżenie
          if (clearCache) {
            queryClient.removeQueries(multiKey);
          }
          
          console.warn({cmd: "invalidating query onError", key: multiKey});
          // Pobierz wartość ponownie
          queryClient.invalidateQueries(multiKey);    
          
        },
        // Udało się pobrać vartość
        onSuccess: (data, variables, context) => {
          const { multiKey } = context;
          // usuwa cache react query, powoduje natychmiastowe odświeżenie
          if (clearCache) {
            console.warn({cmd: "removing query", key: multiKey});
            queryClient.removeQueries(multiKey);
          }
          
          console.warn({cmd: "invalidating query onSuccess", key: multiKey});

          // Pobieraj zapisaną wartość
          queryClient.invalidateQueries(multiKey);
          
          toaster.update(toasterName,
            { title: "Sukces!", description: comunicates.success.description,
              type: 'success',
              duration: 1200
            } );
            console.warn({ onSuccess: "onSuccessCallback", context} );

            if (context?.onSuccessCallback) {
              context.onSuccessCallback();
            }
        },
    });

    return updateMutation;
}