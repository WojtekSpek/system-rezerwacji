import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export function useUpdateSearch({
    queryKey: pasedQueryKeys,
    queryFn: udateFiltered,
    meta = {},
    getEnabled = undefined,
    onSaveSearch = undefined,
    }, queryClient) {

    const searchedDataQuery = useQuery({
        queryKey: pasedQueryKeys,
        queryFn: udateFiltered,
        meta: meta,
        enabled: getEnabled(),
    }, queryClient);

    useEffect(() => {
        if (onSaveSearch !== undefined 
            && searchedDataQuery?.data 
            && searchedDataQuery?.isSuccess) {
            onSaveSearch(searchedDataQuery?.data, searchedDataQuery?.isSuccess, meta?.queryId);
        }
    }, [searchedDataQuery?.data,
        searchedDataQuery?.isSuccess,
        meta?.queryId,
        meta?.[meta?.queryId]
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

    return searchedData;   
}

