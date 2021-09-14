const lab1 = require("./lab1");

console.log(lab1.questionOne([5, 3, 10])); 
//returns and outputs: {'18': false, '2': true, '93': false}

console.log(lab1.questionOne([2])); 
// returns and outputs: {'3': true} 

console.log(lab1.questionOne([3, 6, 9]))
// returns and outputs { '2': true, '29': true, '74': false }

console.log(lab1.questionOne([])); 
// returns and outputs: {}

console.log(lab1.questionOne()); 
// returns and outputs: {}

console.log(lab1.questionTwo([1, 2, 3, 2, 1])); 
// // should return and output: [1, 2, 3] 

console.log(lab1.questionTwo([1, 1, 1, 1, 1, 1])); 
//returns and outputs: [1]

console.log(lab1.questionTwo([1, '1', 1, '1', 2])); 
// returns and outputs: [1, '1', 2] 

console.log(lab1.questionTwo([3, 'a', 'b', 3, '1'])); 
// returns and outputs: [3, 'a', 'b', '1']

console.log(lab1.questionTwo([])); 
//returns and outputs: []

console.log(lab1.questionThree(["bar", "car", "car", "arc"])); 
// should return and outputs: { acr: ["car", "arc"] }

console.log(lab1.questionThree(["cat", "act", "foo", "bar"])); 
// returns and outputs: { act: ["cat", "act"] }

console.log(lab1.questionThree(["race", "care", "foo", "foo", "foo"]));
// returns and outputs: { acer: ["race", "care"] } 

console.log(lab1.questionThree(["bst", "stb", "tsb", "tuv", "vut"]));
// returns and outputs: { bst: [ 'bst', 'stb', 'tsb' ], tuv: [ 'tuv', 'vut' ] }

console.log(lab1.questionThree(["foo", "bar", "test", "Patrick", "Hill"]));
// returns and outputs: {}

console.log(lab1.questionThree([])); 
// returns and outputs: {}

console.log(lab1.questionFour(1, 3, 2)); 
//returns and outputs: 4

console.log(lab1.questionFour(2, 5, 6)); 
//returns and outputs: 194 

console.log(lab1.questionFour(2, 3, 5)); 
//returns and outputs: 38

console.log(lab1.questionFour(7, 5, 1)); 
//returns and outputs: 1191 

console.log(lab1.questionFour(4, 4, 4)); 
//returns and outputs: 18 