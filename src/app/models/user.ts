export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  types: string
  username: string
  password?: string
  repeatPassword?: string
}
