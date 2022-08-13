import { CarService } from './car.service'
import { Injectable } from '../../../../src/decorators'

@Injectable()
export class GarageService {
  constructor(private carService: CarService) {}

  public getCars(): object[] {
    return this.carService.getCars()
  }
}
