import { useSelector, useDispatch } from 'react-redux'

import {
  login as loginAuth,
  logout as logoutAuth,
  getUser as getUserAuth
} from 'redux/auth/authSlice'

export default function useAuth () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const isAuth = useSelector(state => state.auth.isAuth)
  const isLoading = useSelector(state => state.auth.isLoading)
  const hasError = useSelector(state => state.auth.hasError)

  const login = ({ email, password }) => {
    dispatch(loginAuth({ email, password }))
  }

  const logout = () => {
    dispatch(logoutAuth())
  }

  const getUser = () => {
    dispatch(getUserAuth())
  }

  const changePassword = ({ password, newPassword, repeatPassword }) => {
    console.log({ password, newPassword, repeatPassword })
  }

  return {
    user,
    isAuth,
    isLoading,
    hasError,
    login,
    logout,
    getUser,
    changePassword
  }
}
