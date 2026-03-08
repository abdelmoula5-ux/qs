async function vote(id){
await fetch("/vote",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({answer_id:id})
})
alert("Vote saved")
}

async function loadResults(){
const res = await fetch("/results")
const data = await res.json()

const labels = data.map(a=>a.answer)
const votes = data.map(a=>a.votes)

const ctx = document.getElementById("chart")

new Chart(ctx,{
type:"bar",
data:{
labels:labels,
datasets:[{label:"Votes",data:votes}]
}
})
}

if(document.getElementById("chart")){
loadResults()
}