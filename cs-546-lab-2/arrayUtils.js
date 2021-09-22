const arrayErrorChecks = (array, forEachCond) => {
    if(!array || array.length === 0) {
        throw new Error("Array length cannot be 0 or undefined.")
    }
    if(typeof array === "undefined") {
        throw new Error("Array is undefined.")
    }
    if(!Array.isArray(array)) {
        throw new Error("Argument is not an array.")
    }
    array.forEach((elem) => {
        if(forEachCond) {
            throw new Error("all array elements must be nonempty arrays.")
        }
    })
}

const arrayWithNumbersErrorChecks = (array, allowChars) => {
    if(!array || array.length === 0) {
        throw new Error("Array length cannot be 0 or undefined.")
    }
    if(typeof array === "undefined") {
        throw new Error("Array is undefined.")
    }
    if(!Array.isArray(array)) {
        throw new Error("Argument is not an array.")
    }
    array.forEach((elem) => {
        if(!allowChars) {
            if(typeof elem !== "number") {
                throw new Error("all array elements must be numbers")
            }
        }
        else if(typeof elem !== "number" && typeof elem !== "string" ) {
            throw new Error("all array elements must be numbers or single character strings")
        }
    })
}


const average = (array) => {
    arrayErrorChecks(
        array,
        !Array.isArray(array) || array.length === 0
    )
    const flattenedList = [].concat.apply([], array)
    flattenedList.forEach((elem) => {
        if(typeof elem !== "number") {
            throw new Error("All array elements must be numbers.")
        }
    })
    let sum = 0
    flattenedList.forEach((elem) => {
        sum += elem
    })
    return sum / flattenedList.length
}

const modeSquared = (array) => {
    arrayErrorChecks (
        array,
        !Array.isArray(array)
    )
    arrayWithNumbersErrorChecks(array, false)
    let obj = {}
    array.forEach((elem) => {
        obj = {
            ...obj,
            [elem]: !obj[elem] ? 1 : obj[elem] + 1
        }
    })

    let modes = []
    let maxOccurences = 1
    Object.keys(obj).forEach((key) => {
        if(obj[key] > maxOccurences) {
            modes = [key]
            maxOccurences = obj[key]
        }
        else if (obj[key] === maxOccurences) {
            modes.push(key)
        }
    })

    const squaredModes = modes.map((elem) => {
        return Math.pow(elem, 2)
    })

    if(squaredModes.length === 1) {
        return squaredModes[0]
    }
    else if(squaredModes.length > 1) {
        let sum = 0
        squaredModes.forEach((elem) => {
            sum += elem
        })
        return sum
    }
    
    return 0
    
}

const medianElement = (array) => {
    arrayErrorChecks (
        array,
        !Array.isArray(array)
    )
    arrayWithNumbersErrorChecks(array, false)
    const sortedArray = array.sort((a, b) => {return a-b})

    let obj = {}
    if(sortedArray.length % 2 === 1) {
        const median = sortedArray[((sortedArray.length + 1) / 2) - 1]
        obj[median] = ((sortedArray.length + 1) / 2) - 1
        return obj
    }

    const median = (sortedArray[(sortedArray.length) / 2] + sortedArray[(sortedArray.length) / 2 - 1])/2 
    obj[median] = (sortedArray.length) / 2
    return obj
}

const merge = (array1, array2) => {
    arrayErrorChecks (
        array1,
        !Array.isArray(array1)
    )
    arrayWithNumbersErrorChecks(array1, true)
    array1.forEach((elem) => {
        if(typeof elem === "string" && elem.length > 1) {
            throw new Error("Strings must be of length 0")
        }
    })
    arrayErrorChecks (
        array2,
        !Array.isArray(array2)
    )
    arrayWithNumbersErrorChecks(array2, true)
    array2.forEach((elem) => {
        if(typeof elem === "string" && elem.length > 1) {
            throw new Error("Strings must be of length 0")
        }
    })

    const combinedArr = array1.concat(array2)
    const numbersArr = combinedArr.filter((elem) => {
        return typeof elem === "number"
    }).sort((a, b) => {return a-b})
    const charsArr = combinedArr.filter((elem) => {
        return typeof elem === "string"
    }).sort((a, b) => {
        if (a === a.toLowerCase() && b === b.toLowerCase() || a === a.toUpperCase() && b[0] === b[0].toUpperCase()) {
            return a.localeCompare(b);
        }
        if (a === a.toLowerCase()) {
            return -1;
        }
        return 1;
    })
    const sortedArr =  charsArr.concat(numbersArr)
    return sortedArr
}

// console.log(average([[1], [2], [3]])) // Returns: 2
// console.log(average([[1], [2], [3]])) // Returns: 2
// console.log(average([[1,3], [2,4,5]])) // Returns: 3 
// console.log(average([[1,3], ["hi",4,5]])) // throws an error  
// console.log(average([[1,3], []])) // throws an error 
// console.log(average([[1,3], [1],[]])) // throws an error 
// console.log(average([])) // throws an error 
// console.log(average("banana")) // throws an error
// console.log(average(["guitar", 1, 3, "apple"])) // throws an error 
// console.log(average()) // throws an error

// console.log(modeSquared([1, 2, 3, 3, 4])) // Returns: 9
// console.log(modeSquared([])) // throws an error
// console.log(modeSquared("banana")) // throws an error
// console.log(modeSquared(1,2,3)) // throws an error
// console.log(modeSquared(["guitar", 1, 3, "apple"])) // throws an error
// console.log(modeSquared()) // throws an error

// console.log(medianElement([5, 6, 7])) // Returns: {'6': 1}
// console.log(medianElement([5, 6, 7, 8])) // Returns: {'6.5': 2}
// console.log(medianElement(5, 6, 7)) // throws error
// console.log(medianElement([])) // throws error
// console.log(medianElement()) // throws error
// console.log(medianElement("test")) // throws error
// console.log(medianElement([1,2,"nope"])) // throws error

// console.log(merge([1, 2, 3], [3, 1, 2])) // Returns: [1,1,2,2,3,3]
// console.log(merge([1, 2, 3, 'g'], ['d','a', 's'])) // Returns:['a', 'd', 'g', 's', 1, 2, 3] 
// console.log(merge(['A', 'B', 'a'], [1, 2, 'Z'])) // Returns ['a', 'A', 'B', 'Z', 1, 2]
// console.log(merge([null, null, null], [null, null, null])) // throws
// console.log(merge([], ['ab', 'ts'])) // throws

module.exports = {
    average,
    modeSquared,
    medianElement,
    merge,
}