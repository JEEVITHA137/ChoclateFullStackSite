import React,{Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

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
        method:'GET', 
        credentials: 'include'
    };
              
    fetch( `http://localhost:3000/products`, headers)
      .then(response=>response.json())
      .then(response=>{
        this.setState({
          products:response,
          productsWithoutFilters:response
        })
      })
      .catch(err=>console.log(err))

    fetch( `http://localhost:3000/products/brands`, headers)
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

    fetch( `http://localhost:3000/products/flavour`, headers)
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
          if(productsWithoutFilters[j].cost >= this.state.min && productsWithoutFilters[j].cost <= this.state.max)
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
      <div className="container ">
        <h3 >Filters</h3>
      <div className="row p-2">
        <div className="col-12 col-md-4 p-2" >
        <h4>Brand</h4>
        {
            Object.keys(this.state.brand).map((brands,i)=>{
            return(
              <div key={i} className="row" >
              <div className="col-2 p-2" >
              <input type="checkbox" onChange={this.brandFilter} value={brands}/>
              </div>
              <div className="col-10 p-1" ><label>{brands}</label>
              </div>
              </div>
            )
          })
        }
        </div>
        <div className="col-12 col-md-4 p-2" >
        <h4>Flavour</h4>
        {
          Object.keys(this.state.flavour).map((flavour,i)=>{
            return(
              <div key={i} className="row" >
              <div className="col-2 p-2" >
              <input type="checkbox" onChange={this.flavourFilter} value={flavour}/>
              </div>
              <div className="col-10 p-1" > <label>{flavour}</label>
              </div>
              </div>
            ) 
          })
        }
        </div>
        <div className="col-12 col-md-4 p-2" >
        <h4>Cost</h4>
        <div className="row" >
        <div className="col-6 p-2" >
        <label>Min</label>
        </div>
        <div className="col-6 p-2" >
        <input type="number" value={this.state.min} onChange={(e)=>{this.setState({min:e.target.value,iscostfilter:false})}}/>
        </div>
        </div>
        <div className="row" >
        <div className="col-6 p-2" >
        <label>Max</label>
        </div>
        <div className="col-6 p-2" >
        <input type="number" value={this.state.max} onChange={(e)=>{this.setState({max:e.target.value,iscostfilter:false})}}/>
        </div>
        </div>
        <div className="col-4 offset-7">
                  <Button style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                      onClick={this.filter}>Apply</Button>
        </div>
        </div>
        <h3>Products</h3>
     <div className="container" >
      <div className="row p-2">
        {
          this.state.products.length === 0  ? <div>No results found</div>
              :  this.state.products.map((product,i)=>{
        return(
        <Card  key={i} className="col-5 col-md-2 m-1" onClick={()=>{this.viewProduct(product)}}>
        <CardImg top width="100%" height="35%" className="p-3" src={`/${product.img}`} alt="product-img" />
        <CardBody>
          <CardTitle tag="h5">{product.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{product.brand}</CardSubtitle>
          <CardText><div>{product.flavour}</div>
                    <h5 className="p-3">₹ {product.cost}</h5></CardText>
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
