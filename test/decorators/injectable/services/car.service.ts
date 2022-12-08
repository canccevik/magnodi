import { Injectable } from '../../../../src'

@Injectable('car-service')
export class CarService {
  public readonly cars = [{ id: 1, brand: 'BMW', model: 'i8' }]

  public getCars(): object[] {
    return this.cars
  }
}
