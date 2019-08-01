export type Method = 'get' | 'GET' | 'post' | 'POST' | 'delete' | 'DELETE' |
  'put' | 'PUT' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'patch' | 'PATCH'
export interface AxiosRequestConfig {
  url: string
  method?: Method
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}