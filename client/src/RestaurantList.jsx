import React from 'react';

const RestaurantList = props => {
    let restaurants;
    if(props.restaurants.length){
        restaurants = props.restaurants.map((restaurant, index) => {
            return <p className='restaurantrow' key={index}>{restaurant.name}</p>
        })
    } else {
        //no data yet
        restaurants = <p>No Data!</p>
    }
    return(
        <div className='RestaurantList'>
            <h3>All the Restaurant :</h3>
            {restaurants}
            <hr/>
            <form onSubmit={props.handleSubmit}>
                <input onChange={props.handleRestaurantNameChange} type="text" name="name" value={props.name}/>
                <input onChange={props.handleRestaurantAddressChange} type="text" name="address" value={props.address}/>
                <input type="submit" value='Add Restaurant'/>
            </form>
        </div>
    )
}

export default RestaurantList;