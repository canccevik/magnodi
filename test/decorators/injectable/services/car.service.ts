import { Injectable } from '../../../../src/decorators'

@Injectable()
export class CarService {
  public cars = [{ id: 1, brand: 'BMW', model: 'i8' }]

  public getCars(): object[] {
    return this.cars
  }
}
