import { Injectable } from '../../../../src/decorators'

export type User = { id: number; username: string; password: string }

@Injectable()
export class UserService {
  public users: User[] = [{ id: 1, username: 'canccevik', password: 'can123' }]

  public getUsers(): User[] {
    return this.users
  }

  public getUserByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username)
  }
}
