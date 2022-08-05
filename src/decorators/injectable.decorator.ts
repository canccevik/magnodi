import { container } from '../container'
import { IConstructable } from '../interfaces'
import { DependencyIsNotValidError, ProviderAlreadyExistsError } from '../errors'

export function Injectable() {
  return function (target: IConstructable) {
    Reflect.defineMetadata('token', target.name, target)

    const isProviderExists = container.providers.get(target.name)
    if (isProviderExists) {
      throw new ProviderAlreadyExistsError(target.name)
    }

    const dependencies: IConstructable[] = Reflect.getMetadata('design:paramtypes', target)
    if (!dependencies) {
      const providerInstance = new target() as object
      container.providers.set(target.name, providerInstance)
      Reflect.defineMetadata('token', target.name, providerInstance)
      return
    }

    dependencies.forEach((dependency) => {
      if (!Reflect.hasMetadata('token', dependency)) {
        throw new DependencyIsNotValidError(dependency.name)
      }
    })

    const dependencyInstances = dependencies.map((d) => container.resolve(d))
    const providerInstance = Reflect.construct(target, dependencyInstances)

    container.providers.set(target.name, providerInstance)
    Reflect.defineMetadata('token', target.name, providerInstance)
  }
}
