import { Injectable } from '../../../../src'

@Injectable('admin-service')
export class AdminService {
  public login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      return true
    }
    return false
  }
}
