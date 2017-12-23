import React from 'react'
import PropTypes from 'prop-types'
import styles from './MasterAndTime.scss'
import {FlexContainer, Col} from '../../../components/layout/Flex-container'
import DatePicker from 'material-ui/DatePicker'

export class MasterAndTime extends React.PureComponent {
  constructor(props) {
    super(props)

    this.workingHours = [
      [9, 10],
      [13, 15]
    ]

    this.dayPeriods = {
      morning: [9, 12],
      day: [12, 18],
      evening: [18, 21],
      interval: 15
    }

    this.state = {
      hoveredTime: null
    }
    this.handleChangeDate({}, this.props.currentDate || new Date())
  }

  setMaster(master, event) {
    this.props.addMasterToStore(master)
  }

  formatTimeUnit(time) {
    return time <= 9 ? '0' + time : time
  }

  isDateInRange(date, startDate, finishDate, comparingFunction) {
    let functionToUse = comparingFunction || 'getTime'
    return date[functionToUse]() < finishDate[functionToUse]() && date[functionToUse]() >= startDate[functionToUse]()
  }

  isTimeEnabled(workingHours, timeToAdd) {
    return workingHours.some(timeRange => {
      let start = new Date()
      let finish = new Date()
      this.setTime(start, {
        hours: timeRange[0],
        minutes: 0 
      })
      this.setTime(finish, {
        hours: timeRange[1],
        minutes: 0 
      })
      return this.isDateInRange(timeToAdd, start, finish, 'getHours')
    })
  }

  getDayPeriodArray(startHour, finishHour, minutesInterval, hoveredTime, type) {
    let timeToAdd = (new Date())
    let startHoveredTime = (new Date())
    let finishHoveredTime = (new Date())
    let result = []

    if (hoveredTime) {
      this.setTime(startHoveredTime, {
        hours: hoveredTime[0].hours,
        minutes: hoveredTime[0].minutes
      })
      this.setTime(finishHoveredTime, {
        hours: hoveredTime[1].hours,
        minutes: hoveredTime[1].minutes
      })
    }
    if (this.workingHours) {
      let startWorkingHours = (new Date())
      let finishWorkingHours = (new Date())

      startWorkingHours.setHours(this.workingHours[0])
      finishWorkingHours.setHours(this.workingHours[1])
    }
    this.setTime(timeToAdd, {
      hours: startHour,
      minutes: type === 'morning' ? 0 : 15
    })

    while (timeToAdd.getHours() !== finishHour) {
      result.push({
        hours: this.formatTimeUnit(timeToAdd.getHours()),
        minutes: this.formatTimeUnit(timeToAdd.getMinutes()),
        isActive: hoveredTime && (this.isDateInRange(timeToAdd, startHoveredTime, finishHoveredTime)),
        isEnabled: this.isTimeEnabled(this.workingHours, timeToAdd)
      })
      
      timeToAdd.setMinutes(timeToAdd.getMinutes() + minutesInterval)
    }
    result.push({
      hours: this.formatTimeUnit(timeToAdd.getHours()),
      minutes: this.formatTimeUnit(timeToAdd.getMinutes()),
      isActive: hoveredTime && (this.isDateInRange(timeToAdd, startHoveredTime, finishHoveredTime)),
      isEnabled: this.isTimeEnabled(this.workingHours, timeToAdd)
    })

    return result
  }

  setTime(date, time) {
    date.setHours(parseInt(time.hours))
    date.setMinutes(parseInt(time.minutes))
  }

  onTimeMouseEnter(servicesDuration, time, e) {
    let finish = new Date()

    if (time.isEnabled) {
      this.setTime(finish, {
        hours: time.hours,
        minutes: parseInt(time.minutes) + servicesDuration
      })
      this.setState({hoveredTime: [
        {
          hours: parseInt(time.hours),
          minutes: parseInt(time.minutes)
        },
        {
          hours: finish.getHours(),
          minutes: finish.getMinutes()
        }
      ]})
    }
  }

  onTimeMouseLeave(e) {
    this.setState({
      hoveredTime: null
    })
  }

  getTimeBlockData(title, type, hoveredTime) {
    return {title, data: this.getDayPeriodArray(this.dayPeriods[type][0], this.dayPeriods[type][1], this.dayPeriods.interval, hoveredTime, type)}
  }

  onTimeMouseClick(wrongDataSelected, hoveredTime, e) {
    if (!wrongDataSelected) {
      this.props.addTimeToStore(hoveredTime)
      setTimeout(() => {
        this.props.onStepIncrease()
      })
    }
  }

  handleChangeDate(e, date) {
    this.props.addDateToStore(date);
  }

  render() {
    let {masters, currentMasterId, selectedServices, currentDate} = this.props
    let {workingTime, dayPeriods, getTimeBlockData, onTimeMouseLeave, onTimeMouseEnter, onTimeMouseClick} = this
    let {hoveredTime} = this.state
    let time = [
      getTimeBlockData.call(this, 'Утро', 'morning', hoveredTime),
      getTimeBlockData.call(this, 'День', 'day', hoveredTime),
      getTimeBlockData.call(this, 'Вечер', 'evening', hoveredTime)
    ]
    let selectedServicesTime = selectedServices.map(item => item.time).reduce((prevTime, curTime) => prevTime + curTime, 0)
    let maxDate = new Date()
    let isWrongTimeRangeSelected = time.some(block => block.data.some(time => !time.isEnabled && time.isActive))
    maxDate.setDate(maxDate.getDate() + 30)
    return(
      <FlexContainer>
        <Col md={4} xs={12}>
        <div className={styles['master-card'] + (currentMasterId === null ? ' ' + styles['master-card--active'] : '')} onClick={this.setMaster.bind(this, null)}>
          <div className="master-card__centred">Любой мастер</div>
        </div>
          {masters.map((master, ind) => 
            <div className={styles['master-card'] + (master.id === currentMasterId ? ' ' + styles['master-card--active'] : '')}
                key={ind}
                onClick={this.setMaster.bind(this, master)}>
              <Col md={5} className={styles['master-card__photo']}>
                <img src={master.imageUrl} alt={'фото ' + master.name}/>
              </Col>
              <Col md={9}>
                <div className={styles['master-card__text-row']}>{master.name}</div>
                <div className={styles['master-card__text-row']}>{master.position}</div>
                <div className={styles['master-card__text-row']}>Работает {master.workload.join(', ')}</div>
              </Col>
            </div>)
          }
        </Col>
        <Col md={8} xs={12} className={styles['time-container']}>
          <h3>{'Выберите дату и время'}</h3>
          <DatePicker 
            formatDate={new global.Intl.DateTimeFormat('ru-RU', 
              {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                weekday: 'short'
              }).format} 
            okLabel="OK"
            cancelLabel="Отмена"
            locale="ru"
            mode="landscape"
            minDate={new Date()}
            maxDate={maxDate}
            onChange={this.handleChangeDate.bind(this)}
            defaultDate={currentDate}
            disableYearSelection={true}
            DateTimeFormat={global.Intl.DateTimeFormat}/>
          {
            time.map((block, ind) => 
              <div key={ind}>
                <h3>{block.title}</h3>
                <FlexContainer>
                  { 
                    block.data.map((time, ind) =>
                      <Col key={ind}>
                        <div 
                          onMouseLeave={onTimeMouseLeave.bind(this)}
                          onMouseEnter={onTimeMouseEnter.bind(this, selectedServicesTime, time)}
                          onClick={onTimeMouseClick.bind(this, isWrongTimeRangeSelected || !time.isEnabled, hoveredTime)}
                          className={styles['time-container__time'] + (time.isActive ? ' ' + styles['time-container__time--active'] : '') + (!time.isEnabled ? ' ' + styles['time-container__time--disabled'] : '')}>
                            { time.hours + ':' + time.minutes }
                          </div>
                      </Col>)
                  }
                </FlexContainer>
            </div>)
          }
        </Col>
      </FlexContainer>
    )
  }
}
MasterAndTime.propTypes = {
  masters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number, 
    name: PropTypes.string,
    position: PropTypes.string,
    imageUrl: PropTypes.string,
    workload: PropTypes.arrayOf(PropTypes.string)
  })),
  currentDate: PropTypes.object,
  onStepIncrease: PropTypes.func,
  addTimeToStore: PropTypes.func,
  addMasterToStore: PropTypes.func,
  addDateToStore: PropTypes.func
}