import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { FlexContainer } from './Flex-container'

Enzyme.configure({ adapter: new Adapter() })

function setup(props) {
  const enzymeWrapper = shallow(<FlexContainer {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe("components", () => {
  describe("flex container", () => {
    it("should render container with appropriate class name if using align items prop", () => {
      const { enzymeWrapper } = setup({
        alignItems: 'center',
        className: 'test'
      })
      expect(enzymeWrapper.find('div').hasClass('test')).toBe(true)
      expect(enzymeWrapper.find('div').hasClass('flex-container')).toBe(true)
      expect(enzymeWrapper.find('div').hasClass('flex-container--centred')).toBe(true)
    });
    it("should render container with appropriate class name without align items prop", () => {
      const { enzymeWrapper } = setup({
        alignItems: '1213',
        className: 'test'
      })
      expect(enzymeWrapper.find('div').hasClass('test')).toBe(true)
      expect(enzymeWrapper.find('div').hasClass('flex-container')).toBe(true)
      expect(enzymeWrapper.find('div').hasClass('flex-container--centred')).toBe(false)
    });
  });
});
