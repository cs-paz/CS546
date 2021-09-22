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

const computeObjects = (objects, func) => {
    arrayErrorChecks(objects, false)
    objects.forEach((object) => {
        if(typeof object !== "object") {
            throw new Error('All array elements must be objects.')
        }
        if(object === {}) {
            throw new Error('Objects cannot be empty.')
        }
        Object.keys(object).forEach((key) => {
            if (typeof object[key] !== "number") {
                throw new Error('All key values must be numbers.')
            }
        })
    })
    if(typeof func !== "function") {
        throw new Error('2nd parameter must be a function.')
    }

    finalObj = {}
    objects.forEach((object) => {
        Object.keys(object).forEach((key) => {
            if(Object.keys(finalObj).includes(key)) {
                finalObj[key] = finalObj[key] + func(object[key])
            }
            else {
                finalObj[key] = func(object[key])
            }
        })      
    })
    
    return finalObj
}

const commonKeys = (obj1, obj2) => {
    if(!obj1 || typeof obj1 !== "object") {
        throw new Error("both arguments must be non null objects and defined")
    }
    if(!obj2 || typeof obj2 !== "object" ) {
        throw new Error("both arguments must be non null objects and defined")
    }

    finalObj = {}
    Object.keys(obj1).forEach((key) => {
        if(Object.keys(obj2).includes(key) && obj1[key] === obj2[key]) {
            finalObj[key] = obj1[key]
        }
    })      
    
    return finalObj
}

const flipObjectSimple = (object) => {
    let obj = {}
    Object.keys(object).forEach((key) => {
        obj[object[key]] = key
    })
    return obj
}

const traversal = (object, func) => {
    let finalObj = {}
    Object.keys(object).forEach((key) => {
        if(typeof object[key] === "object") {
            finalObj[key] = func(object[key])
        }
        else {
            finalObj[object[key]] = key
        }
        if (object[key] !== null && object[key] ==="object") {
            traversal(object[key], func)
        }
    })

    return finalObj
}

const flipObject = (object) => {
    if(typeof object !== "object") {
        throw new Error("input must be an object.")
    }
    if(Object.keys(object).length === 0) {
        throw new Error("object must have at least one key")
    }

    return traversal(object, flipObjectSimple)
}

// const first = { x: 2, y: 3}
// const second = { a: 70, x: 4, z: 5 }
// const third = { x: 0, y: 9, q: 10 }
// const firstSecondThird = computeObjects([first, second], x => x * 2)
// console.log(firstSecondThird)
// //{ x: 12, y: 6, a: 140, z: 10 }
// // x = (2 * 2) + (4 * 2)

// const first = {a: 2, b: 4}
// const second = {a: 5, b: 4}
// const third = {a: 2, b: {x: 7}}
// const fourth = {a: 3, b: {x: 7, y: 10}}
// console.log(commonKeys(first, second)) // {b: 4}
// console.log(commonKeys(first, third)); // {a: 2}
// console.log(commonKeys(second, third)); // {}

// this fails
// console.log(commonKeys(third, fourth)); // {b: { x: 7}}

// console.log(commonKeys({}, {})); // {} 

// console.log(flipObject({ a: 3, b: 7, c: 5 }))
// /* Returns:
// {
//   3: a,
//   7: b,
//   5: c
// }
// */
// console.log(flipObject({ a: 3, b: 7, c: { x: 1 } }))
// /* Returns:
// {
//   3: a,
//   7: b,
//   c: {1: x}
// }
// */

module.exports = {
    computeObjects,
    commonKeys,
    flipObject
}