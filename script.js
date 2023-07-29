/****************************************Var, Let, Const SCOPE*********************************************/

//Variable Shadowing
function test (){
    var a = "Hello"; //var function scope can be shadowed by let block scope
    let b = "Bye"; //let cannot be shadowed outside block by var(illegal shadowing)

    if(true){
        let a = "Hi"; //the let block scope has shadowed/overwritten the var varibale
        var b = "Goodbye"; //var function scope cannot shadow let block scope. Error message
        console.log(a);
        console.log(b);
    }

    console.log(a)
    console.log(b)
}

test()

//var can be redecalred in the same scope, while let and const cannot
//var and let can be declared without initiliazation, while const cannot
//var and let can also be re-initialized, while const cannot(see below)
//var and let can be declared with an initialized assignment, while const cannot

/*********************************************************POLYFILLS *********************************************/

//map() polyfill ====================
Array.prototype.myMap=function(cb){
    let temp = [];
    for (let index = 0; index < this.length; index++) {
        temp.push(cb(this[index], index, this))
        
    }

    return temp;
}

const nums = [1, 2, 3, 4];

const multiply = nums.myMap((x) => x)

console.log(multiply)
//filter() polyfill ==================
Array.prototype.myFilter=function(cb){
    let temp = [];
    for (let i = 0; i < this.length; i++){
        if(cb(this[i], i, this)) temp.push(this[i])
    }
    return temp;
}
const filterNums = nums.myFilter((x) => x % 2 === 0)

console.log(filterNums)
//reduce() polyfill ===================
Array.prototype.myReduce=function(cb, initialValue){
    let accumulator = initialValue;

    for (let index = 0; index < this.length; index++) {
        accumulator = accumulator ? cb(accumulator, this[index], index, this) : this[index];
    }
    return accumulator;
}
const sumOfNum = nums.myReduce((acc, curr) => acc + curr, 0)

console.log(sumOfNum)

/* *******************************************************FUNCTIONS************************************************/
//FUNCTION DECLARATION
function bumble(num){ //normal function
    return num * num
}
//FUNCTION EXPRESSION
const bumble = function(num){ //a function expression is putting an "anonymous function" into a variable
    return num * num          //an anonymous function is a function with no name
}
//FIRST CLASS FUNCTIONS
function square(num){
    return num * num;
    
}
function displaySquare(fn){
    console.log("Square is " + fn(5)) //passing functions into functions
}

displaySquare(square)
//IIFE(Immediately Invoked Function Expressions)
(function yards(num){
    return num * 3
})(5);

//Callback function is the same as First class functions, functions passed inside functions. Check documentation for better examples!!!
//Arrow functions use "implicit returns", meaning no return keyword is used. Normal functions needs return keywords
//Normal functions dont need parameters to return or console.log arguments, but arrow functions do need parameters
//the this keyword does not work with arrow functions, only normal functions


