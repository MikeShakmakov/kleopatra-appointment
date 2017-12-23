import { put } from 'redux-saga/effects'
import { call } from 'redux-saga/effects'
import { fetchEntity } from './'
import { cloneableGenerator } from 'redux-saga/utils'
import { createAPIActionTypes, createAPIActions } from '../actions/apiActionCreators'

describe('when fetch entity saga is running', () => {
  const someApiTypes = createAPIActionTypes('someType')
  const someApiActions = createAPIActions(someApiTypes)
  const apiFunc = jest.fn()
  const successGen = cloneableGenerator(fetchEntity.bind(null, someApiActions, apiFunc, '/someUrl'))()
  const errorGen = cloneableGenerator(fetchEntity.bind(null, someApiActions, apiFunc, '/someUrl'))()

  it('should have triggered the Load action', () => {
    expect(successGen.next().value).toEqual(put(someApiActions.Load()))
  })
  it("should have called api", () => {
    expect(successGen.next().value).toEqual(call(apiFunc, undefined ,'/someUrl'))
  })
  it("should have triggered success action in case of resolved promise", () => {
    expect(successGen.next({resp: {}}).value).toEqual(put( someApiActions.LoadSuccess({})))
  });
  it("should have triggered error action in case of rejected promise", () => {
    errorGen.next()
    errorGen.next()
    expect(errorGen.next({error: {}}).value).toEqual(put( someApiActions.LoadError({})))
  });
})