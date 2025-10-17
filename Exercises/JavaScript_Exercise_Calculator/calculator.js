

let add = (a,b) => {
    return a + b;
}

let subtract = (a,b) => {
    return a - b;
}

let multiply = (a,b) => {
    return a * b;
}

let divide = (a,b) => {
    return a / b;
}

let computeAndDisplay = () => {
    let a = parseFloat(value1.value);
    let b = parseFloat(value2.value);
    let sum;
    
    if(select.value == "add"){
        sum = add(a,b);
    }else if(select.value == "subtract"){
        sum = subtract(a,b);
    }else if(select.value == "multiply"){
        sum = multiply(a,b);
    }else if(select.value == "divide"){
        sum = divide(a,b);
    }
    
    if(isNaN(sum)){
        alert("input has to be number");
    }else{
        result.innerText = sum;
    }

    if(isNaN(a)){
        value1.style.color = "red";
    }
    else{
         value1.style.color = "black";
    }
    if(isNaN(b)){
         value2.style.color = "red";
    }
     else{
         value2.style.color = "black";
    }

}


computeButton.onclick = computeAndDisplay;