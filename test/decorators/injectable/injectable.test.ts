import { Container } from '../../../src/index'
import { CarService } from './car.service'
import { GarageService } from './garage.service'

describe('Injectable Decorator', () => {
  test('should inject dependencies to the provider', () => {
    const garageService = Container.resolve<GarageService>(GarageService)
    const carService = Container.resolve<CarService>(CarService)

    const cars = garageService.getCars()

    expect(carService.cars).toEqual(cars)
  })
})
