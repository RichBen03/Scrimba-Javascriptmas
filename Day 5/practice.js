import { films } from "./data";
let film = [...films]

function myfunction(){
    if (films.length===0) return null;
    const random= Math.floor(Math.random() * films.length);
    return random.splice(random,1)[0];

}