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
  return headers || {}
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach((line) => {
    let [key, val] = line.split(':')
    if (!key) {
      return
    }
    key = key.trim().toLowerCase()
    if (val) {
      val = val.trim()
    }
    parsed[key] =val
  })

  return parsed
}