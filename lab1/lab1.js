const questionOne = function questionOne(arr) {
    if(typeof arr === "undefined") {
        return {}
    }
    const isPrime = num => {
        for(let i = 2; i < num; i++) {
            if(num % i === 0) {
                return false;
            } 
        }
        return num > 1;
    }
    let obj = {}
    arr.forEach(elem => {
        let result = Math.pow(elem, 2) - 7
        obj = {
            ...obj,
            [Math.abs(result)]: isPrime(Math.abs(result))
        }
    })
    return obj
}


const questionTwo = function questionTwo(arr) { 
   return [...new Set(arr)];
}

const questionThree = function questionThree(arr) {
    // delete duplicates
    const noDuplicates = questionTwo(arr)
    // converts all strings to alphabetical order
    const sortedArr = noDuplicates.map(elem => {
        return elem.split('').sort().join('')
    })

    const findDuplicates = arr => {
        let list = []
        let duplicates = []
        arr.forEach((elem) =>{
            if (list.includes(elem)){
                duplicates.push(elem)
            }
            list.push(elem)
        })
        return duplicates
    }

    const duplicates = findDuplicates(sortedArr)
    const getAnagramLists = (duplicates, sortedArr, noDuplicates) => {
        let indicies = [[]]
        duplicates.forEach((elem1, indexInner) => {
            sortedArr.forEach((elem2, index) => {
                if(elem1 === elem2) {
                    indicies[indexInner].push(noDuplicates[index])
                }
            })
        })
        return indicies
    }
    const anagramList = getAnagramLists(duplicates, sortedArr, noDuplicates)

    const buildAnagramsObject = (duplicates, anagramList) => {
        let anagrams = {}
        duplicates.forEach((elem, index) => {
            anagrams = {
                ...anagrams,
                [elem]: anagramList[index]
            }
        })
        return anagrams
    }

    const anagrams = buildAnagramsObject(duplicates, anagramList)
    
    return anagrams
}

const questionFour = function questionFour(num1, num2, num3) {
    const factorial = num => {
        let factorial = 1
        for(let i = 1; i <= num; i++) {
          factorial *= i;
        }
        return factorial;
    }
    const num1Factorial = factorial(num1)
    const num2Factorial = factorial(num2)
    const num3Factorial = factorial(num3)
    const sum = num1Factorial + num2Factorial + num3Factorial
    const avg = (num1 + num2 + num3) / 3
    const result = Math.floor(sum / avg)
    return result
}

module.exports = {
    firstName: "Christian", 
    lastName: "Szablewski-Paz", 
    studentId: "10445108",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};