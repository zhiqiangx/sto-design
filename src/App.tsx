import React, { FunctionComponent } from 'react';
import { Button } from '@alifd/next';
import './App.scss';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button type="primary">HHHH</Button>
      </header>
    </div>
  );
}

export default App;
