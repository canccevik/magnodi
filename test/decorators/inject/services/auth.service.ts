import { Inject, Injectable } from '../../../../src/decorators'
import { AdminService } from './admin.service'
import { UserService } from './user.service'

@Injectable()
export class AuthService {
  @Inject()
  public userService!: UserService

  @Inject('admin-service')
  public adminService!: AdminService

  login(username: string, password: string) {
    const user = this.userService.getUserByUsername(username)

    if (!user || user.password !== password) {
      return false
    }
    return true
  }

  loginAsAdmin(username: string, password: string) {
    return this.adminService.login(username, password)
  }
}
