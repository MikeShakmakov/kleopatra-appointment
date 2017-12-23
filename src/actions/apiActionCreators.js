export function createAPIActionTypes(name) {
  return Object.freeze({
    LOAD: `[${name}] Load`,
    LOAD_SUCCESS: `[${name}] Load Success`,
    LOAD_ERROR: `[${name}] Load Error`
  })
}

export function createAPIActions(types) {
  return Object.freeze({
    Load(params) {
      return createAction(types.LOAD, params)
    },
    LoadSuccess(payload) {
      return createAction(types.LOAD_SUCCESS, payload)
    },
    LoadError(payload) {
      return createAction(types.LOAD_ERROR, payload)
    }
  })
}

export function createAction(type, payload) {
  return payload ? { type, payload } : { type } 
}