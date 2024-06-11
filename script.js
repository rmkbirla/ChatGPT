const input = document.querySelector("#input");
const send = document.querySelector("#send");
const container = document.querySelector(".chat-container");

let userText = null;
const API_KEY= "sk-proj-s57eqTurpxVdxp3EsuTAT3BlbkFJ50A0b1BFl6OdiJPAua7z";

const createElement = (html, className) => {
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = html;
    return chatDiv;
}

const chatResponse = async(incomingDiv) => {
    const API = "https://api.openai.com/v1/completions";
    const pElement = document.createElement("p");
    const requests = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo-instruct",
            "prompt": userText,
            "max_tokens": 7,
            "temperature": 0,
           
        })
    }

    
    try {
        const response = await (await fetch(API, requests)).json();
        pElement.textContent = response.choices[0].text.trim();
    } catch (error) { // Add error class to the paragraph element and set error text
        pElement.classList.add("error");
        pElement.textContent = "Oops! Something went wrong while retrieving the response. Please try again.";
    }
    incomingDiv.querySelector(".typingAnimation").remove();
    incomingDiv.querySelector(".chat-details").appendChild(pElement);
   
}
const showDots = () => {
    // userText=input.value.trim();
    const html = `<div class="chat-content">
                <div class="chat-details">
                    <img src="images/chatbot.jpg" alt="Chatbot Image">
                    <div class="typingAnimation">
                        <div class="dot" id="d1"></div>
                        <div class="dot" id="d2"></div>
                        <div class="dot" id="d3"></div>
                    </div>
                </div>
                <span class="material-symbols-outlined">content_copy</span>
            </div>`;
    const incomingDiv = createElement(html, "in");
    container.appendChild(incomingDiv);
    chatResponse(incomingDiv);
}


const outgoingChat = () => {
    userText = input.value.trim();
    const html = `<div class="chat-content">
                <div class="chat-details">
                    <img src="images/user.jpg" alt="User Image">
                    <p>${userText}</p>
                </div>
            </div>`;
    const outgoingDiv = createElement(html, "out");
    container.appendChild(outgoingDiv);
    input.value = "";
    setTimeout(showDots, 300);
}

send.addEventListener("click", outgoingChat);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) { // Check if Enter key is pressed without Shift
        event.preventDefault(); // Prevent default Enter key behavior (new line)
        outgoingChat();
    }
});