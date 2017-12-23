import * as actionTypes from './actionTypes'

export function chooseCategory(id) {
  return {type: actionTypes.CHOOSE_CATEGORY, id}
}

export function addService(service) {
  return { type: actionTypes.ADD_SERVICE, service }
}

export function removeService(name) {
  return { type: actionTypes.REMOVE_SERVICE, name }
}

export function clearServices() {
  return {type: actionTypes.CLEAR_SERVICES}
}

export function addMaster(master) {
  return { type: actionTypes.ADD_MASTER, master }
}

export function addTime(time) {
  return {type: actionTypes.ADD_TIME, time}
}

export function addDate(date) {
  return {type: actionTypes.ADD_DATE, date}
}

export function addUserData(data) {
  return {type: actionTypes.ADD_USER_DATA, data}
}