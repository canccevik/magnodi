export class AdminService {
  login(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      return true
    }
    return false
  }
}
