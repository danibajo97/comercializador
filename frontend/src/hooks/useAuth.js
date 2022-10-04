import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getUser, login as setLogin, logout as getLogout } from 'redux/auth/authSlice'

export default function useAuth () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const isAuth = useSelector(state => state.auth.isAuth)
  const loading = useSelector(state => state.auth.loading)

  useEffect(() => {
    dispatch(getUser())
  }, [])

  const login = ({ email, password }) => {
    dispatch(setLogin({ email, password }))
  }

  const logout = () => {
    dispatch(getLogout())
  }

  return { user, isAuth, loading, login, logout }
}
