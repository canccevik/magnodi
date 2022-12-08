import { InjectionToken } from '../interfaces'

export class ProviderAlreadyExistsError extends Error {
  constructor(providerName: InjectionToken) {
    super(`Provider already exists: ${providerName}`)
  }
}
