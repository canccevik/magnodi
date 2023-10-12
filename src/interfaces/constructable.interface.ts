export interface Constructable<T = any> extends Function {
  new (...args: any[]): T
}
