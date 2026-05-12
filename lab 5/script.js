let name = "Alice";
        console.log("Hello, " + name);

        function greet(user) {
            alert("Welcome, " + user);
        }
        greet("Bob");
        
        let age = 20; 
        let major = "Engineering";
        
        console.log("I am " + age + " years old.");
        console.log("My major is " + major);
        function addNumbers(num1, num2) {
    let sum = num1 + num2;
    alert("The total sum is: " + sum);
}
addNumbers(15, 25);


let userNumber = prompt("Enter a number to check if it is even or odd:");

if (userNumber % 2 === 0) {
    alert(userNumber + " is an EVEN number.");
} else {
    alert(userNumber + " is an ODD number.");
}

let fruits = ["Apple", "Banana", "Mango", "Orange", "Pineapple"];

for (let i = 0; i < fruits.length; i++) {
    console.log("Fruit " + (i + 1) + ": " + fruits[i]);
}
