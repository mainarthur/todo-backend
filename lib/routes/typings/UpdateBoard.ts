import { Types } from 'mongoose'

export default interface UpdateBoard {
  name: string
  id: Types.ObjectId
}