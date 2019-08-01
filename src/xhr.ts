import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {data = null, method = 'get', url, headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }

    Object.keys(headers).forEach((key) => {
      if (data === null && key.toLowerCase() === 'content-type') {
        delete headers[key]
      } else {
        request.setRequestHeader(key, headers[key])
      }
    })

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      // 只读属性 XMLHttpRequest.status 返回了XMLHttpRequest 响应中的数字状态码。status 的值是一个无符号短整型。
      // 在请求完成前，status的值为0。值得注意的是，如果 XMLHttpRequest 出错，浏览器返回的 status 也为0。
      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      if (request.status >= 200 && request.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request faild with status code ${request.status}`))
      }
    }

    // 处理网络错误
    request.onerror = function handleError() {
      reject(new Error('Network Error'))
    }

    // 处理超时错误
    request.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of ${timeout} ms exceeded `))
    }

    request.send(data)
  })
}