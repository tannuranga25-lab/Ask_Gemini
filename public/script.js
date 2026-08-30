let askBtn = document.getElementById('askBtn')
let inputData = document.getElementById('question')
let answer = document.getElementById('answer')

askBtn.addEventListener('click', async ()=>{

    let question = inputData.value
    if(!question){
        answer.innerText = "Add question first"
        return
    }
try {

    let data = await fetch('/api/ask',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            question: question
        })
    })

    let NewData = await data.json()
    if(NewData.success){
        if(NewData.success){
            answer.innerText = NewData.answer
        }
        else{
            answer.innerText = NewData.message
        }
    }
    
} catch (error) {

    console.log("error ", error)
    
}
})