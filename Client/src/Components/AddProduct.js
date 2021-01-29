import React,{Component} from 'react';
import {  Form, FormGroup, Label, Input } from 'reactstrap';
import { hostname } from './hostname';

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
    e.preventDefault();
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

    console.log(headers)
    fetch( `${hostname}products/`,headers)
    .then(response=>response.json())
    .catch(err=>console.log(err))

    this.setState({
        name:"",
        flavour:"",
        cost:"",
        quantity:"",
        brand:"",
        imagefile:""
    })

}


  render(){
    return (
      <div className="container">
      <Form className="form profile" onSubmit={(e) => this.submitForm(e)}>
          <h4 className="m-2" style={{color:"#0b498f"}}>Add Product</h4>

          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="ProductName" >Product Name :</Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="string" style={{height:"2rem"}} id="ProductName" placeholder="Give Product Name"
                   value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}} />
              </div>
          </FormGroup>

          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="Flavour" >Flavour :</Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="string" style={{height:"2rem"}} id="Flavour" placeholder="Add Flavour"
                  value={this.state.flavour} onChange={(e)=>{this.setState({flavour:e.target.value})}} />
              </div>
          </FormGroup>

          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="Cost" >Cost :</Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input style={{height:"2rem"}} id="Cost" type="number"  placeholder="Add Cost"
                  value={this.state.cost} onChange={(e)=>{this.setState({cost:e.target.value})}} />
              </div>
          </FormGroup>

          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="Quantity" >Quantity :</Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input style={{height:"2rem"}} id="Quantity" type="number"  placeholder="Add Quantity"
                 value={this.state.quantity} onChange={(e)=>{this.setState({quantity:e.target.value})}}/>
              </div>
          </FormGroup>

          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="Brand" >Brand :</Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="string" style={{height:"2rem"}} id="Brand" placeholder="Add Brand"
                 value={this.state.brand} onChange={(e)=>{this.setState({brand:e.target.value})}} />
              </div>
          </FormGroup>

          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="Image" >Image :</Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input style={{height:"3rem"}} id="Image"
                   type="file" onChange={(e)=>{this.setState({imagefile:e.target.files[0]})}}/>
              </div>
          </FormGroup>

          <FormGroup className="row p-2">
              <div className="col-4 offset-7">
                  <div className="buton"
                      type = "submit" onClick={(e) => this.submit(e)}>Add Product</div>
              </div>
          </FormGroup>
      
      </Form>
  
  </div>
    );
  }
}

export default AddProduct;
