import { AxiosRequestConfig } from "axios";
import queryFunction from "./query-function";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

type IConfig = object

type IArgs<T> = {
    endpoint: string;
    config?: IConfig;
    params?: Record<string, string | number | boolean>;
    refreshEndpoints?: Array<string>
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    httpClientConfiguration?: AxiosRequestConfig;
}

type IPaginatedArgs<T> = IArgs<T> & {
    getNextPageParam: (lastPage: T, allPages: T[]) => number | undefined;
    getPreviousPageParam?: (firstPage: T, allPages: T[]) => number | undefined;
    initialPageParam?: number;
    pageParamKey?: string;
}

const useApiQuery = <T>({
    endpoint,
    httpClientConfiguration,
    params = {},
    config = {}
}: IArgs<T>) => {
    return useQuery({
        queryFn: queryFunction<T>({
            endpoint,
            method: "get",
            httpClientConfiguration,
            params,
        }),
        queryKey: [endpoint, params],
        ...config,
    });
};

const usePaginatedApiQuery = <T>({
    endpoint,
    httpClientConfiguration,
    params = {},
    config = {},
    getNextPageParam,
    getPreviousPageParam,
    initialPageParam = 1,
    pageParamKey = "page",
}: IPaginatedArgs<T>) => {
    return useInfiniteQuery({
        queryFn: ({ pageParam }) =>
            queryFunction<T>({
                endpoint,
                method: "get",
                httpClientConfiguration,
                params: { ...params, [pageParamKey]: pageParam },
            })({} as unknown),
        queryKey: [endpoint, params],
        initialPageParam,
        getNextPageParam,
        getPreviousPageParam,
        ...config,
    });
};

export { useApiQuery, usePaginatedApiQuery };