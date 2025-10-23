//1.Word info

    //Write a program that asks you for a word then shows its length, lowercase, and uppercase values.
    let word = prompt("Enter a word");
    word = word.replace(/[^a-zA-Z]/g, '');

    console.log(word.length);
    console.log(word.toLowerCase());
    console.log(word.toUpperCase());

//2.Vowel count

    //Improve the previous program so that it also shows the number of vowels inside the word.
    let count = 0;
    let vowels = ["a", "e", "i", "o", "u"];
    for(let i = 0; i < word.length; i++){
        for(let vowel of vowels){
             if(word[i] === vowel){
                count++;
                break;
             }
        }
    }

    console.log(count);

//3.Backwards word

    //Improve the previous program so that it shows the word written backwards.
    let reverseWord = "";
    for(let i = word.length - 1; i >= 0; i--){
        reverseWord += word[i];
    }

    console.log(reverseWord);

//4.Palindrome

    // Improve the previous program to check if the word is a palindrome. A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.

    // For example, "radar" should be detected as a palindrome, "Radar" too.

    let isPalindrome = true;
    for(let i = 0; i < Math.floor(word.length/2); i++){
        if(word[i].toLowerCase() === word[word.length - i - 1].toLowerCase()){

        }else{
            isPalindrome = false;
            break;
        }
    }

    console.log(isPalindrome);