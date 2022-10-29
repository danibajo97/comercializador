import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { retrieveConvenio, stateResetOperation } from 'redux/convenio/convenioSlice'

export default function useConvenio ({ id }) {
  const dispatch = useDispatch()
  const convenio = useSelector(state => state.convenio.convenio)

  useEffect(() => {
    dispatch(retrieveConvenio({ id }))
    return () => {
      dispatch(stateResetOperation())
    }
  }, [id])

  return { convenio }
}
