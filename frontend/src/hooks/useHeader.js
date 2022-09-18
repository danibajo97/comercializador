import { useEffect, useRef } from 'react'

export default function useHeader ({ title }) {
  const prevTitle = useRef(document.title)

  useEffect(() => {
    const previousTitle = prevTitle.current
    if (title) {
      document.title = `${title} | Comercializador`
    }

    return () => {
      document.title = previousTitle
    }
  }, [title])
}
