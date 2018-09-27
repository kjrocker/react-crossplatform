import { withFoo } from '@kjrocker/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const BaseApp = ({ foo }: { foo: string }) => <div>{foo}</div>;
const App = withFoo(BaseApp);

ReactDOM.render(<App />, document.getElementById('root'));
