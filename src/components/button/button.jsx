import React from 'react'
import PropTypes from 'prop-types'
import styles from './button.scss'

export class Button extends React.PureComponent {
  render() {
    return(
      <button className={styles['button']} {...this.props}>
        
      </button>
    )
  }
}
Button.propTypes = {
  
}