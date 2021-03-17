import { Socket } from 'socket.io'
import { UserPayload } from '../routes/auth/UserPayload'

export default interface SecureSocket extends Socket {
  payload?: UserPayload
}