import React from 'react'
import PropTypes from 'prop-types'
import styles from './Categories.scss'
import {Icons} from '../../../components/Icons/Icons'
import {FlexContainer, Col} from '../../../components/layout/Flex-container'

export class Categories extends React.PureComponent {
  setCategory(id, event) {
    this.props.addCategoryToStore(id)
  }

  render() {
    let {data, addCategoryToStore, currentCategoryId} = this.props
    return(
      <FlexContainer>
        {data.map((category, ind) => 
          <Col md={3} xs={12} className={styles['card'] + (category.id === currentCategoryId ? ' ' + styles['card--active'] : '')}
               key={ind} 
               onClick={this.setCategory.bind(this, category.id)}>
            <div className={styles['card__title']}>{category.name}</div>
            <div className={styles['card__icon']}><Icons type={category.icon}/></div>
            <p className={styles['card__text']}>{category.text}</p>
          </Col>)
        }
      </FlexContainer>
    )
  }
}
Categories.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, 
    name: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string
  })),
  addCategoryToStore: PropTypes.func,
  currentCategoryId: PropTypes.string
}