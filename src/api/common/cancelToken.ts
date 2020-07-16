import axios from 'axios'

const CancelToken = axios.CancelToken

export default function (cb: any): any {
  return new CancelToken(cb)
}
