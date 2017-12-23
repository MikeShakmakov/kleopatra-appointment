import React from 'react'
import PropTypes from 'prop-types'
import styles from './services.scss'
import {FlexContainer, Col} from '../../../components/layout/Flex-container'
import {Icons} from '../../../components/Icons/Icons'

export class Services extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      searchValue: '',
    }
  }

  onSearch(e) {
    this.setState({
      searchValue: e.target.value      
    })
  }

  toggleService(service, e) {
    let selectedIndex = this.props.selectedServices.map(item => item.name).indexOf(service.name.toLowerCase())

    if (selectedIndex < 0) {
      this.props.addServiceToStore(service)
    } else {
      this.props.removeServiceFromStore(service.name.toLowerCase())
    }
  }

  getServiceStateClass(service, data) {
    return data.find(item => this.props.selectedServices.map(item => item.name).indexOf(service.name.toLowerCase()) > -1) ? ' ' + styles['search-list__item--selected'] : ''
  }

  render() {
    let {data, selectedServices} = this.props
    let {searchValue} = this.state

    return(
      <div>
        <input className={styles['search-input']} type="text" onChange={this.onSearch.bind(this)} />

        {data && 
          <FlexContainer className={styles['search-list']}>
            {data.filter(item => item.name.toLowerCase().indexOf(searchValue) > -1).map((service, ind) => 
              <Col md={3} xs={12} 
                key={ind} 
                className={styles['search-list__item'] + this.getServiceStateClass(service, data)} 
                onClick={this.toggleService.bind(this, service)}>
                <span>{service.name} </span>
                <div>{service.time} мин.</div>
                <div>{service.price} руб.</div>
              </Col>) 
            }
          </FlexContainer>
        } 
      </div>
    )
  }
}
Services.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({    
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    time: PropTypes.number
  })),
  addServiceToStore: PropTypes.func,
  removeServiceFromStore: PropTypes.func,
  selectedServices: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    time: PropTypes.number
  }))
}