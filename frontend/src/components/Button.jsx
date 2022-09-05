import React from 'react'
import PropTypes from 'prop-types'

import { Button as ButtonRS } from 'rsuite'

function Button ({ appearance, color, size, block, active, loading, children, onClick, ...props }) {
  return (
    <ButtonRS appearance={appearance} color={color} size={size} block={block} active={active} loading={loading} onClick={onClick} {...props}>{children}</ButtonRS>
  )
}

Button.propTypes = {
  appearance: PropTypes.oneOf(['default', 'primary', 'link', 'subtle', 'ghost']),
  color: PropTypes.oneOf(['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  block: PropTypes.bool,
  active: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
}

Button.defaultProps = {
  appearance: 'primary',
  color: 'primary',
  size: 'md',
  block: false,
  active: false,
  loading: false,
  children: 'Botton',
  onClick: undefined
}

export default Button
