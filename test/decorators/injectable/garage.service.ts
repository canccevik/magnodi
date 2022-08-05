import { CarService } from './car.service'
import { Injectable } from '../../../src/decorators'

@Injectable()
export class GarageService {
  constructor(private carService: CarService) {}

  getCars() {
    return this.carService.getCars()
  }
}
