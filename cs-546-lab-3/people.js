const axios = require('axios')

const stringErrorChecking = (string) => {
  if(!string || string === null || typeof string !== "string") {
    throw new Error('id parameter must defined, non null, and of type string.')
  }

  if(string.includes(' ')) {
    throw new Error('id parameter must not contain spaces.')
  }
}

const getPeople = async () => {
  const { data } = await axios.get(`https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json`)
  return data
}

const getPersonById = async (id) => {
  stringErrorChecking(id)

  const people = await getPeople()
  let personData = null

  const loop = people.forEach((person) => {
    if(person.id === id) {
      personData = person
    }
  })

  if(!personData || personData === null || typeof personData !== "object") {
    throw new Error('person not found')
  }
  
  return personData
}

const sameStreet = async (streetName, streetSuffix) => {
  stringErrorChecking(streetName)
  stringErrorChecking(streetSuffix)

  const people = await getPeople()
  let peopleOnThisStreet = []

  const loop = people.forEach((person) => {
    if(person.address.home.street_name === streetName && person.address.home.street_suffix === streetSuffix) {
      peopleOnThisStreet.push(person)
    }
    if(person.address.work.street_name === streetName && person.address.work.street_suffix === streetSuffix) {
      peopleOnThisStreet.push(person)
    }
  })

  if(peopleOnThisStreet.length < 2) {
    throw new Error('There is not two or more users on this street')
  }

  return peopleOnThisStreet
}



const manipulateSsn = async () => {
  const people = await getPeople()

  const socials = []
  people.forEach((person) => {
    socials.push(person.ssn)
  })

  let socialToPush = []
  const modifiedSocials = []
  socials.forEach((ssn) =>  {
    let ssnCharArray = [...ssn]
    ssnCharArray.forEach((elem) => {
      if(elem !== "-") {
        socialToPush.push(elem)
      }
    })
    modifiedSocials.push(socialToPush)
    socialToPush = []
  })

  const modifiedSocialsToNumbers = []
  
  modifiedSocials.forEach((ssnArray) => {
    modifiedSocialsToNumbers.push(ssnArray.map((char) => {
      return Number(char)
    }).sort((a, b) => {return a-b}))
  })

  let sortedSSNString = ""
  const sortedSSNStrings = []

  modifiedSocialsToNumbers.forEach((ssnNumArray) => {
    ssnNumArray.forEach((num) => {
      sortedSSNString += num.toString()
    })
    sortedSSNStrings.push(sortedSSNString)
    sortedSSNString = ""
  })

  const finalArray = sortedSSNStrings.map((ssn, index) => {
    return Number(ssn)
  })

  const min = finalArray.reduce((a, b) => Math.min(a, b))
  const max = finalArray.reduce((a, b) => Math.max(a, b))

  let minMaxIndicies = {}

  finalArray.forEach((elem, index) => {
    if(elem === min) {
      minMaxIndicies[min] = index
    }
    if(elem === max) {
      minMaxIndicies[max] = index
    }
  })

  const sum = finalArray.reduce((a, b) => {return a + b})
  const avg = sum / finalArray.length

  return {
    highest: {
      firstName: people[minMaxIndicies[max]].first_name,
      lastName: people[minMaxIndicies[max]].last_name
    },
    lowest: {
      firstName: people[minMaxIndicies[min]].first_name,
      lastName: people[minMaxIndicies[min]].last_name
    },
    average: Math.floor(avg)
  }
}

const sameBirthday = async(month, day) => {
  const people = await getPeople()

  if(!month || month === null || (typeof month !== "number" && typeof month !== "string")) {
    throw new Error ("Month must be a non null string or number.")
  }

  if(!day || day === null || (typeof day !== "number" && typeof day !== "string")) {
    throw new Error ("Day must be a non null string or number.")
  }

  let newMonth = false
  if(typeof month === "string") {
    newMonth = Number(month)
    if(newMonth < 1 || newMonth > 12) {
      throw new Error("Month was given as string and cannot be casted to a Number.")
    }
  }

  let newDay = false
  if(typeof day === "string") {
    newDay = Number(day)
    if(newDay < 1 || newDay > 31) {
      throw new Error("Day was given as string and cannot be casted to a Number.")
    }

    if(newMonth === 4 || newMonth === 6 || newMonth === 9 || newMonth === 11) {
      if(newDay > 30) {
        throw new Error("Invalid date for given month.")
      }
    }

    if(newMonth === 2) {
      if(newDay > 28) {
        throw new Error("Invalid date for given month.")
      }
    }
  }

  if(!newDay && !newMonth) {
    if(month < 1) {
      throw new Error(`Month < 1`)
    }
    if(month > 12) {
      throw new Error(`Month > 12`)
    }

    if(day < 1 || day > 31) {
      throw new Error("Day was given as string and cannot be casted to a Number.")
    }

    if(month === 4 || month === 6 || month === 9 || month === 11) {
      if(day > 30) {
        throw new Error("Invalid date for given month.")
      }
    }

    if(month === 2) {
      if(day > 28) {
        throw new Error("Invalid date for given month.")
      }
    }
  }

  

  const birthdays = people.map((person) => {
    return {
      firstName: person.first_name,
      lastName: person.last_name,
      birthMonth: Number(person.date_of_birth.substr(0, 2)),
      birthDay: Number(person.date_of_birth.substr(3, 2))
    }
  })

  const sameBirthdays = []
  birthdays.forEach((person) => {
    if(person.birthMonth === month && person.birthDay === day) {
      sameBirthdays.push(`${person.firstName} ${person.lastName}`)
    }
    if(newMonth && newDay && person.birthMonth === newMonth && person.birthDay === newDay) {
      sameBirthdays.push(`${person.firstName} ${person.lastName}`)
    }
  })

  if(sameBirthdays.length > 0) {
    return sameBirthdays 
  }

  throw new Error('No person with this birthday found.')
}

const main = async () => {
  // console.log(await getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10"))
  // console.log(await getPersonById(-1))  // Throws Error 
  // console.log(await getPersonById(1001))  // Throws Error 
  // console.log(await getPersonById()) // Throws Error
  // console.log(await getPersonById('7989fa5e-5617-43f7-a931-46036f9dbcff')) // Throws person not found Error

  // console.log(await sameStreet("Sutherland", "Point"))
  // console.log(await sameStreet(1,"Street")) // Throws Error
  // console.log(await sameStreet("Street", 1)) // Throws Error
  // console.log(await sameStreet("Street")) // Throws Error
  // console.log(await sameStreet()) // Throws Error 
  // console.log(await sameStreet("Crownhardt","Park")) // Throws Error since there are not at least two people that live or work on Crownhardt Park

  // console.log(await manipulateSsn())

  // console.log(await sameBirthday(09, 25)) // Returns: ['Khalil Ovitts',  'Erny Van Merwe', 'Emanuel Saben', 'Iorgos Tembridge']
  // console.log(await sameBirthday(9, 25)) // Returns: ['Khalil Ovitts',  'Erny Van Merwe', 'Emanuel Saben', 'Iorgos Tembridge']
  // console.log(await sameBirthday("09", "25")) // Returns: ['Khalil Ovitts',  'Erny Van Merwe', 'Emanuel Saben', 'Iorgos Tembridge'] because the parameters can be parsed into valid numbers.
  // console.log(await sameBirthday(09, 31)) // Throws Error: There are not 31 days in Sept
  // console.log(await sameBirthday(13, 25)) // Throws Error: Month > 12
  // console.log(await sameBirthday(02, 29)) // Throws Error: There are not 29 days in Feb
  // console.log(await sameBirthday("09", "31")) // Throws Error: There are not 31 days in Sept
  // console.log(await sameBirthday("      ", "25")) // Throws Error

  // console.log(await sameBirthday()) // Throws Error:

  // console.log(await getPeople())
}

main()

module.exports = {
  getPersonById,
  sameStreet,
  manipulateSsn,
  sameBirthday
}