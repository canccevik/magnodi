export class ProviderNotFoundError extends Error {
  constructor(providerName: string) {
    super(`Provider cannot found for ${providerName}`)
  }
}
