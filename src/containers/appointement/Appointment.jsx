import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import {fetchEntities, fetchEntitiesTypes} from '../../actions/apiActions'
import styles from './Appointment.scss'
import {Stepper} from '../../components/stepper/Stepper'
import {Services} from './Services/Services'
import {Categories} from './Categories/Categories'
import {MasterAndTime} from './MasterAndTime/MasterAndTime'
import {Contacts} from './Contacts/Contacts'
import {Button} from '../../components/button/button'
import {addService, removeService, chooseCategory, clearServices, addMaster, addTime, addDate, addUserData} from '../../actions/actions'
class AppointmentClass extends React.PureComponent {
  constructor(props) {
    super(props)

    this.mockMasters = [
      {
        id: 0,
        name: 'Тест тестович',
        position: 'Парикмахер',
        imageUrl: 'https://sonline.su/i/avatars/148/121285.jpg',
        workload: ['07','08','09','10']
      },
      {
        id: 1,
        name: 'Тест тестович',
        position: 'Парикмахер',
        imageUrl: 'https://sonline.su/i/avatars/148/121285.jpg',
        workload: ['07','08','09','10']
      },
      {
        id: 2,
        name: 'Тест тестович',
        position: 'Парикмахер',
        imageUrl: 'https://sonline.su/i/avatars/148/121285.jpg',
        workload: ['07','08','09','10', '11', '12']
      },
    ]

    this.stepperData = [
      {
        label: 'Тип услуги',
        buttonText: 'К выбору услуги'
      },
      {
        label: 'Услуга',
        buttonText: 'К выбору мастера'
      },
      {
        label: 'Мастер и время'
      },
      {
        label: 'Контакты',
        buttonText: 'Подтвердить запись'
      }
    ]

    this.state = {
      activeStep: 0,
      lastStepButtonDisabled: true
    }
  }

  addServicesToStore(servicesIds, data) {
    const ids = servicesIds.split(',')
    let services = ids.map(id => data.find(service => service._id === id ))

    this.props.addServicesToStore(services)
  }

  addThirdStepDataToStore(masterId, date, time) {
    if (masterId !== null) {
      this.props.addMasterToStore(this.mockMasters.find(master => master.id === parseInt(masterId)))
    }
    this.props.addDateToStore(new Date(date))
    this.props.addTimeToStore(JSON.parse(time))
  }

  componentDidMount() {
    const {currentCategoryId, servicesIds, masterId, date, time} = this.getParsedQuery()
    let activeStep = 0
    let fetchConfig = [this.getFetchDataConfig(activeStep)]

    if(currentCategoryId) {
      activeStep = 1
      this.props.addCategoryToStore(currentCategoryId)
      fetchConfig = [...fetchConfig, this.getFetchDataConfig(activeStep, {currentCategoryId})]
    }
    if(currentCategoryId && servicesIds) {
      activeStep = 2
      // fetchConfig = [...fetchConfig, this.getFetchDataConfig(activeStep)]
    }
    if(currentCategoryId && servicesIds && date && time) {
      activeStep = 3
      this.addThirdStepDataToStore(masterId, date, time)
      // fetchConfig = [...fetchConfig, this.getFetchDataConfig(activeStep)]
    }
    this.props.fetchEntities(fetchConfig)

    this.setState({
      activeStep
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.kleoData.services.data && nextProps.kleoData.services.data) {
      const {servicesIds} = this.getParsedQuery()
      this.addServicesToStore(servicesIds, nextProps.kleoData.services.data)
    }
  }

  getParsedQuery() {
    const {search} = this.props.history.location
    return queryString.parse(search)
  }

  updateQuery(activeStep) {
    const {replace} = this.props.history
    const {pathname} = this.props.history.location
    const {currentCategoryId, services, master, date, time} = this.props.appointment
    let parsedQuery = this.getParsedQuery();

    switch(activeStep) {
      case 1:
        parsedQuery['currentCategoryId'] = currentCategoryId
        break
      case 2:
        parsedQuery['servicesIds'] = services.map(item => item._id).join(',')
        break
      case 3:
        parsedQuery['masterId'] = master && master.id !== undefined ? master.id : null
        parsedQuery['date'] = date
        parsedQuery['time'] = JSON.stringify(time)
        break
    }
    replace(pathname + '?' + queryString.stringify(parsedQuery))
  }

  clearQuery(activeStep) {
    const {replace} = this.props.history
    const {pathname} = this.props.history.location
    let parsedQuery = this.getParsedQuery()

    switch(activeStep) {
      case 0:
        delete parsedQuery['currentCategoryId']
        break
      case 1:
        delete parsedQuery['servicesIds']
        break
      case 2:
        delete parsedQuery['masterId']
        delete parsedQuery['date']
        delete parsedQuery['time']
        break
    }
    replace(pathname + '?' + queryString.stringify(parsedQuery))
  }

  getFetchDataConfig(activeStep, {currentCategoryId} = {}) {
    switch(activeStep) {
      case 0:
        return {name: fetchEntitiesTypes.categories}
      case 1:
        return {
          name: fetchEntitiesTypes.services,
          params: {
            categoryId: currentCategoryId || this.props.appointment.currentCategoryId
          }
        }
      default: return null
    }
  }

  onStepIncrease() {
    let activeStep = this.state.activeStep + 1
    const fetchConfig = this.getFetchDataConfig(activeStep)
    if (activeStep < this.stepperData.length) {
      this.setState({
        activeStep
      })
    } else if (activeStep === this.stepperData.length && this.submitElem) {
      this.submitElem.click()
    }
    if (fetchConfig) {
      this.props.fetchEntities([this.getFetchDataConfig(activeStep)])
    }
    this.updateQuery(activeStep)
  }

  onStepDecrease() {
    let activeStep = this.state.activeStep - 1
    if (activeStep >= 0) {
      this.setState({
        activeStep
      })
    }
    switch(activeStep) {
      case 0: this.props.clearServicesInStore()
    }
    this.clearQuery(activeStep)
  }

  onLastStepFormChange(isDisabled) {
    this.setState({lastStepButtonDisabled: isDisabled})
  }

  getSubmitButtonElement(submitElem) {
    this.submitElem = submitElem
  }

  handleSubmit(data) {
    const {name, phone, comment} = data
    const {date, time, services, master} = this.props.appointment
    this.props.addUserDataToStore({name, phone, comment})

    console.log({
      date,
      time,
      services,
      master,
      user: {
        name, phone, comment
      }
    })
  }

  render() {
    let {activeStep} = this.state
    let {
      addServicesToStore,
      removeServiceFromStore,
      addCategoryToStore,
      addMasterToStore,
      appointment,
      kleoData,
      addTimeToStore,
      addDateToStore
    } = this.props
    let {
      stepperData,
      onStepDecrease,
      onStepIncrease,
      mockMasters,
      onLastStepFormChange,
      getSubmitButtonElement,
      handleSubmit
    } = this
    let stepperButtonText = this.stepperData[activeStep].buttonText
    let stepperButtonBackText = 'Назад'
    // let isButtonDisabled = activeStep === 1 && !appointment.services.length || activeStep === 3 && this.state.lastStepButtonDisabled
    let isButtonDisabled = activeStep === 1 && !appointment.services.length
    let isBackButtonDisabled = activeStep === 0

    return(
      <div>
        <Stepper steps={this.stepperData} currentStep={activeStep} />
        <div className={styles['buttons']} align="right">
          {stepperButtonBackText &&
            <Button disabled={isBackButtonDisabled}
            onClick={onStepDecrease.bind(this)}>{stepperButtonBackText}</Button>}
          {stepperButtonText &&
            <Button disabled={isButtonDisabled}
              onClick={onStepIncrease.bind(this)}>
                {stepperButtonText}
            </Button>}
        </div>
        {activeStep === 0 &&
          <Categories
            data={kleoData.categories.data || []}
            addCategoryToStore={addCategoryToStore.bind(this)}
            currentCategoryId={appointment.currentCategoryId} />
        }
        {activeStep === 1 &&
          <Services
            data={kleoData.services.data || []}
            selectedServices={appointment.services}
            addServicesToStore={addServicesToStore.bind(this)}
            removeServiceFromStore={removeServiceFromStore.bind(this)} />
        }
        {activeStep === 2 &&
          <MasterAndTime
            masters={mockMasters}
            selectedServices={appointment.services}
            addMasterToStore={addMasterToStore}
            addTimeToStore={addTimeToStore}
            addDateToStore={addDateToStore}
            onStepIncrease={onStepIncrease.bind(this)}
            currentDate={appointment.date}
            currentMasterId={appointment.master && appointment.master.id}/>
        }
        {activeStep === 3 &&
          <Contacts
            appointment={appointment}
            onLastStepFormChange={onLastStepFormChange.bind(this)}
            getSubmitButtonElement={getSubmitButtonElement.bind(this)}
            handleSubmit={handleSubmit.bind(this)}/>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    appointment: state.appointment,
    kleoData: state.remoteData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addServicesToStore(service) {
      dispatch(addService(service))
    },
    removeServiceFromStore(name) {
      dispatch(removeService(name))
    },
    addCategoryToStore(id) {
      dispatch(chooseCategory(id))
    },
    clearServicesInStore() {
      dispatch(clearServices())
    },
    addMasterToStore(master) {
      dispatch(addMaster(master))
    },
    addTimeToStore(time) {
      dispatch(addTime(time))
    },
    addDateToStore(date) {
      dispatch(addDate(date))
    },
    addUserDataToStore(data) {
      dispatch(addUserData(data))
    },
    fetchEntities(entities) {
      dispatch(fetchEntities(entities))
    }
  }
}

export const Appointment = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentClass))
