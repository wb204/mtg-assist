import React from 'react';
import LifeCounter from './LifeCounter';
import './App.css';

function App() {
  return (
    <div className="App">
      <section className="grid place-items-center bg-gradient-to-r from-emerald-500 to-emerald-900 p-16 min-h-screen">
        <LifeCounter />
      </section>
    </div>
  );
}

export default App;
