import { AxiosRequestConfig } from "../types"
import { isPlainObject, deepMerge } from "../helpers/utils";

const strats = Object.create(null)

function defaultStratFn(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2StratFn(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 === 'undefined') {
    return val1
  }

}

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2StratFn
})

const stratKeysFromDeepMerge = ['headers', 'auth']
stratKeysFromDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(config1: AxiosRequestConfig, config2: AxiosRequestConfig): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }
  const config = Object.create(null)

  for (const key in config2) {
    mergeField(key)
  }

  for (const key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const stratFn = strats[key]  || defaultStratFn
    config[key] = stratFn(config1[key], config2![key])
  }
  return config
}