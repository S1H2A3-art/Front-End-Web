
let b = 10;

let getB = () => {
    mainDisplay.innerHTML +=`
        <h2>
            ${b}
        </h2>`;
}

b = 20;

updateButton.onclick = getB;

    





