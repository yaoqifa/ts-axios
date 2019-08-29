import { AxiosRequestConfig, AxiosStatic } from "./types"
import Axios from "./core/Axios"
import { extend } from "./helpers/utils"
import defaults from './defaults'
import mergeConfig from "./core/mergeConfig";

function createInstanse(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstanse(defaults)

axios.create = function create(config: AxiosRequestConfig) {
  return createInstanse(mergeConfig(defaults, config))
}

export default axios