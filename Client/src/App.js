import React,{Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import  Signin from './Components/Signin.js';
import Login from './Components/Login.js';
import './App.css';

class App extends Component{

  render(){
    return (
      <div>
         <BrowserRouter>
            <Route exact path="/">
              <Signin/>
            </Route>  
            <Route exact path="/login">
              <Login/>
            </Route>  
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
