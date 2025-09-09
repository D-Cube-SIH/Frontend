function sendMessage(){
    const userMessage = document.querySelector(".input-holder input").value;

    if(userMessage.length){
        console.log(userMessage);
    }
    
}

document.querySelector(".input-box button").addEventListener("click",() => sendMessage());