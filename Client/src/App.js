import React,{Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import  Signin from './Components/Signin.js';
import Login from './Components/Login.js';
import Products from './Components/Products.js';
import AddProducts from './Components/AddProduct.js';
import './App.css';

class App extends Component{

  render(){
    return (
      <div>
        <ul>
          <a href="/products">product</a>
          <a href="/addproducts">addproduct</a>
        </ul>
         <BrowserRouter>
            <Route exact path="/">
              <Signin/>
            </Route>  
            <Route exact path="/login">
              <Login/>
            </Route>  
            <Route exact path="/products">
              <Products/>
            </Route>  
            <Route exact path="/addproducts">
              <AddProducts/>
            </Route>  
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
