import { Injectable } from '../../../../src/decorators'

@Injectable()
export class UserService {
  users = [{ id: 1, username: 'canccevik', password: 'can123' }]

  getUsers() {
    return this.users
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username)
  }
}
