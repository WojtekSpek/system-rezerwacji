import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export function useUpdateSearch({
    queryKey: pasedQueryKeys,
    queryFn: udateFiltered,
    meta = {},
    getEnabled = undefined,
    onSaveSearch = undefined,
    modifiedObject = {}, 
    }, queryClient) {

    const searchedDataQuery = useQuery({
        queryKey: pasedQueryKeys,
        queryFn: udateFiltered,
        meta: meta,
        enabled: getEnabled(),
    }, queryClient);

    console.log("USEEFFECT ",  [searchedDataQuery?.data,
        searchedDataQuery?.isSuccess,
        modifiedObject
        ]);
    useEffect(() => {
        if (!!onSaveSearch) {
            onSaveSearch(searchedDataQuery?.data, searchedDataQuery?.isSuccess, meta);        
        }
    },  [searchedDataQuery?.data,
        searchedDataQuery?.isSuccess,
        modifiedObject
        ]
    );

    const handleOnSearch = (searchCallback) => {
        if (searchCallback !== undefined) {
            searchCallback();           
        }
    };

    const searchedData = {
        ...searchedDataQuery,
        handleOnSearch: handleOnSearch,
    };

    const additionalQueryKey = {};
    for ( const [key, value] of Object.entries(meta?.queryObj)) {
        if (key === String(meta?.queryId)) {
            additionalQueryKey[key] = {...value, isLoading: searchedData?.isLoading};
        }
        else {
            additionalQueryKey[key] = {...value};
        }
    };  

    return {...searchedData, isLoadingSingleQuery: additionalQueryKey};   
}

