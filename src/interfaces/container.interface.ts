import { IConstructable } from './constructable.interface'

export interface IContainer {
  providers: Map<string, unknown>
  resolve<T>(token: string): T
  resolve<T>(provider: IConstructable): T
  provide(token: string, value: IConstructable): void
}
