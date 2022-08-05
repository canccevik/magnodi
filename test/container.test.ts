import { Container } from '../src/index'
import { UserService } from './utils/services'

describe('Container Class', () => {
  beforeEach(() => Container.providers.clear())

  test('should providers array to be defined', () => {
    expect(Container.providers).toBeDefined()
  })

  test('should provide the provider', () => {
    Container.provide({ token: 'user-service', value: UserService })

    const userService = Container.providers.get('user-service') as UserService

    expect(userService).toEqual(new UserService())
    expect(userService.getUsers()).toEqual(userService.users)
  })

  test('should throw error when provide any provider with existing token', () => {
    const provideUserService = () => {
      Container.provide({ token: 'user-service', value: UserService })
    }

    provideUserService()

    expect(provideUserService).toThrow()
  })

  test('should resolve the provider by token', () => {
    Container.provide({ token: 'user-service', value: UserService })

    const userService = Container.resolve<UserService>('user-service')

    expect(userService).toEqual(new UserService())
    expect(userService.getUsers()).toEqual(userService.users)
  })

  test('should throw error when trying to resolve the provider with nonexistent token', () => {
    const resolveNonexistentService = () => {
      Container.resolve<UserService>('user-service')
    }

    expect(resolveNonexistentService).toThrow()
  })

  test('should resolve the provider by passing provider', () => {
    Container.provide({ token: 'user-service', value: UserService })

    const userService = Container.resolve<UserService>(UserService)

    expect(userService).toEqual(new UserService())
    expect(userService.getUsers()).toEqual(userService.users)
  })

  test('should throw error when trying to resolve the provider by passing nonexistent provider', () => {
    const resolveNonexistentService = () => {
      Container.resolve<UserService>(UserService)
    }

    expect(resolveNonexistentService).toThrow()
  })
})
