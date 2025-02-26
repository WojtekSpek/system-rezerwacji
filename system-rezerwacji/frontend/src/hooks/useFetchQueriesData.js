
import { useEffect } from "react";
import { useQueries } from "@tanstack/react-query";

/**
 * 
 * Propozycja zmian:
 *    utworzyć 1 hook:
 *    - hook do useFetchQueryData - jedno zapytanie, pobranie danych i zarządza nimi
 *    - hook do useFetchQueriesData - seria zapytań, pobranie n danych i zarząda nimi
 *  
 */

export function useFetchQueriesData(hookProvider) {
    const { saveDependency, 
        combineFunc, 
        queriesToExec, 
        queryComponentClient,
        combinedSetter } = hookProvider;
    const allQueriesResult = useQueries(queriesToExec);

    // flaga oznaczająca czy grupy są pobrane
    const isLoadingAll = allQueriesResult.map((query) => (query.isLoading))
        .every((query) => (query));
        
    // flaga sygnalizująca, że dane trenerów grup są pobrane
    const allSuccessWithData = Array.isArray(allQueriesResult) &&
        allQueriesResult.length > 0 &&
        allQueriesResult.every((query) => query && query.isSuccess && query.data);

    
    const refetchAll = async (groups) => {   
        queryComponentClient.invalidateQueries({ queryKey: [queriesToExec.queryKey[0]], exact: true});
    };

    useEffect(() => { 
        if (allSuccessWithData) {   
            const trainersData = allQueriesResult.reduce(combineFunc, {});
            combinedSetter(trainersData); // Aktualizujemy stan
        }
    }, [allQueriesResult]);   
    
    // Uruchamiamy, gdy 'allSuccessWithData', 'projectGroups' się zmienią    
    return { 
        refetchFunc: refetchAll, 
        isLoading: isLoadingAll,
        isAllSucceed: allSuccessWithData,
        isError: allQueriesResult.isError,
        error: allQueriesResult.error,
    };
}