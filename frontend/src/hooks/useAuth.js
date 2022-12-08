import { useSelector, useDispatch } from 'react-redux'

import {
  login as loginAuth,
  logout as logoutAuth,
  getUser as getUserAuth,
  changePassword as changePasswordAuth,
  stateResetChangePassword as stateResetChangePasswordAuth,
  activateAccount as activateAccountAuth,
  stateResetActivateAccount as stateResetActivateAccountAuth
} from 'redux/auth/authSlice'

export default function useAuth () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const isAuth = useSelector(state => state.auth.isAuth)
  const isLoading = useSelector(state => state.auth.isLoading)
  const hasError = useSelector(state => state.auth.hasError)
  const isChangePassword = useSelector(state => state.auth.isChangePassword)
  const isActivateAccount = useSelector(state => state.auth.isActivateAccount)

  const login = ({ username, password }) => {
    dispatch(loginAuth({ username, password }))
  }

  const logout = () => {
    dispatch(logoutAuth())
  }

  const getUser = () => {
    dispatch(getUserAuth())
  }

  const stateResetChangePassword = () => {
    dispatch(stateResetChangePasswordAuth())
  }

  const changePassword = ({ password, newPassword, repeatPassword }) => {
    if (newPassword === repeatPassword) { dispatch(changePasswordAuth({ id: user.id, oldPassword: password, newPassword })) }
  }

  const activateAccount = ({ tokenInfo, user }) => {
    dispatch(activateAccountAuth({ tokenInfo, user }))
  }

  const stateResetActivateAccount = () => {
    dispatch(stateResetActivateAccountAuth())
  }

  return {
    user,
    isAuth,
    isLoading,
    hasError,
    login,
    logout,
    getUser,
    isChangePassword,
    changePassword,
    stateResetChangePassword,
    isActivateAccount,
    activateAccount,
    stateResetActivateAccount
  }
}
