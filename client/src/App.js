import React, {Component} from 'react';
import './App.css';
import RestaurantList from './RestaurantList'
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      restaurants: [],
      restaurantName: '',
      restaurantAddress: '',
    }
    this.handleRestaurantAddressChange = this.handleRestaurantAddressChange.bind(this);
    this.handleRestaurantNameChange = this.handleRestaurantNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleRestaurantNameChange(e){
    this.setState({
      restaurantName: e.target.value
    })
  }

  handleRestaurantAddressChange(e){
    this.setState({
      restaurantAddress: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    axios.post('/restaurants', {
      name: this.state.restaurantName,
      address: this.state.restaurantAddress
    }).then(res => {
      axios.get('/restaurants').then((res) =>{
        this.setState({
          restaurants: res.data
        })
      })
    })
  }

  componentDidMount(){
    axios.get('/restaurants')
    .then(res => {
      this.setState({
        restaurants: res.data
      })
    })
  }
  
  render(){
    return(
      <div className='App'>
        <RestaurantList restaurants={this.state.restaurants}
                        handleRestaurantNameChange={this.handleRestaurantNameChange}
                        handleRestaurantAddressChange={this.handleRestaurantAddressChange}
                        handleSubmit={this.handleSubmit}
                        name={this.state.restaurantName}
                        address={this.state.restaurantAddress}/>
      </div>
    )
  }
}



export default App;