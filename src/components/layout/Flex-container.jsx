import React from 'react'
import styles from './Flex-container.scss'

export class FlexContainer extends React.PureComponent {
  render() {
    const { alignItems, className, children } = this.props
    let additionalClass = ''

    if (alignItems && alignItems === 'center') {
      additionalClass += styles['flex-container--centred']
    }

    return (
      <div className={(className || '') + ' ' + styles['flex-container'] + ' ' + additionalClass}>
        {children}
      </div>
    )
  }
}

export class Col extends React.PureComponent {
  render() {
    const { xs, md, sm, lg, children, className, onClick } = this.props
    const xsClass = xs ? styles['colXS' + xs] + ' ' : ''
    const mdClass = md ? styles['col' + md] + ' ' : ''
    const smClass = sm ? styles['colSM' + sm] + ' ' : ''
    const lgClass = lg ? styles['colLG' + lg] + ' ' : ''

    return (
      <div className={(className || '') + ' ' + xsClass + mdClass + smClass + lgClass + ' '} onClick={onClick}>
        {children}
      </div>
    )
  }
}