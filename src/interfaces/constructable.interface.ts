export interface IConstructable<T = any> {
  new (...args: any[]): T
  readonly prototype: T
}
