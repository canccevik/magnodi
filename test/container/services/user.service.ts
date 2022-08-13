export type User = { id: number; username: string; password: string }

export class UserService {
  public users: User[] = [{ id: 1, username: 'canccevik', password: 'can123' }]

  public getUsers(): User[] {
    return this.users
  }
}
