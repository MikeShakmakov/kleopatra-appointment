import { appointmentReducer } from './appointment'
import * as actionTypes from '../actions/actionTypes'

describe("appointment reducer", () => {
  it("should return the initial state", () => {
    expect(appointmentReducer(undefined, {})).toEqual({
      currentCategoryId: 'manicure',
      services: [],
      master: null,
      time: null,
      date: null,
      user: null
    })
  });

  it("should handle ADD_SERVICE", () => {
    const service = {id: 1, name: 'test', price: 10, time: {}}
    expect(appointmentReducer({services: []}, {type: actionTypes.ADD_SERVICE, service})).toEqual({services: [service]})
  });
});