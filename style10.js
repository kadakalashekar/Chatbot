const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn= document.querySelector(".chat-input span");
const chatbox=document.querySelector(".chatbox")
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn=document.querySelector(".close-btn")

let userMessage;
const API_KEY = "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";

const createChatLi = (message,className)=>{
    const chatLi = document.createElement("li")
    chatLi.classList.add("chat",className);
    let chatContent= className ==="outgoing" ?`<p></p>`:`<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML=chatContent;
    chatLi.querySelector("p").textContent= message;
    return chatLi;
}
const generateResponse =()=>{
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method:"POST",
        Headers:{
            "Content-type":"application/json",
            "authorization":`${API_KEY}`
        },
        body:JSON.stringify({
            
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": "userMessage"}]
              
        })
    }
    fetch(API_URL,requestOptions).then(res=>res.json()).then(data =>{
        console.log(data);

    }).catch((error)=>{
        console.log(error);
    }).finally(()=>chatbox.scrollTo(0,chatbox.scrollHeight));
}

const handleChat = ()=>{
    userMessage = chatInput.value.trim(); 
    if(!userMessage)return;
    chatInput.value="";
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);

    setTimeout(()=>{
        chatbox.appendChild(createChatLi("Thinking...","incomming"));
        chatbox.scrollTo(0,chatbox.scrollHeight);
        generateResponse();

    },600)
}

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click",()=>document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click",()=>document.body.classList.toggle("show-chatbot"));
