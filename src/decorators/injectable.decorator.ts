import { Container } from '../../src'
import { IConstructable, InjectionToken } from '../interfaces'
import { INJECTABLE_METADATA } from '../constants'

export function Injectable(token?: string): ClassDecorator {
  return function (target: object) {
    if (token) {
      Reflect.defineMetadata(INJECTABLE_METADATA, token, target)
    }
    Container.provide((token || target) as InjectionToken, target as IConstructable)
  }
}
