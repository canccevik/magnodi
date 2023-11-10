import { Container } from '../container'
import { Constructable, InjectionToken } from '../types'

export function Inject(token?: InjectionToken): Function {
  return function (target: object, propertyKey: string | symbol, parameterIndex: number): void {
    let providerType: Constructable = Reflect.getMetadata('design:type', target, propertyKey)

    if (!providerType) {
      providerType = (Reflect.getMetadata('design:paramtypes', target) as Constructable[]).at(
        parameterIndex
      ) as Constructable
    }

    const providerInstance = Container.resolve(token || providerType)

    Object.defineProperty(target, propertyKey, {
      get: () => providerInstance,
      enumerable: true,
      configurable: true
    })
  }
}
