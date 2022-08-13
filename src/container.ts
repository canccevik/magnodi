import 'reflect-metadata'

import { ProviderAlreadyExistsError, ProviderNotFoundError } from './errors'
import { IConstructable } from './interfaces'

class Container {
  public providers = new Map<string, unknown>()

  public resolve<T>(token: string): T
  public resolve<T>(provider: IConstructable): T
  public resolve<T>(tokenOrProvider: string | IConstructable): T {
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
    return matchedProvider as T
  }

  public provide(token: string, value: IConstructable): void {
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
