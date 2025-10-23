//1.Musketeers

    // Creates an array named musketeers containing values "Athos", "Porthos" and "Aramis".

    let musketeers = ["Athos", "Porthos", "Aramis"];

    // Shows each array element using a for loop.

    for(let i = 0; i < musketeers.length; i++){
        console.log(musketeers[i]);
    }

    // Adds the "D'Artagnan" value to the array.

    musketeers.push("D'Artagnan");

    // Shows each array element using the forEach() method.

    musketeers.forEach(element => {
        console.log(element);
    });

    // Remove poor Aramis.

    musketeers.splice(2,1);

    // Shows each array element using a for-of loop.

    for(let musketeer of musketeers){
        console.log(musketeer);
    }

//2.Sum of values

    // Write a program that creates the following array, then calculates and shows the sum of its values (42 in that case).

    let values = [3, 11, 7, 2, 9, 10];

    let sum = 0;

    for(let value of values){
        sum += value;
    }

    console.log(sum);

//3.Array maximum

    //Write a program that creates the following array, then calculates and shows the array's maximum value.

    let max = Number.MIN_VALUE;

    const values2 = [3, 11, 7, 2, 9, 10];

    for(let value of values2){
        if(value > max){
            max = value;
        }
    }

    console.log(max);

//4.List of words

    // Write a program that asks the user for a word until the user types "stop". The program then shows each of these words, except "stop".
    let words = [];
    
    let stop = false;

    while(!stop){
        let r = prompt("Enter a word");
        if(r != "stop"){
            words.push(r);
        }
        else{
            stop = true;
        }
    }
    
    for(let word of words){
        console.log(word);
    }