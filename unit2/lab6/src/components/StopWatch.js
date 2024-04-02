import { useCallback, useEffect, useState } from "react"
let currentTimer = 0

export default function StopWatch() {
    let[running, setRunning] = useState(false)
    let [timer, setTimer] = useState(0)
    let updateTimer = useCallback(() => {
        if (running){
            setTimer((timer) => timer+10)
        }
    }, [running])
    useEffect(() => {
        currentTimer = setInterval(updateTimer,10)
        return() => clearInterval(currentTimer)
    }, [running])
    let startStop = useCallback(() => {
        setRunning(!running)
        clearInterval(currentTimer)
    }, [running])
    let reset = useCallback(() => {
        setTimer(0)
    })
    let mins = (Math.floor((timer / (1000*60)) % 60)).toString().padStart(2,"0")
    let secs = (Math.floor((timer / 1000) %60 )).toString().padStart(2,"0")
    let mills = (timer % 1000).toString().padStart(3, "0")
    return <div style={{width:"100vw", textAlign:"center"}}>
        <p style= {{fontSize: "7em", margin: "auto", fontFamily:"monospace"}}>{mins}:{secs}:{mills}</p>
        <button style ={{"fontSize": "4em"}} onClick={startStop}>
            {running ? "Pause"  :  "Start"}
            </button>
        <button style = {{"fontSize": "4em"}} onClick={() =>{
            setTimer(0)
        }} >reset</button>
        </div>
}