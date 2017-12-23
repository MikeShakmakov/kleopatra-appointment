import { take, call, put, fork, all } from 'redux-saga/effects'
import { categoriesAPIActions, categoriesAPITypes, servicesAPIActions, servicesAPITypes } from '../actions/apiActions'
import { requestHandling } from '../api'
import { debug } from 'util';

export function* fetchEntity(apiActions, apiFn, url, params) {
  yield put( apiActions.Load(params) )

  const {resp, error} = yield call(apiFn, params, url)
  
  if(resp){
    yield put( apiActions.LoadSuccess(resp) )
  }
  else
    yield put( apiActions.LoadError(error) )
}

export const fetchCategories = fetchEntity.bind(null, categoriesAPIActions, requestHandling, 'categories')
export const fetchServices = fetchEntity.bind(null, servicesAPIActions, requestHandling, 'services')

function* watchFetchCategories() {
  while(true) {
    yield take(categoriesAPITypes.LOAD)
    yield call(fetchCategories)
  }
}

function* watchFetchServices() {
  while(true) {
    const action = yield take(servicesAPITypes.LOAD)
    yield call(fetchServices, action.payload)
  }
}

export function* sagas() {
  yield all([
    fork(watchFetchCategories),
    fork(watchFetchServices)
  ])
}