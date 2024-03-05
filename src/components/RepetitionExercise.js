import { useState } from "react"

//Repetition exercise function
export default function RepetitionExercise({exercise, setMenuScreen}){
    let [count, setCount] = useState(0)
    return <div>
    <p>{exercise.name}</p>
    <p style = {{fontSize: "5em"}}>{count}</p>
  <button style = {{fontSize: "2em"}} onClick = {() => setCount(count=>count+1)}>Increment</button>
  <button style = {{fontSize: "2em"}} onClick = {() => setCount(0)}>Reset</button>
  <button style = {{fontSize: "1em"}} onClick = {setMenuScreen}> Return to Menu </button>
    </div>
  }