import React,{Component} from 'react';
import Menu from './Components/Menu.js';

import './App.css';

class App extends Component{


  render(){
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"/>
        <Menu/>
      </div>
    );
  }
}

export default App;
