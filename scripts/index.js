

let container = document.getElementById("container");
console.log(container)
let p = document.createElement('p');
p.textContent = "This is a paragraph, added to the div container via js!";
container.append(p);