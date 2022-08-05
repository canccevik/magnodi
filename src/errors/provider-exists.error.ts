export class ProviderAlreadyExistsError extends Error {
  constructor(providerName: string) {
    super(`Provider already exists: ${providerName}`)
  }
}
