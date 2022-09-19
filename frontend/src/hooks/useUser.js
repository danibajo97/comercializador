import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getUser } from 'redux/user/userSlice'

export default function useUser () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const isLogin = useSelector(state => state.user.isLogin)

  useEffect(() => {
    dispatch(getUser())
  }, [])

  return { user, isLogin }
}
