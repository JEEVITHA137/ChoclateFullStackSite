import React,{Component} from 'react';
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, UncontrolledCollapse, Button,} from 'reactstrap';
import { hostname } from './hostname';

class Products extends Component{

  state = {
        products:[],
        brand:{},
        flavour:{},
        max:"",
        min:"",
        productsWithoutFilters:[],
        isbrandfilter:false,
        iscostfilter:false,
        isflavourfilter:false,
        isnoresults:false
  };

  componentDidMount(){
    const headers = {
        method:'GET'
    };
              
    fetch( `${hostname}products`, headers)
      .then(response=>response.json())
      .then(response=>{
        this.setState({
          products:response,
          productsWithoutFilters:response
        })
      })
      .catch(err=>console.log(err))

    fetch( `${hostname}products/brands`, headers)
    .then(response=>response.json())  
    .then(response=>{
        let brand={};
          response.map((res)=>{
            brand[res] = false;
            return null;
          })

          this.setState({
            brand:brand
          })
      })
    .catch(err=>console.log(err))

    fetch( `${hostname}products/flavour`, headers)
    .then(response=>response.json())  
    .then(response=>{
      let flavour={};
      response.map((res)=>{
        flavour[res] = false;
        return null;
      })

      this.setState({
        flavour:flavour
      })
  })
    .catch(err=>console.log(err))
  }

  filter = () => {
    let {productsWithoutFilters,flavour,isflavourfilter,brand,isbrandfilter,iscostfilter} = this.state;

    let flavourproducts = [];

    let i = 0;

    isflavourfilter=false;
    isbrandfilter = false;
    iscostfilter = false;

    Object.keys(flavour).map(function(key){
      if(flavour[key])
      {
        isflavourfilter = true;
        for(let j=0;j<productsWithoutFilters.length;j++)
        {
          if(productsWithoutFilters[j].flavour === key)
          {
            flavourproducts[i] = productsWithoutFilters[j];
            i=i+1;
          }
        }
      }
      return null;
    })

    if(isflavourfilter)
    {
      productsWithoutFilters = flavourproducts
    }

    let brandproducts = [];
    i=0;
    Object.keys(brand).map(function(key){
      if(brand[key])
      {
        isbrandfilter=true; 
        for(let j=0;j<productsWithoutFilters.length;j++)
        {
          if(productsWithoutFilters[j].brand === key)
          {
            brandproducts[i] = productsWithoutFilters[j];
            i=i+1;
          }
        }
      }
      return null;
    })

    let costproducts = [];
    
    if(this.state.min !== "" && this.state.max !== "")
    {
      if((isflavourfilter && isbrandfilter) || isbrandfilter)
      {
        productsWithoutFilters = brandproducts;
      }
      else if(isflavourfilter)
      {
        productsWithoutFilters = flavourproducts
      }
  
      i = 0 ;
      iscostfilter = true;

      for(let j=0;j<productsWithoutFilters.length;j++){
        var cost =  parseInt(productsWithoutFilters[j].cost);
          if(cost >= this.state.min && cost <= this.state.max)
          {
              costproducts[i] = productsWithoutFilters[j];
              i = i+1;
          }   
      }
    }
  
    this.setState({
      isbrandfilter:isbrandfilter,
      iscostfilter:iscostfilter,
      isflavourfilter:isflavourfilter
    })

    if((isflavourfilter && isbrandfilter && iscostfilter) || (isbrandfilter && iscostfilter) || (isflavourfilter && iscostfilter) || iscostfilter)
    {
      this.setState({
        products:costproducts
      })
    }
    else if((isbrandfilter && isflavourfilter) || isbrandfilter)
    {
      this.setState({
        products:brandproducts
      })
    }
    else if(isflavourfilter)
    {
      this.setState({
        products:flavourproducts
      })
    }
    else{
      this.setState({
        products:productsWithoutFilters
      })
    }
    
  }

  flavourFilter = (e) => {
    let {flavour} = this.state
    flavour[e.target.value] = e.target.checked;

    this.setState({
      flavour:flavour
    })

    this.filter();
  }

  brandFilter = (e) => {
    let {brand} = this.state;
    brand[e.target.value] = e.target.checked;

    this.setState({
      brand:brand
    })

    this.filter();
  }

  viewProduct = (product) => {
    this.props.getViewProduct(product);
    this.props.history.push("/view")
  }

  render(){
    return (
      <div className="container pt-4" style={{minHeight:'80vh'}}>
        <img src="./filter.png" alt="Filter" id="filter" className="filter"></img>
        <div className="d-flex filters">
        <UncontrolledCollapse toggler="#filter">
        <div className="filters">
        <div>
        <h6 color="primary" id="brand" style={{ marginBottom: '1rem' }}>Brand</h6>
        {
            Object.keys(this.state.brand).map((brands,i)=>{
            return(
              <UncontrolledCollapse toggler="#brand">
              <div key={i} className="row" style={{"fontSize":"15px"}}>
              <div className="col-2 p-2" >
              <input type="checkbox" style={{"height":"10px"}} onChange={this.brandFilter} value={brands}/>
              </div>
              <div className="col-10" ><label >{brands}</label>
              </div>
              </div></UncontrolledCollapse>
            )
          })
        }
        </div>
        <div className="" >
        <h6 color="primary" id="flavour" style={{ marginBottom: '1rem' }}>Flavour</h6>
        {
          Object.keys(this.state.flavour).map((flavour,i)=>{
            return(
              <UncontrolledCollapse toggler="#flavour">
              <div key={i} className="row" style={{"fontSize":"15px"}}>
              <div className="col-2 p-1" >
              <input type="checkbox" style={{"height":"10px"}} onChange={this.flavourFilter} value={flavour}/>
              </div>
              <div className="col-10" > <label>{flavour}</label>
              </div>
              </div>
              </UncontrolledCollapse>
            ) 
          })
        }
        </div>
        <div>
        <h6>Cost</h6>
        <div className="d-flex" >
        <label style={{"fontSize":"15px"}} className="p-1">Min</label>
        <div>
        <input type="number" value={this.state.min} onChange={(e)=>{this.setState({min:e.target.value,iscostfilter:false})}}/>
        </div>
        </div>
        <div className="d-flex" >
        <label style={{"fontSize":"15px"}} className="p-1">Max</label>
        <div>
        <input type="number" value={this.state.max} onChange={(e)=>{this.setState({max:e.target.value,iscostfilter:false})}}/>
        </div>
        </div>
        <div className="col-4">
                  <div className="buton" onClick={this.filter}>Apply</div>
        </div>
        </div>
        </div>
        </UncontrolledCollapse>
      <div className="container pt-5" >
      <div className="row justify-content-center">
        {
          this.state.products.length === 0  ? <div>No results found</div>
              :  this.state.products.map((product,i)=>{
        return(
          <Card  key={i}  className="col-md-3 m-3 product text-center" onClick={()=>{this.viewProduct(product)}}>
          <CardImg className="p-3" style={{height:"190px"}} src={`${hostname}${product.img}`} alt="product-img" />
          <CardBody>
            <CardTitle tag="h5" style={{color:"#0b498f"}}>{product.name}</CardTitle>
            <CardSubtitle tag="h6" className="text-muted">{product.brand}</CardSubtitle>
            <CardText><div>{product.flavour}</div>
                      <h5 style={{color:"#0b498f"}}>₹ {product.cost}</h5></CardText>
          </CardBody>
          </Card>   
        )})
        }
        </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Products;
