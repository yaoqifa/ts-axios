export type Method = 'get' | 'GET' | 'post' | 'POST' | 'delete' | 'DELETE' |
  'put' | 'PUT' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'patch' | 'PATCH'
export interface AxiosRequestConfig {
  url: string
  method?: Method
  params?: any
  data?: any
  headers?: any
}