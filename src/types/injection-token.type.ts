import { AbstractConstructable } from './abstract-constructable.type'
import { Constructable } from './constructable.type'

export type InjectionToken<T = any> =
  | string
  | Constructable<T>
  | AbstractConstructable<T>
  | CallableFunction
