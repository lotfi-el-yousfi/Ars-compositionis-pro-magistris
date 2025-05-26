import axios from 'axios'
import { IUser } from '../../model/IUser'

export const UpdateUser = async (user: IUser): Promise<any> => {
  try {
    const response = await axios.put<IUser>('/user', user)
    return response.data
  } catch (error) {
    throw new Error('Failed to update user profile. Please try again.')
  }
}
export const fetchUsers = async (): Promise<any> => {
  try {
    const response = await axios.get<IUser>('/users')
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch users  . Please try again.')
  }
}
