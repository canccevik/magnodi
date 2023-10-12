import { INJECTABLE_METADATA } from './constants'
import { Constructable, InjectionToken } from './interfaces'

class ContainerHost {
  public providers = new Map<InjectionToken, unknown>()

  public resolve<T>(token: InjectionToken): T {
    const providerName = (token as Constructable).name || token
    const provider = this.providers.get(token) as T

    if (!provider) {
      throw new Error(`Provider cannot found for ${providerName}`)
    }
    return provider
  }

  public provide(token: InjectionToken, provider: Constructable): void {
    const providerName = (token as Constructable).name || token
    const isProviderExists = this.providers.get(token)

    if (isProviderExists) {
      throw new Error(`Provider already exists: ${providerName}`)
    }

    const providerDependencies = Reflect.getMetadata(
      'design:paramtypes',
      provider
    ) as Constructable[]

    const dependencyInstances: Constructable[] =
      providerDependencies?.map((dependency) => {
        const dependencyToken = Reflect.getMetadata(INJECTABLE_METADATA, dependency)
        return this.resolve(dependencyToken || dependency)
      }) || []

    const providerInstance = Reflect.construct(provider, dependencyInstances)
    this.providers.set(token, providerInstance)
  }
}

export const Container = new ContainerHost()
