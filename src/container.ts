import 'reflect-metadata'
import { INJECTABLE_METADATA } from './constants'

import { ProviderAlreadyExistsError, ProviderNotFoundError } from './errors'
import { IConstructable, InjectionToken } from './interfaces'

class Container {
  public providers = new Map<InjectionToken, unknown>()

  public resolve<T>(token: InjectionToken): T {
    const providerName = (token as IConstructable).name || token
    const provider = this.providers.get(token) as T

    if (!provider) {
      throw new ProviderNotFoundError(providerName)
    }
    return provider
  }

  public provide(token: InjectionToken, provider: IConstructable): void {
    const providerName = (token as IConstructable).name || token
    const isProviderExists = this.providers.get(token)

    if (isProviderExists) {
      throw new ProviderAlreadyExistsError(providerName)
    }

    const providerDependencies = Reflect.getMetadata(
      'design:paramtypes',
      provider
    ) as IConstructable[]

    const dependencyInstances: IConstructable[] =
      providerDependencies?.map((dependency) => {
        const dependencyToken = Reflect.getMetadata(INJECTABLE_METADATA, dependency)
        return this.resolve(dependencyToken || dependency)
      }) || []

    const providerInstance = Reflect.construct(provider, dependencyInstances)
    this.providers.set(token, providerInstance)
  }
}

export const container = new Container()
