function loadInformation(){
    let data = fetch("http://api.open-notify.org/astros.json").then(response => {return response.json();}).then(data => {processInformation(data)});
}

function processInformation(data){
    console.log(data);
    for(let )
}

loadInformation();