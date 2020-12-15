import React,{Component} from 'react';

class AddProduct extends Component{

  state = {
    name:"",
    material:"",
    cost:"",
    quantity:"",
    color:"",
    brand:"",
    imagefile:[],
    filename:""
  };

  nameChange = (e) => {
    this.setState({
      name:e.target.value
    })
  }

  materialChange = (e) => {
    this.setState({
      material:e.target.value
    })
  }

  costChange = (e) => {
    this.setState({
      cost:e.target.value
    })
  }
 
  quantityChange = (e) => {
    this.setState({
      quantity:e.target.value
    })
  }

  colorChange = (e) => {
    this.setState({
      color:e.target.value
    })
  }

  brandChange = (e) => {
    this.setState({
      brand:e.target.value
    })
  }

  ImageChange = (e) => { 

    this.setState({
      imagefile:e.target.files[0],
    })
    console.log(e.target.files[0].name)
  }

  submit = (e) =>{

    console.log(this.state.imagefile);
    let imageFormObj = new FormData();
    
    imageFormObj.append("name",this.state.name);
    imageFormObj.append("material",this.state.material);
    imageFormObj.append("cost",this.state.cost);
    imageFormObj.append("quantity",this.state.quantity);
    imageFormObj.append("color",this.state.color);
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
    // this.setState({
    //   name:"",
    //   material:"",
    //   cost:"",
    //   quantity:"",
    //   color:"",
    //   brand:"",
    //   imagefile:[]
    // })

}


  render(){
    return (
      <div>
        <header>
          <h1>Add Product</h1>
        </header>
          <form>
          <p>Name:<input type="text" value={this.state.name} onChange={this.nameChange}/></p>
          <p>Material:<input type="text" value={this.state.material} onChange={this.materialChange}/></p>
          <p>Cost:<input type="number" value={this.state.cost} onChange={this.costChange}/></p>
          <p>Quantity:<input type="number" value={this.state.quantity} onChange={this.quantityChange}/></p>
          <p>Color:<input type="text" value={this.state.color} onChange={this.colorChange}/></p>
          <p>Brand:<input type="text" value={this.state.brand} onChange={this.brandChange}/></p>
          <p>Image:<input type="file" onChange={(e) => this.ImageChange(e)} /></p>
          <button onClick={(e) => this.submit(e)}>Submit</button>
          </form>
          <p>Already user?<a href="/login">Login</a></p>
      </div>
    );
  }
}

export default AddProduct;
