import { Injectable } from '../../../../src/decorators'

@Injectable()
export class CarService {
  cars = [{ id: 1, brand: 'BMW', model: 'i8' }]

  getCars() {
    return this.cars
  }
}
