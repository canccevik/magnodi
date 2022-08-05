export class UserService {
  users = [{ id: 1, username: 'canccevik', password: 'can123' }]

  getUsers() {
    return this.users
  }
}
