const main = document.getElementById('main-div');
main.style.backgroundColor ='red'
main.style.fontSize ='50px'
const body = document.body;
body.style.margin = 0;
body.style.padding = 0;

function closure()
{
    // setting a private  variable    
let count = 0;
 return ()=>{
     const counts =count++;
     return counts;
}
}
const counter = closure();
 console.log(counter());
 console.log(counter());
 console.log(counter());
 console.log(counter());
 console.log(counter());

//   Define the Constructor Function
function Person(name, age) {
    this.name = name;
    this.age = age;
}
// Add a Method to the Prototype
Person.prototype.greet = function() {
    return `Hello, my name is ${this.name}!`;
};
// Create New Person Objects
const alice = new Person('Alice', 30);
const bob = new Person('Bob', 25);

// using greet to call both objects
console.log(alice.greet()); // Output: "Hello, my name is Alice!"
console.log(bob.greet());   // Output: "Hello, my name is Bob!"
