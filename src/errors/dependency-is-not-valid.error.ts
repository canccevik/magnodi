export class DependencyIsNotValidError extends Error {
  constructor(dependencyName: string) {
    super(`Dependency is not found: ${dependencyName}. Provide it to the container!`)
  }
}
