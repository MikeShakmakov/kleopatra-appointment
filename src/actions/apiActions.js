import { createAPIActionTypes, createAPIActions, createAction } from './apiActionCreators'

export const fetchEntitiesType = 'FETCH_ENTITIES'
export const fetchEntities = payload => {
  return createAction(fetchEntitiesType, payload)
}

export const fetchEntitiesTypes = {
  categories: 'categories',
  services: 'services'
}

export const categoriesAPITypes = createAPIActionTypes('categories')
export const categoriesAPIActions = createAPIActions(categoriesAPITypes)

export const servicesAPITypes = createAPIActionTypes('services')
export const servicesAPIActions = createAPIActions(servicesAPITypes)
