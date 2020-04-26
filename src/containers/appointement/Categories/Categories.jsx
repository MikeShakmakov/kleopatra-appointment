import React from 'react'
import PropTypes from 'prop-types'
import styles from './Categories.scss'
import {Icons} from '../../../components/Icons/Icons'
import {FlexContainer, Col} from '../../../components/layout/Flex-container'

export class Categories extends React.PureComponent {
  constructor(props) {
    super(props);
    this.iconstMap = {
      hearDresser: 'scissors',
      manicure: 'manicure'
    };
  }

  setCategory(id, event) {
    this.props.addCategoryToStore(id)
  }

  render() {
    let {data, currentCategoryId} = this.props
    return(
      <FlexContainer>
        {data.map((category, ind) =>
          <Col md={3} xs={12} sm={4} lg={2} className={styles['card'] + (category.id === currentCategoryId ? ' ' + styles['card--active'] : '')}
               key={ind}
               onClick={this.setCategory.bind(this, category.id)}>
            <div className={styles['card__title']}>{category.title}</div>
            <div className={styles['card__icon']}><Icons type={this.iconstMap[category.id]}/></div>
            <p className={styles['card__text']}>{category.description}</p>
          </Col>)
        }
      </FlexContainer>
    )
  }
}
Categories.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string
  })),
  addCategoryToStore: PropTypes.func,
  currentCategoryId: PropTypes.string
}
