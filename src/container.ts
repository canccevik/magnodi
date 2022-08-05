import 'reflect-metadata'

import { ProviderAlreadyExistsError, ProviderNotFoundError } from './errors'
import { IConstructable, IContainer, IProvider } from './interfaces'

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

  provide(provider: IProvider): void {
    const isProviderExists = this.providers.get(provider.token)

    if (isProviderExists) {
      throw new ProviderAlreadyExistsError(provider.token)
    }

    const providerInstance = new provider.value() as object

    this.providers.set(provider.token, providerInstance)
    Reflect.defineMetadata('token', provider.value.name, providerInstance)
  }
}

export const container = new Container()
