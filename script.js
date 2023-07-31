
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
//var and let can be declared without an initialized assignment, while const cannot

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

//displaySquare(square)
//IIFE(Immediately Invoked Function Expressions)
(function yards(num){
    console.log(num * 3)
})(5);

//Callback function is the same as First class functions, functions passed inside functions. Check documentation for better examples!!!
//Arrow functions use "implicit returns", meaning no return keyword is used. Normal functions needs return keywords
//Normal functions dont need parameters to return or console.log arguments, but arrow functions do need parameters
//the this keyword does not work with arrow functions, only normal functions

/**************************************************************************************************************************************************CLOSURES**************************** */
//Call a function within a function
function subscribe(){
    var name = "Boy o boy"

    function displayName(){
        console.log(name)   //closures are functions that have access to an outer functions scope from an inner function
    }
    displayName()
}

subscribe()
//Return a function within a function
function makeFunc(){
    var name = "Mozilla"

    function displayName(num){
        console.log(name, num)
    }
    return displayName
}

makeFunc()(5)
//READ THE DOCUMENTATION ON CLOSURES!!!!!!!!!!!!!!!!!!!!!!!

function createBase(baseNum){
    return function(num){
        console.log(baseNum + num) //or return an anonymoous function instead of return add
    }
}

var addSix = createBase(6);
addSix(10);
addSix(21);
/*****************************************************************************************************************************CURRYING************************************************** */
//Basic currying
function sum(base){
    return function(num){
        return function(num1){
            return base + num + num1 //There must be return function parameters for every argument in the function call!!!!
        }
    }
}

console.log(sum(2)(6)(1))

//Infinite currying
function add(a){
    return function(b){
       if(b) return add(a+b)
       return a
    }
}
console.log(add(5)(2)(4)(8)(9)(12)())
//Partial Application vs Currying = Partial Application has more arguments than nested functions, currying is function parameters returned based on the same number of arguments
//Study real world uses and benefits of currying!!!!!

//Convert f(a, b, c) into f(a)(b)(c)
function curry(func) {
    return function curriedFunc(...args){
        if(func.length <= args.length){
            return func(...args);
        }else{
            return function(...next){
                return curriedFunc(...args, ...next)
            };
        }
    };
}

const plus = (a,b,c,d) => a + b + c + d

const totalSum = curry(plus); //passing functions as arguments into other function parameters!!!!!!!!!Study it, keep it in mind!!!!

console.log(totalSum(1)(2)(3)(4))

/****************************************************************************************************************************************************************OBJECTS*********************************************************************** */
//ACCESS string properties in object
const user = {
    name: "Steve",
    age: 34,
    "like this video": true //when calling a string property, you can use brackets like calling array indexes, as seen below in the console.log
}

console.log(user["like this video"])
//Add dynamic key/value pairs to object
const property = "firstName";
const name = "Steve Trujillo"

const users = {
    [property]: name //to put a key outside of an object into an object, surround the key with square brackets!!! It's been done on one of the projects!! Study it!
}
console.log(users)
//For In loop
for(yo in user){
    //THIS IS HOW TO LOOP THROUGH AN OBJECT!!!!!! PRACTICE!!!
    console.log(yo) //To print the keys of the object
    console.log(user[yo]) //To print the values of the object
}
//SOlve

let ints = {
    a: 100,
    b: 200,
    title: "My Nums",
};

const multiplyNumberic = (obj) => {
    for(what in obj){
        if(typeof obj[what] === 'number'){
            obj[what] *= 2
        }
    }
}

multiplyNumberic(ints);
console.log(ints)
/********************************************************************************************************************************************************Call, Bind, Apply***************************************************************** */
//Call
var objs = {name: "Steve"};

function sayHello(age, profession){
    return "Hello " + this.name + " is " + age + " and is a " + profession;
}

console.log(sayHello.call(objs, 38, "Programmer")); //The function calls the objs object, so this. becomes part of the objs context

//Call, Apply, and Bind are similar....just do some studying, and polyfills!
/******************************************************************************************************************************************************Promises********************************************************************************** */
//Callbacks
console.log("start")

function important(username, cb){
    setTimeout(()=>{
        cb(`Subscribe to ${username}`);
    }, 500);

}
function like(video, cb){
    setTimeout(()=>{
        cb(`Like the ${video}`);
    }, 1000);

}
function share(video, cb){
    setTimeout(()=>{
        cb(`Share the ${video} video`);
    }, 1000);

}

const message = important("ProperPoe", (message) => {
    console.log(message)
    like("Javascript interview questions", function (what){
        console.log(what)
        share("the Javascript", function (what){ //This is callback hellllllll!
            console.log(what)
        })
    })
});

console.log("stop")

//Promises
console.log("start")

function important(username){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(`Subscribe to ${username}`);
        }, 500);
    })

}
function like(video){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(`Like the ${video}`);
        }, 1000);
    })

}
function share(video){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(`Share the ${video} video`);
        }, 1000);
    })

}

important("ProperPoe")
    .then((res) => {
        console.log(res)
        return like("Javascript interview questions")
    }).then((res) => {
        console.log(res)
        return share("the Javascript") //this is Promise chaining!!! You saw this in a reddit thread
    }).then((res) => {
        console.log(res)
    })
    .catch((err) => console.error(err))
    

console.log("stop")
//You can also use Promise.all and put all the promises into an array, instead of chainning. Also Promise.race, Promise.allSettled, Promise.any

//Async/Await
console.log("start")

function important(username){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(`Subscribe to ${username}`);
        }, 500);
    })

}
function like(video){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(`Like the ${video}`);
        }, 1000);
    })

}
function share(video){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(`Share the ${video} video`);
        }, 2000);
    })

}

const result = async () => {
    try {
        const message1 = await important("Proper Poe");
        console.log(message1)
        const message2 = await like("Javascript interview questions")
        console.log(message2)
        const message3 = await share("the Javscript")
        console.log(message3)
    } catch (error) {
        console.error(error)
    }
    
}

result()
    

console.log("stop")

//Promise Polyfill
function PromisePolyfill(executor){
    let onResolve, 
        onReject,
        isFullFilled = false,
        isRejected = false,
        isCalled = false,
        value;

    function resolve(val) {
        isFullFilled = true;
        value = val;

        if(typeof onResolve === "function"){
            onResolve(val);
            isCalled = true;
        }

        
    }
    
    function reject(val) {
        isRejected = true;
        value = val;

        if(typeof onReject === "function"){
            onReject(val);
            isCalled = true;
        }
    }

    this.then = function(callback){
        onResolve = callback;

        if (isFullFilled && !isCalled){
            isCalled = true;
            onResolve(value);
        }

        return this;
    };

    this.catch = function (callback){
        onReject = callback;

        if (isRejected && !isCalled){
            isCalled = true;
            onReject(value);
        }

        return this;
    }
    try {
        executor(resolve, reject)
    } catch (error) {
        console.error(error)
    }

    
}

const examplePromise = new PromisePolyfill((resolve, reject) => {
    setTimeout(()=>{
        resolve(2);
    }, 1000);
})

examplePromise
    .then((res)=> {
        console.log(res);
    }).catch((err) => console.error(err))