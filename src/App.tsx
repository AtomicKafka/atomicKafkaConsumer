import * as React from 'react';
import { render } from 'react-dom';
import Consumer from './Consumer';
// import Producer from './Producer';

function App() {
  return(
    <div>
      <h1>Inventory</h1>
      <Consumer />
      {/* <Producer /> */}
    </div>
  )
}

export default App;