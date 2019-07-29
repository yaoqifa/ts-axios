import { isPlainObject } from './utils'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach((name) => {
    if(name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  const contentType = 'Content-Type'
  normalizeHeaderName(headers, contentType)
  if (isPlainObject(data)) {
    if (headers && !headers[contentType]) {
      headers[contentType] = 'application/json;charset=utf-8'
    }
  }
  return headers
}