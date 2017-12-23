import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Header.scss'
import {Icons} from '../../components/Icons/Icons'
import {FlexContainer, Col} from '../../components/layout/Flex-container'
import {Container} from '../../components/layout/Container'

export class Header extends React.PureComponent {
  render() {
    return(
      <header className={styles['header']}>
        <Container>
          <div className={styles['menu']}>
            <Link to="/" className={styles['menu__column'] + ' ' + styles['menu__column--logo']}><Icons type="logo" height='auto' width={52}/></Link>
            <a className={styles['menu__column']}>Позвони</a>
            <Link to="/appointment" className={styles['menu__column']}>Запишись онлайн</Link>
          </div>
        </Container>
      </header>
    )
  }
}