import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getUser } from 'redux/auth/authSlice'

export default function useAuth () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const isLogin = useSelector(state => state.auth.isLogin)

  useEffect(() => {
    dispatch(getUser())
  }, [])

  return { user, isLogin }
}
