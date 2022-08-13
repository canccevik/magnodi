import { container } from '../container'
import { IConstructable } from '../interfaces'

export function Inject(token?: string) {
  return function (target: object, propertyKey: string | symbol): void {
    const providerType: IConstructable = Reflect.getMetadata('design:type', target, propertyKey)

    Object.defineProperty(target, propertyKey, {
      get: () => (token ? container.resolve(token) : container.resolve(providerType)),
      enumerable: true,
      configurable: true
    })
  }
}
