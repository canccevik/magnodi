import { container } from '../container'
import { IConstructable } from '../interfaces'

export function Inject(token?: string) {
  return function (target: object, propertyKey: string | symbol) {
    if (token) {
      Object.defineProperty(target, propertyKey, {
        get: () => container.resolve(token),
        enumerable: true,
        configurable: true
      })
      return
    }

    const provider: IConstructable = Reflect.getMetadata('design:type', target, propertyKey)

    Object.defineProperty(target, propertyKey, {
      get: () => container.resolve(provider),
      enumerable: true,
      configurable: true
    })
  }
}
