export interface IConstructable<T = unknown> {
  new (...args: unknown[]): T
  readonly prototype: T
}
