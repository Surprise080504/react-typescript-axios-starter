import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const ACCESS_TOKEN = 'access_token';

const isTokenValid = (token: string) => {
  try {
    const decoded: { exp: number } = jwtDecode(token)
    return new Date(decoded.exp * 1000) > new Date()
  } catch {
    return false
  }
}

const login = (token: string) => {
  Cookies.set(ACCESS_TOKEN, token)
}

const logout = () => {
  Cookies.remove(ACCESS_TOKEN)
}

const getToken = () => Cookies.get(ACCESS_TOKEN)

const isAuthenticated = () => {
  const token = getToken()

  if (!token) {
    return false
  }
  return true // isTokenValid(token)
}

export default {
  login,
  logout,
  getToken,
  isAuthenticated,
  isTokenValid,
}

