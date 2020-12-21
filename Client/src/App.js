import React,{Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import  Signin from './Components/Signin.js';
import Login from './Components/Login.js';
import Products from './Components/Products.js';
import AddProducts from './Components/AddProduct.js';
import ProductView from './Components/ProductView.js'
import './App.css';

class App extends Component{
  state={
    emailId:"",
    viewproduct:[]
  };

  getEmail = (e) => {
    this.setState({
      emailId:e
    })
  }

  getViewProduct = (e) => {
    this.setState({
      viewproduct:e
    })
  }


  render(){
    console.log(this.state.cart)
    return (
      <div>
        <link rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        />
        <ul>
          <a href="/">product</a>
          <a href="/addproducts">addproduct</a>
        </ul>
         <BrowserRouter>
            <Route exact path="/signin" render={(props) => <Signin {...props}  getEmail={this.getEmail} />}></Route>
            <Route exact path="/login" render={(props) => <Login {...props}  getEmail={this.getEmail} />}></Route>
            <Route exact path="/"  render={(props) => <Products {...props}  emailId={this.state.emailId} getViewProduct={this.getViewProduct}/>}></Route>
            <Route exact path="/addproducts" render={(props) => <AddProducts {...props}  emailId={this.state.emailId} />}></Route>
            <Route exact path="/view" render={(props) => <ProductView {...props}  emailId={this.state.emailId} viewproduct={this.state.viewproduct}/>}></Route>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
