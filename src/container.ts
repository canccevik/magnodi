import 'reflect-metadata'

import { ProviderAlreadyExistsError, ProviderNotFoundError } from './errors'
import { IConstructable, IContainer } from './interfaces'

class Container implements IContainer {
  providers = new Map<string, unknown>()

  resolve<T>(token: string): T
  resolve<T>(provider: IConstructable): T
  resolve<T>(tokenOrProvider: string | IConstructable) {
    if (typeof tokenOrProvider === 'string') {
      const matchedProvider = this.providers.get(tokenOrProvider)

      if (!matchedProvider) {
        throw new ProviderNotFoundError(tokenOrProvider)
      }
      return matchedProvider as T
    }

    const matchedProvider = Array.from(this.providers.values()).find(
      (pv) => tokenOrProvider.name === Reflect.getMetadata('token', pv as object)
    )

    if (!matchedProvider) {
      throw new ProviderNotFoundError(tokenOrProvider.name)
    }
    return matchedProvider
  }

  provide(token: string, value: IConstructable): void {
    const isProviderExists = this.providers.get(token)

    if (isProviderExists) {
      throw new ProviderAlreadyExistsError(token)
    }

    const providerInstance = new value() as object

    this.providers.set(token, providerInstance)
    Reflect.defineMetadata('token', value.name, providerInstance)
  }
}

export const container = new Container()
