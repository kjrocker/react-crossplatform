import { shallow } from 'enzyme';
import * as React from 'react';

describe('the application', () => {
  it('has tests that run', () => {
    expect(true).toBe(true);
  });

  it('has tests involving components', () => {
    shallow(<div />);
  });
});
