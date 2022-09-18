import { Container } from 'reactstrap'

const DefaultHeader = ({ height }) => {
  return (
    <>
      <div className={`header bg-gradient-info pb-8 pt-5 pt-md-${height}`}>
        <Container className='d-flex align-items-center' fluid />
      </div>
    </>
  )
}

DefaultHeader.defaultProps = {
  height: 7
}

export default DefaultHeader
