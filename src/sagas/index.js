import { all, call, fork, put, take } from 'redux-saga/effects'
import { createAPIActions, createAPIActionTypes } from '../actions/apiActionCreators'
import { fetchEntitiesType } from '../actions/apiActions'
import { requestHandling } from '../api'

export function* fetchEntity(apiActions, apiFn, url, params) {
  yield put( apiActions.Load(params) )

  const {resp, error} = yield call(apiFn, params, url)

  if(resp){
    yield put( apiActions.LoadSuccess(resp) )
  }
  else
    yield put( apiActions.LoadError(error) )
}

function* watchFetchEntities() {
  while(true) {
    const entities = yield take(fetchEntitiesType);
    yield all(
      entities.payload.map(entity => {
        const actions = createAPIActions(createAPIActionTypes(entity.name));
        return call(fetchEntity.bind(null, actions, requestHandling, entity.name, entity.params))
      }
    ))
  }
}

export function* sagas() {
  yield all([
    fork(watchFetchEntities)
  ])
}
