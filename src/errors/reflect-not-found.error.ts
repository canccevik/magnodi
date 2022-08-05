export class ReflectNotFoundError extends Error {
  constructor() {
    super(
      `MagnoDI requires "reflect-metadata" package to work. Please import the "reflect-metadata" package at the very first line of your application.`
    )
  }
}
