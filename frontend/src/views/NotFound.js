import React, { useEffect } from 'react'
import { Button } from 'rsuite'
import { useNavigate } from 'react-router-dom'

import svg404 from 'assets/img/404.svg'

export default function NotFound ({ setHeaderVisible }) {
  const navigate = useNavigate()

  useEffect(() => { setHeaderVisible(false) }, [])

  const portada = () => {
    setHeaderVisible(true)
    navigate('/')
  }

  return (
    <div className='mt-9 mb-9 text-center'>
      <img
        width={400}
        he={400}
        src={svg404}
      />
      <h1 className='mt-5 text-uppercase'>Lo siento, página no encontrada</h1>
      <h3 className='text-muted mb-5'>No se pudo encontrar la página que solicitaste, haga click en el botón para acceder a la portada. </h3>
      <Button appearance='primary' onClick={portada}>Ir a la Portada</Button>
    </div>
  )
}
