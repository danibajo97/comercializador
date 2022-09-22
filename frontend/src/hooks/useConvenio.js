import { useState, useEffect } from 'react'

import { convenios } from 'constants/mock'

export default function useConvenio ({ id }) {
  const [convenio, setConvenio] = useState({})

  useEffect(() => {
    const conveniosFilter = convenios.filter(conv => conv.id === id)
    if (conveniosFilter.length > 0) { setConvenio(conveniosFilter[0]) }
  }, [id])

  return { convenio }
}
