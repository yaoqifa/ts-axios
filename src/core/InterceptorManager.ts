/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 20:18:14
 * @LastEditTime: 2019-08-08 20:32:10
 * @LastEditors: Please set LastEditors
 */
import { ResolveFn, RejectFn } from '../types'

interface Interceptor<T> {
  resolved: ResolveFn<T>
  rejected?: RejectFn

}

export default class InterceptorManager<T> {

  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolveFn<T>, rejected?: RejectFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(it => {
      if (it !== null) {
        fn(it)
      }
    })
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}