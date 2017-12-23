import React from 'react'
import PropTypes from 'prop-types'
import styles from './Contacts.scss'
import {FlexContainer, Col} from '../../../components/layout/Flex-container'
export class Contacts extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      phone: '',
      comment: ''
    }
  }

  getTimeString(time) {
    return time.hours + ':' + (time.minutes > 9 ? time.minutes : '0' + time.minutes)
  }

  formChange(e) {
    let {value, name} = e.target
    if(name === 'name') {
      this.setState({name: value})
      this.props.onLastStepFormChange(value === '' || this.state.phone === '')
    }
    if(name === 'phone') {
      this.setState({phone: value})
      this.props.onLastStepFormChange(value === '' || this.state.name === '')
    }
    if(name === 'comment') {
      this.setState({comment: value})
    }
  }

  submit(e) {
    const {comment, name, phone} = this.state
    e.preventDefault()
    this.props.handleSubmit({name, phone, comment})
  }

  render() {
    const {appointment, getSubmitButtonElement, handleSubmit} = this.props
    const {getTimeString, formChange, submit} = this
    let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    return [
      <h3 key={1}>Проверьте вашу запись</h3>,
      <FlexContainer key={2}>
        <Col md={6} xs={12}>
          <dl className={styles['info']}>
            <dt><b>Услуги</b></dt> <dd className={styles['info__item']}><FlexContainer className={styles['services']}>{appointment.services.map((service, ind) =>                 
              <ul key={ind} className={styles['services__item']}>
                <li>{service.name}</li>
                <li>{service.price} Р</li>
                <li>{service.time} мин.</li>
              </ul>
            )} </FlexContainer></dd>
            <dt><b>Дата</b></dt> {appointment.date && <dd className={styles['info__item']}>{appointment.date.toLocaleString('ru-RU', dateOptions)}</dd>}
            <dt><b>Время</b></dt> {appointment.time && <dd className={styles['info__item']}> c {getTimeString(appointment.time[0])} до {getTimeString(appointment.time[1])}</dd>}
            <dt><b>Мастер</b></dt> 
            <dd className={styles['info__item']}>
              {appointment.master && <div className={styles['info__photo']}> <img src={appointment.master.imageUrl} alt=""/> </div>}
              {(appointment.master && appointment.master.name) || 'Любой'}
            </dd>
          </dl>
        </Col>
        <Col md={6} xs={12}>
          <form onSubmit={submit.bind(this)} onChange={formChange.bind(this)}>
            <div className={styles['input-row']}>
              <label className={styles['input-row__label']} htmlFor="name">Представьтесь пожалуйста</label>
              <input required className={styles['input-row__input']} type="text" name="name" id="name"/>
            </div> 
            <div className={styles['input-row']}>
              <label className={styles['input-row__label']} htmlFor="phone">Введите телефон</label>
              <input required className={styles['input-row__input']} name="phone" id="phone" type="text"/>
            </div>
            <div className={styles['input-row']}>
              <label className={styles['input-row__label']} htmlFor="comment">Оставьте комментарий</label>
              <textarea className={styles['input-row__textarea']} name="comment" id="comment"></textarea>
            </div>
            <button ref={getSubmitButtonElement} type="submit" hidden></button>
          </form>
        </Col>
      </FlexContainer>
    ]
  }
}

Contacts.propTypes = {
  appointment: PropTypes.shape({
    currentCategoryId: PropTypes.string,
    services: PropTypes.array,
    master: PropTypes.object,
    time: PropTypes.array,
    date: PropTypes.date
  }),
  onLastStepFormChange: PropTypes.func,
  getSubmitButtonElement: PropTypes.func,
  handleSubmit: PropTypes.func
}