export interface IUserRecord {
  username: string
  id: string
  created_at: Date
  password_hash: string
  email: string
}

export type IUser = Omit<IUserRecord, 'password_hash'>

export interface UserData {
  data: IUser
  access_token: string
  refresh_token: string
}
