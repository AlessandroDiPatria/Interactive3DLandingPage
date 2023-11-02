import './App.css';
import { useEffect } from 'react';
import React from 'react';
import Home from './Components/Home';
import Environment from './Components/Environment';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Space from './Components/Space';






function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/environment" element={<Environment/>}/>
        <Route path="/space" element={<Space/>}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

/*
function App() {

  return (
    <div className="App">
      
     <Home/>
     
   
   
    </div>
    
  );
}*/

export default App;