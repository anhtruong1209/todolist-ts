export interface ILoginParams {
  email: string
  password: string
  rememberMe: boolean
}

export interface ILoginValidation {
  email: string
  password: string
}

export interface IRegisterParams {
  id: number
  email: string
  password: string
  repeatPassword: string
  name: string
  gender: string
  avatar: string
  region: number
  state: number
  description: string
  createdAt: string
  updatedAt: string
  token: string
}

export type TType = {
  todoList: string[]
}
