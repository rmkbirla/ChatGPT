const input=document.querySelector("#input");
const send=document.querySelector("#send");

let userText=null;

const outgoingChat =() =>{
    userText=input.value.trim();
    
}

send.addEventListener("click", outgoingChat)