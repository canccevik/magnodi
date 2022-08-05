export interface IConstructable<T = unknown> {
  new (...args: never[]): T
  readonly prototype: T
}
