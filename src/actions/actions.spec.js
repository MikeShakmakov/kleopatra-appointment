import * as actions from './actions'
import * as actionTypes from './actionTypes'

describe("actions", () => {
  it("should create an action to choose category", () => {
    const id = 'test'
    const expectedAction = {
      type: actionTypes.CHOOSE_CATEGORY,
      id
    }
    expect(actions.chooseCategory(id)).toEqual(expectedAction)
  });
});