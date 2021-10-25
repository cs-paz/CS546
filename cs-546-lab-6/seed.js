const { create }  = require('./data/restaurants')
const { createReview, getAll, get, remove, } = require('./data/reviews')

const main = async () => {
  const restaurant1 = await create('Sandcastle Diner', 'Beachwood', '555-555-5555', 'http://www.youtube.com', '$', ['pancakes'], {dineIn: true, takeOut: true, delivery: false})
  const restaurant1_r1 = await createReview (
    restaurant1._id,
    "Poor quality",
    "Christian Szablewski-Paz",
    2,
    "10/28/2020",
    "the food wasn't really that good"
  )
  const restaurant1_r2 = await createReview (
    restaurant1._id,
    "Okay quality",
    "Justis dibatista",
    3,
    "10/25/2020",
    "the food wasn't really that good"
  )
  const restaurant1_r3 = await createReview (
    restaurant1._id,
    "Great quality",
    "Zack edwards",
    5,
    "10/23/2020",
    "the food wasn't really that good"
  )
  const restaurant2 = await create('Moes', 'Toms River', '666-666-6666', 'http://www.hello.com', '$$', ['burritos'], {dineIn: true, takeOut: true, delivery: false})
  const restaurant2_r1 = await createReview (
    restaurant2._id,
    "Poor quality",
    "Christian Szablewski-Paz",
    2,
    "10/28/2020",
    "the food wasn't really that good"
  )
  const restaurant2_r2 = await createReview (
    restaurant2._id,
    "Okay quality",
    "Justis dibatista",
    3,
    "10/25/2020",
    "the food wasn't really that good"
  )
  const restaurant2_r3 = await createReview (
    restaurant2._id,
    "Great quality",
    "Zack edwards",
    5,
    "10/23/2020",
    "the food wasn't really that good"
  )
  const restaurant3 = await create('Gios', 'Hoboken', '222-222-2222', 'http://www.giovannis.com', '$$$', ['pennevodka'], {dineIn: true, takeOut: true, delivery: true})
  const restaurant3_r1 = await createReview (
    restaurant3._id,
    "Poor quality",
    "Christian Szablewski-Paz",
    2,
    "10/28/2020",
    "the food wasn't really that good"
  )
  const restaurant3_r2 = await createReview (
    restaurant3._id,
    "Okay quality",
    "Justis dibatista",
    3,
    "10/25/2020",
    "the food wasn't really that good"
  )
  const restaurant3_r3 = await createReview (
    restaurant3._id,
    "Great quality",
    "Zack edwards",
    5,
    "10/23/2020",
    "the food wasn't really that good"
  )
  const restaurant4 = await create('chickFila', 'stafford', '333-333-3333', 'http://www.chickfila.com', '$', ['chicken'], {dineIn: true, takeOut: true, delivery: false})
  const restaurant4_r1 = await createReview (
    restaurant4._id,
    "Poor quality",
    "Christian Szablewski-Paz",
    2,
    "10/28/2020",
    "the food wasn't really that good"
  )
  const restaurant4_r2 = await createReview (
    restaurant4._id,
    "Okay quality",
    "Justis dibatista",
    3,
    "10/25/2020",
    "the food wasn't really that good"
  )
  const restaurant4_r3 = await createReview (
    restaurant4._id,
    "Great quality",
    "Zack edwards",
    5,
    "10/23/2020",
    "the food wasn't really that good"
  )
  const restaurant5 =  await create('dunkin', 'pinebeach', '444-444-4444', 'http://www.dunkin.com', '$', ['donuts'], {dineIn: true, takeOut: true, delivery: false})
  const restaurant5_r1 = await createReview (
    restaurant5._id,
    "Poor quality",
    "Christian Szablewski-Paz",
    2,
    "10/28/2020",
    "the food wasn't really that good"
  )
  const restaurant5_r2 = await createReview (
    restaurant5._id,
    "Okay quality",
    "Justis dibatista",
    3,
    "10/25/2020",
    "the food wasn't really that good"
  )
  const restaurant5_r3 = await createReview (
    restaurant5._id,
    "Great quality",
    "Zack edwards",
    5,
    "10/23/2020",
    "the food wasn't really that good"
  )

  // console.log(await get('6175eb17fe19e37bd3b6e68e'))
  // console.log(await getAll())
  // await remove('6175e9cb7e41967b444ea0bf')
  // await update('6175eb17fe19e37bd3b6e692', 'starbucks', 'brick', '123-456-789', 'http://www.starbucks.com', '$$', ['coffee'],  {dineIn: true, takeOut: true, delivery: false })
  // console.log (await getAll('6175eb17fe19e37bd3b6e68e'))
  // console.log(await get('6175f1525985347e20c60e0f'))
  // console.log(await remove('6175f1525985347e20c60e0f'))
}

main()