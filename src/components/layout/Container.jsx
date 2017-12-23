import React from 'react'
import styles from './Container.scss'

export class Container extends React.PureComponent {
  render() {
    return(
      <div className={styles.container}>
        {this.props.children}
      </div>
    )
  }
}