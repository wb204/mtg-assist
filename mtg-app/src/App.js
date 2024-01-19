import React from 'react';
import LifeCounter from './LifeCounter';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <section className="grid place-items-center bg-emerald-900 p-16 min-h-screen">
        <LifeCounter />
      </section>
    </div>
  );
}

export default App;
