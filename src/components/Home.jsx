import React from 'react'
import {Services} from '../containers/appointement/Services/Services'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {servicesAPIActions, categoriesAPIActions} from '../actions/apiActions'

class HomeClass extends React.Component {
  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchServices()
  }

  render() {
    const {remoteData} = this.props
    let services = remoteData.services.data
    let categories = remoteData.categories.data

    return (
      <div className="page-home">
        <h1>Прайс</h1>
        {categories && categories.map(category => 
          <div key={category.id}>
            <h3>{category.name}</h3>
            <Services addServiceToStore={()=>undefined} selectedServices={[]} data={services && services.filter(item => item.categoryId === category.id)} />
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchServices(params) {
      dispatch(servicesAPIActions.Load(params))
    },
    fetchCategories() {
      dispatch(categoriesAPIActions.Load())
    }
  }
}

const mapStateToProps = state => {
  return {
    remoteData: state.remoteData
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeClass))