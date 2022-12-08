import { CarService } from './car.service'
import { Injectable } from '../../../../src'

@Injectable()
export class GarageService {
  constructor(private readonly carService: CarService) {}

  public getCars(): object[] {
    return this.carService.getCars()
  }
}
