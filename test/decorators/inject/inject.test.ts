import { Container } from '../../../src'
import { AuthService } from './services/auth.service'

describe('Inject Decorator', () => {
  test('should inject provider into the property by provider', () => {
    const authService = Container.resolve<AuthService>(AuthService)

    const isLoggedInSuccessfully = authService.login('canccevik', 'can123')

    expect(true).toEqual(isLoggedInSuccessfully)
  })

  test('should inject provider into the property by token', () => {
    const authService = Container.resolve<AuthService>(AuthService)

    const isAdmin = authService.loginAsAdmin('admin', 'admin')

    expect(true).toEqual(isAdmin)
  })
})
