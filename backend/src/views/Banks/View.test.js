import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { mount } from 'enzyme'
import Collaborator from './User';


it('renders without crashing', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Collaborator match={{params: {id: "1"}, isExact: true, path: "/users/:id", name: "User details"}}/>
    </MemoryRouter>
  );
  expect(wrapper.containsMatchingElement(<strong>Samppa Nori</strong>)).toEqual(true)
  wrapper.unmount()
});
