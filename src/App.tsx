import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useGetLaunchesQuery } from "./client-api"
import LaunchesList from './components/LaunchesList';
// import Header from './components/Header'

function App() {
  return (
    <div className='app-container'>
      {/* <Header /> */}
      <LaunchesList />
    </div>
  );
}

export default App;
