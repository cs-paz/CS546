const axios = require('axios')

const testRestaurantPOST = async () => {
  // const data = {
  //   name: 'newRestaurant',
  //   location: 'NYC', 
  //   phoneNumber: '111-111-1111',
  //   website: 'http://www.thisworks.com',
  //   priceRange: '$',
  //   cuisines: ['hotdogs'],
  //   serviceOptions: {dineIn: true, takeOut: true, delivery: false },
  // }
  const response = await axios.post('localhost:3000/restaurants',{
    name: 'newRestaurant',
    location: 'NYC', 
    phoneNumber: '111-111-1111',
    website: 'http://www.thisworks.com',
    priceRange: '$',
    cuisines: ['hotdogs'],
    serviceOptions: {dineIn: true, takeOut: true, delivery: false },
  })
  return response.json(); // parses JSON response into native JavaScript objects
}

testRestaurantPOST()

module.exports = {}