import { IConstructable } from './constructable.interface'
import { IProvider } from './provider.interface'

export interface IContainer {
  providers: Map<string, unknown>
  resolve<T>(token: string): T
  resolve<T>(provider: IConstructable): T
  provide(provider: IProvider): void
}
