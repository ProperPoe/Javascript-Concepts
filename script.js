let theForm = document.getElementById("formId");
const fuckingForm = document.getElementById("dammit");
const btn = document.getElementById("buttonId");
let theList = document.getElementById("theList");
let count = 0;

const theLists = JSON.parse(localStorage.getItem("list"))

if(theLists){
    theLists.forEach((list) => {
        handleBitch(list)
    })
}

fuckingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    handleBitch()
})


function handleBitch(fuck){
    let formInput = theForm.value;
    if(fuck){
        formInput = fuck.text
    }

    if(formInput){
        const newInput = document.createElement("li")
        newInput.innerText = formInput;
        theList.appendChild(newInput);

        theForm.value = '';

        setToLS();
    }
    
}





function setToLS(){
    const individual = document.querySelectorAll("li");

    let arr = []
    
    individual.forEach((x) => {
        arr.push({text: x.innerText})
    })

    localStorage.setItem("list", JSON.stringify(arr))
}




