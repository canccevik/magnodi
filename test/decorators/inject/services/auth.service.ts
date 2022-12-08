import { Inject, Injectable } from '../../../../src'
import { AdminService } from './admin.service'
import { UserService } from './user.service'

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService!: UserService

  constructor(@Inject('admin-service') private readonly adminService: AdminService) {}

  public login(username: string, password: string): boolean {
    const user = this.userService.getUserByUsername(username)

    if (!user || user.password !== password) {
      return false
    }
    return true
  }

  public loginAsAdmin(username: string, password: string): boolean {
    return this.adminService.login(username, password)
  }
}
