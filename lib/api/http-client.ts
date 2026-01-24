import axios from 'axios'

const httpClient = axios.create( {
  baseURL          : process.env.NEXT_PUBLIC_API_URL,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers          : { 'Content-Type': 'application/json' },
  maxBodyLength    : 10000000,
  maxContentLength : 10000000,
  maxRedirects     : 5,
  timeout          : 10000,
  validateStatus   : ( status ) => 200 <= status && 300 > status,
  withCredentials  : true,
} )

httpClient.interceptors.request.use( ( request ) => request )

httpClient.interceptors.response.use( ( response ) => response )

export default httpClient
