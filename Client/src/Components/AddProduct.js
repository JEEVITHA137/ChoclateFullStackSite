import React,{Component} from 'react';

class AddProduct extends Component{

  state = {
    name:"",
    flavour:"",
    cost:"",
    quantity:"",
    brand:"",
    imagefile:[]
  };

  submit = (e) =>{

    console.log(this.state.imagefile);
    let imageFormObj = new FormData();
    
    imageFormObj.append("name",this.state.name);
    imageFormObj.append("flavour",this.state.flavour);
    imageFormObj.append("cost",this.state.cost);
    imageFormObj.append("quantity",this.state.quantity);
    imageFormObj.append("brand",this.state.brand);
    imageFormObj.append("productimage",this.state.imagefile);

    const headers = {
        method:'POST', 
        body: imageFormObj
    };

    fetch( `http://localhost:3000/products/`,headers)
    .then(response=>response.json())
    .catch(err=>console.log(err))

    e.target.reset();

}


  render(){
    return (
      <div>
        <header>
          <h1>Add Product</h1>
        </header>
          <form>
          <p>Name:<input type="text" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}/></p>
          <p>Flavour:<input type="text" value={this.state.flavour} onChange={(e)=>{this.setState({flavour:e.target.value})}}/></p>
          <p>Cost:<input type="number" value={this.state.cost} onChange={(e)=>{this.setState({cost:e.target.value})}}/></p>
          <p>Quantity:<input type="number" value={this.state.quantity} onChange={(e)=>{this.setState({quantity:e.target.value})}}/></p>
          <p>Brand:<input type="text" value={this.state.brand} onChange={(e)=>{this.setState({brand:e.target.value})}}/></p>
          <p>Image:<input type="file" onChange={(e)=>{this.setState({imagefile:e.target.files[0]})}} /></p>
          <button onClick={(e) => this.submit(e)}>Submit</button>
          </form>
          <p>Already user?<a href="/login">Login</a></p>
      </div>
    );
  }
}

export default AddProduct;
