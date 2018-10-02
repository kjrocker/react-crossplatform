import * as React from 'react';
import * as renderer from 'react-test-renderer';

describe('the application', () => {
  it('has tests that run', () => {
    expect(true).toBe(true);
  });

  it('has tests that include components', () => {
    renderer.create(<div />);
  });
});
