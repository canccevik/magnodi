import { Container } from '../../src'
import { IConstructable, InjectionToken } from '../interfaces'

export function Inject(token?: InjectionToken): Function {
  return function (target: object, propertyKey: string | symbol, parameterIndex: number): void {
    let providerType: IConstructable = Reflect.getMetadata('design:type', target, propertyKey)

    if (!providerType) {
      providerType = (Reflect.getMetadata('design:paramtypes', target) as IConstructable[]).at(
        parameterIndex
      ) as IConstructable
    }

    const providerInstance = Container.resolve(token || providerType)

    Object.defineProperty(target, propertyKey, {
      get: () => providerInstance,
      enumerable: true,
      configurable: true
    })
  }
}
