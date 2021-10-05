const connection = require("./config/mongoConnection")
const {create, get, getAll, remove, rename} = require('./data/restaurants')

const main = async () => {

  const restaurant1 = await create('Sandcastle Diner', 'Beachwood', '555-555-5555', 'http://www.youtube.com', '$', ['burritos'], 10, {dineIn: true, takeOut: false, delivery: false})
  console.log(restaurant1)

  const restaurant2 = await create('Friendlys', 'Toms River', '666-666-6666', 'http://www.friendlys.com', '$$', ['ice cream'], 10, {dineIn: false, takeOut: true, delivery: false})
  const allRestaurants1 = await getAll()
  console.log(allRestaurants1)

  const restaurant3 = await create('Smash Burger', 'Toms River', '777-777-7777', 'http://www.smash.com', '$$$', ['burgers'], 10, {dineIn: true, takeOut: true, delivery: false})
  console.log(restaurant3)

  const updatedRestaurant1 = await rename(restaurant1._id, 'http://www.anotherwebsite.com')
  console.log(updatedRestaurant1)

  await remove(restaurant2._id)
  const allRestaurants2 = await getAll()
  console.log(allRestaurants2)

  const db = await connection()
  await db.serverConfig.close()

  try {
    await create('', 2, '555-555-555', '', '$$$$$', [], 10, {dineIn: true, takeOut: false, delivery: false})
  } catch(e) {
    console.log(e)
  }

  // valid id but doesn't exist
  // 615cdab552ce7a3c851e2350

  try {
    await remove('615cdab552ce7a3c851e2350')
  } catch(e) {
    console.log(e)
  }

  try {
    await rename('615cdab552ce7a3c851e2350', 'http://www.okayinput.com')
  } catch(e) {
    console.log(e)
  }


  try {
    await rename('615cdab552ce7a3c851e2350', 'badinput')
  } catch(e) {
    console.log(e)
  }


  try {
    await get('615cdab552ce7a3c851e2350')
  } catch(e) {
    console.log(e)
  }

  return 0
}

main().catch(async (error) => {
  console.log(error);

  const db = await connection()
  await db.serverConfig.close()
});
