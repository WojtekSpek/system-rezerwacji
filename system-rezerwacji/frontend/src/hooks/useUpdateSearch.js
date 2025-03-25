import { useEffect, useState } from "react";
import React from "react";
import { useQuery } from "@tanstack/react-query";

export function useUpdateSearch({
    queryKey: pasedQueryKeys,
    queryFn: udateFiltered,
    meta = {},
    getEnabled = undefined,
    onSaveSearch = undefined,
    }) {

    const searchedDataQuery = useQuery({
        queryKey: pasedQueryKeys,
        queryFn: udateFiltered,
        meta: meta,
        enabled: getEnabled(),
    });

    const updateSearchedEffect = useEffect(() => {
        if (onSaveSearch !== undefined) {
            onSaveSearch(searchedDataQuery.data, searchedDataQuery.isSuccess);
        }
    }, [searchedDataQuery?.isSuccess 
        , meta?.queryObj
        , meta?.queryId]);

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

