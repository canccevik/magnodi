import { IConstructable } from './constructable.interface'

export interface IProvider {
  token: string
  value: IConstructable
}
