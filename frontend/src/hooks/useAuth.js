import { useSelector, useDispatch } from 'react-redux'

import {
  login as loginAuth,
  logout as logoutAuth,
  getUser as getUserAuth,
  changePassword as changePasswordAuth,
  stateResetChangePassword as stateResetChangePasswordAuth,
  activateAccount as activateAccountAuth,
  stateResetActivateAccount as stateResetActivateAccountAuth,
  verifyPassword as verifyPasswordAuth,
  stateVerifyPassword as stateVerifyPasswordAuth
} from 'redux/auth/authSlice'

export default function useAuth () {
  const dispatch = useDispatch()

  // usuario registrado en el sistema
  const user = useSelector(state => state.auth.user)

  // accion de hacer login
  const isAuth = useSelector(state => state.auth.isAuth)
  const isLoading = useSelector(state => state.auth.isLoading)
  const hasError = useSelector(state => state.auth.hasError)

  // accion de cambiar password
  const isChangePassword = useSelector(state => state.auth.isChangePassword)

  // accion de activar cuenta
  const isActivateAccount = useSelector(state => state.auth.isActivateAccount)

  // accion de verificar password
  const isVerifyPassword = useSelector(state => state.auth.isVerifyPassword)
  const hasPassword = useSelector(state => state.auth.hasPassword)

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

  const verifyPassword = ({ password }) => {
    dispatch(verifyPasswordAuth({ password }))
  }

  const stateVerifyPassword = () => {
    dispatch(stateVerifyPasswordAuth())
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
    stateResetActivateAccount,
    isVerifyPassword,
    hasPassword,
    verifyPassword,
    stateVerifyPassword
  }
}
