import {type AxiosRequestConfig} from "axios";
import httpClient from "./http-client";


export type IMethod = "get" | "post" | "put" | "delete" | "patch";

type IArgs<T> = {
    endpoint: string
    method: IMethod;
    httpClientConfiguration?: AxiosRequestConfig;
    params?: Record<string, string | number | boolean>;
};

const queryFunction = <T, P = unknown>({
    endpoint,
    method,
    params,
    httpClientConfiguration = undefined,
  }: IArgs<T>) => {
    return async (args: P): Promise<T> => {
      const { id, queryKey, ...rest } = params ?? {};
  
      const isGet = method === 'get';
  
      let url = id ? `${endpoint}/${id}` : endpoint;
  
      if (isGet && Object.keys(rest).length > 0) {
        url += `?${new URLSearchParams(rest as Record<string, string>).toString()}`;
      }
  
      const data = queryKey ? rest : args;
  
      const response = isGet
        ? await httpClient[method](url, httpClientConfiguration)
        : await httpClient[method](
            url,
            { ...rest, ...(data as object) },
            httpClientConfiguration,
          );
  
      return response.data;
    };
  };

export default queryFunction;