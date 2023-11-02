 
import { useEffect } from 'react';
import Landing  from './cube';
import React from 'react';
import NavBar from './header';
import Title from './title';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Space from './Space';

const Home = () => {



  return (
    <div className="container">
        <NavBar/>
     <Space/>
     <Title/>    
    </div>
    
  );}

export default Home;