import React, { Component } from 'react';
import { render }from 'react-dom';
import HomePage from './components/HomePage';

const App = () =>{
    return (
        <div>
            <HomePage />
        </div>
        
    )
}

const appDiv = document.getElementById('app');
render(<App />, appDiv);