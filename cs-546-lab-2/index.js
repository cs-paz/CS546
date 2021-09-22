
const { average, modeSquared, medianElement, merge } = require("./arrayUtils.js") 
const { computeObjects, commonKeys, flipObject } = require( "./objUtils.js")
const { sortString, replaceChar, mashUp } = require("./stringUtils.js")

try {
    // Should Pass
    const average1 = average([[1,2,3], [1,2,3]]);
    console.log('average passed successfully')
 } catch (e) {
    console.error('average failed test case')
 }
try {
    // Should Fail
    const average2 = average(1234)
    console.error('average did not error')
 } catch (e) {
    console.log('average failed successfully')
 }

try {
    // Should Pass
    const modeSquared1 = modeSquared([2, 3, 3, 4]);
    console.log('modeSquared passed successfully')
 } catch (e) {
    console.error('modeSquared failed test case')
 }
try {
    // Should Fail
    const modeSquared2 = modeSquared(1234)
    console.error('modeSquared did not error')
 } catch (e) {
    console.log('modeSquared failed successfully')
 }

try {
    // Should Pass
    const medianElem1 = medianElement([2, 3, 4, 3, 4]);
    console.log('medianElement passed successfully')
 } catch (e) {
    console.error('medianElement failed test case')
 }
try {
    // Should Fail
    const medianElem2 = medianElement(1234)
    console.error('medianElement did not error')
 } catch (e) {
    console.log('medianElement failed successfully')
 }

try {
    // Should Pass
    const merge1 = merge([1,2,3], [6,4,5]);
    console.log('merge passed successfully')
 } catch (e) {
    console.error('merge failed test case')
 }
try {
    // Should Fail
    const merge2 = merge(1234)
    console.error('merge did not error')
 } catch (e) {
    console.log('merge failed successfully')
 }

try {
    // Should Pass
    const first = { x: 2, y: 4}
    const second = { a: 3, x: 5, z: 10 }
    const computeObjects1 = computeObjects([first, second], (x => x + 5))
    console.log('computeObjects passed successfully')
 } catch (e) {
    console.error('computeObjects failed test case')
 }
try {
    // Should Fail
    const computeObjects2 = computeObjects(1234)
    console.error('computeObjects did not error')
 } catch (e) {
    console.log('computeObjects failed successfully')
 }

try {
    // Should Pass
    const first = { x: 2, y: 4}
    const second = { a: 3, x: 2, z: 10 }
    const commonKeys1 = commonKeys(first, second)
    console.log('commonKeys passed successfully')
 } catch (e) {
    console.error('commonKeys failed test case')
 }
try {
    // Should Fail
    const commonKeys2 = commonKeys(1234)
    console.error('commonKeys did not error')
 } catch (e) {
    console.log('commonKeys failed successfully')
 }

try {
    // Should Pass
    const first = { x: 2, y: 4}
    const flipObject1 = flipObject(first)
    console.log('flipObject passed successfully')
 } catch (e) {
    console.error('flipObject failed test case')
 }
try {
    // Should Fail
    const flipObject2 = flipObject(1234)
    console.error('flipObject did not error')
 } catch (e) {
    console.log('flipObject failed successfully')
 }

try {
    // Should Pass
    const sortString1 = sortString("hellog0vna!")
    console.log('sortString passed successfully')
 } catch (e) {
    console.error('sortString failed test case')
 }
 try {
    // Should Fail
    const sortString2 = sortString(1234)
    console.error('sortString did not error')
 } catch (e) {
    console.log('sortString failed successfully')
 }

try {
    // Should Pass
    const replaceChar1 = replaceChar("hello", 2)
    console.log('replaceChar passed successfully')
 } catch (e) {
    console.error('replaceChar failed test case')
 }
try {
    // Should Fail
    const replaceChar2 = replaceChar(1234)
    console.error('replaceChar did not error')
 } catch (e) {
    console.log('replaceChar failed successfully')
 }

 try {
    // Should Pass
    const mashUp1 = mashUp("hello", "friend")
    console.log('mashUp passed successfully')
 } catch (e) {
    console.error('mashUp failed test case')
 }
try {
    // Should Fail
    const mashUp2 = mashUp(1234)
    console.error('mashUp did not error')
 } catch (e) {
    console.log('mashUp failed successfully')
 }


