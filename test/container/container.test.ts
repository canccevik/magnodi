import { Container } from '../../src'
import { UserService } from './services/user.service'

describe('Container Class', () => {
  beforeEach(() => Container.providers.clear())

  test('should providers array to be defined', () => {
    expect(Container.providers).toBeDefined()
  })

  test('should provide the provider', () => {
    Container.provide('user-service', UserService)

    const userService = Container.providers.get('user-service') as UserService

    expect(userService).toEqual(new UserService())
    expect(userService.getUsers()).toEqual(userService.users)
  })

  test('should throw error when provide any provider with existing token', () => {
    const provideUserService = (): void => {
      Container.provide('user-service', UserService)
    }

    provideUserService()

    expect(provideUserService).toThrow()
  })

  test('should resolve the provider by token', () => {
    Container.provide('user-service', UserService)

    const userService = Container.resolve<UserService>('user-service')

    expect(userService).toEqual(new UserService())
    expect(userService.getUsers()).toEqual(userService.users)
  })

  test('should throw error when trying to resolve the provider with nonexistent token', () => {
    const resolveNonexistentService = (): void => {
      Container.resolve<UserService>('user-service')
    }

    expect(resolveNonexistentService).toThrow()
  })

  test('should resolve the provider by passing provider', () => {
    Container.provide(UserService, UserService)

    const userService = Container.resolve<UserService>(UserService)

    expect(userService).toEqual(new UserService())
    expect(userService.getUsers()).toEqual(userService.users)
  })

  test('should throw error when trying to resolve the provider by passing nonexistent provider', () => {
    const resolveNonexistentService = (): void => {
      Container.resolve<UserService>(UserService)
    }

    expect(resolveNonexistentService).toThrow()
  })
})
