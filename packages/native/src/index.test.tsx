import * as React from 'react';
import { Text } from 'react-native';
import * as renderer from 'react-test-renderer';

describe('the application', () => {
  it('has tests that run', () => {
    expect(true).toBe(true);
  });

  it('has tests that use components', () => {
    renderer.create(<Text>Hello World</Text>);
  });
});
