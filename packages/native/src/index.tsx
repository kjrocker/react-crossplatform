import { withFoo } from '@kjrocker/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class App extends React.Component<{ foo: string }> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Foo Prop is: {this.props.foo}</Text>
        <Text>This is amazing test wat wat TEST</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default withFoo(App);
