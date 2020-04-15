import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { mount } from 'enzyme'
import Flight from './User';


it('renders without crashing', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Flight match={{params: {id: "1"}, isExact: true, path: "/users/:id", name: "User details"}}/>
    </MemoryRouter>
  );
  expect(wrapper.containsMatchingElement(<strong>Samppa Nori</strong>)).toEqual(true)
  wrapper.unmount()
});
