import { createAPIActionTypes, createAPIActions, createAction } from './apiActionCreators'

export const categoriesAPITypes = createAPIActionTypes('categories')
export const categoriesAPIActions = createAPIActions(categoriesAPITypes)

export const servicesAPITypes = createAPIActionTypes('services')
export const servicesAPIActions = createAPIActions(servicesAPITypes)
