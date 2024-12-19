/*  Santas Emoji Hack!

During Christmas, Santa wants to ban negative emojis, so when people
use negative emoji shortcodes, he wants positive emojis to appear instead.

In other words, :angry: should result in 🎁 instead of 😠.


*/

const hackedEmojis = {
    "angry":            "🎁",   // 😠
    "thumbsdown":       "👏",   // 👎  
    "man_facepalming":  "🎅",   // 🤦‍♂️
    "cry":              "‍😄",   // 😭
    "puke":             "🤩"    // 🤮
}


/* 1. Write a function that checks if a lowercase word starts and 
ends with a colon. If it does, check if it exists in the hackedEmojis object, 
and replace it with the corresponding emoji. If not, return the original word.


Example input: ":cry:"
Example output: ‍😄

*/ 
function emojifyWord(word){
    if(word.startsWith(':') && word.endsWith(':')){
        const myIdentifier = word.slice(1,-1); 
        if(myIdentifier in hackedEmojis){
            return hackedEmojis[myIdentifier];
        }
    }
    else{
        return word;
    }
    
    
}

console.log(emojifyWord(":angry:"))




function emojifyPhrase(phrase){
    const words= phrase.split(' ');
    const emojiss= words.map(emojifyWord);
    const final = emojiss.join(' ');
    return final;
}

console.log(emojifyPhrase("Those shoes :puke:"));




function Stretch(phrase){

    const words =phrase.split(' ')
    const emoifyWord= words.map(emojifyWord)
    const final= emoifyWord.map(emojifyPhrase);
    return final
}


