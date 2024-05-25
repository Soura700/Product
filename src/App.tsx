import React from 'react';
import ProductPage from './components/Product/Products';

// Define the component as a Functional Component using TypeScript's React.FC type
const App: React.FC = () => {
  return (
    <div className="App">
      <ProductPage/>
    </div>
  );
};

export default App;
