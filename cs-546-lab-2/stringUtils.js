const stringErrorChecking = (string) => {
    if(!string || typeof string === "undefined" || typeof string === "null") {
        throw new Error("string must be defined and cannot be null/empty")
    }
    if(typeof string !== "string") {
        throw new Error("string must be a string value.")
    }
    if(string.length === 0) {
        throw new Error("string.length must be greater than 0.")
    }
}

const sortString = (string) => {
    const NUMS = ['1','2','3','4','5','6','7','8','9']
    const LOWERCASE_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const UPPERCASE_LETTERS =['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    const isNum = (elem) => {
        if(NUMS.includes(elem)) {
            return true
        }
        return false
    }
    const isLowercase = (elem) => {
        if(LOWERCASE_LETTERS.includes(elem)) {
            return true
        }
        return false
    }
    const isUppercase = (elem) => {
        if(UPPERCASE_LETTERS.includes(elem)) {
            return true
        }
        return false
    }

    stringErrorChecking(string)
    // check if string is just empty spaces
    const charArray = [...string]
    const nums = charArray.filter((elem) => {
        return isNum(elem)
    }).sort((a,b) => {return a-b})
    const lowercase_letters = charArray.filter((elem) => {
        return isLowercase(elem)
    }).sort()
    const uppercase_letters = charArray.filter((elem) => {
        return isUppercase(elem)
    }).sort()
    const spaces = charArray.filter((elem) => {
        return elem === ' '
    })
    const others = charArray.filter((elem) => {
        return !isUppercase(elem) && !isNum(elem) && !isLowercase(elem) && elem !== ' '
    }).sort()

    let finalString = ''
    uppercase_letters.forEach((elem) => {
        finalString += elem
    })
    lowercase_letters.forEach((elem) => {
        finalString += elem
    })
    nums.forEach((elem) => {
        finalString += elem
    })
    others.forEach((elem) => {
        finalString += elem
    })
    spaces.forEach((elem) => {
        finalString += elem
    })

    return finalString
}

const replaceChar = (string, idx) => {
    stringErrorChecking(string)
    if(typeof idx !== "number") {
        throw new Error("idx must be a number.")
    }
    if(idx <= 0 || idx >= string.length - 2) {
        throw new Error("idx must be greater than 0 and less than string.length - 2.")
    }

    const chars = [string.charAt(idx - 1), string.charAt(idx), string.charAt(idx + 1)]
    const charArray = [...string]
    const indicies = []

    const before = true
    const newCharArray = charArray.map((elem, index) => {
        if(elem === chars[1] && index !== idx) {
            if(before) {
                return chars[0]
            }
            else {
                return chars[2]
            }
        }
        return elem
    })

    let finalString = ''
    newCharArray.forEach((elem) => {
        finalString += elem
    })

    return finalString
    
}

const mashUp = (string1, string2, char) => {
    if(string1.length === 1 && string2.length === 1) {
        throw new Error("string1 and string2 both cannot be of length 1.")
    }
    stringErrorChecking(string1)
    stringErrorChecking(string2)
    if (char) {
        stringErrorChecking(char)
    }
    while(string1.length > string2.length) {
        string2 += char
    }
    while(string2.length > string1.length) {
        string1 += char
    }

    const arr1 = [...string1]
    const arr2 = [...string2]

    let finalString = ''

    arr1.forEach((elem, index) => {
        finalString += elem
        finalString += arr2[index]
    })

    return finalString
}

// console.log(sortString('123 FOO BAR!')) // Returns: "ABFOOR!123  "
// console.log(sortString()) // Throws Error
// console.log(sortString('')) // Throws Error
// console.log(sortString(123)) // Throws Error
// console.log(sortString(["Hello", "World"])) // Throws Error

// console.log(replaceChar("Daddy", 2)) // Returns: "Daday"
// console.log(replaceChar("foobar", 0)) // Throws Error 
// console.log(replaceChar("")) // Throws Error
// console.log(replaceChar(123)) // Throws Error

// console.log(mashUp("Patrick", "Hill", "$")) //Returns "PHaitlrli$c$k$"
// console.log(mashUp("hello", "world", "#")) //Returns "hweolrllod"  notice that since both string are the same length, we can ignore the 3rd char parameter 
// console.log(mashUp("Hi", "There", "@")) //Returns "HTih@e@r@e"  notice since string1 is shorter than string2, we pad "Hi" with 3 @ to make string1 and string2 equal lengths
// console.log(mashUp("Patrick", ""))//Throws error
// console.log(mashUp())// Throws Error
// console.log(mashUp("John")) // Throws error
// console.log(mashUp ("h", "Hello", 4)) // Throws Error
// console.log(mashUp ("h","e")) // Throws Error

module.exports = {
    sortString,
    replaceChar,
    mashUp
}