import { InjectionToken } from '../interfaces'

export class ProviderNotFoundError extends Error {
  constructor(providerName: InjectionToken) {
    super(`Provider cannot found for ${providerName}`)
  }
}
