import './App.css';
import {useCallback, useState} from 'react'
import DurationExercise from "./components/DurationExercise"
import RepetitionExercise from './components/RepetitionExercise';
import PersonalBestExercise from './components/PersonalBest';
import StopWatch from './components/StopWatch';


const MENU_SCREEN = "menu"
const EXERCISE_SCREEN = "exercise"
const DURATION_EXERCISE = "duration"
const REPETITION_EXERCISE ="repetition"
const PERSONAL_BEST_EXERCISE="personalBest"


let exerciseList = [
  {type: DURATION_EXERCISE, name: "Running"},
  {type: DURATION_EXERCISE, name: "Swimming"},
  {type: DURATION_EXERCISE, name: "Rowing"},
  {type: REPETITION_EXERCISE, name: "Push Ups"},
  {type: REPETITION_EXERCISE, name: "Pull Ups"},
  {type: PERSONAL_BEST_EXERCISE, name:"Weight Lifting"}
]


function App(){
  let [currentScreen, setCurrentScreen] = useState(MENU_SCREEN)
  let [currentExercise, setCurrentExercise] = useState({})
  let screenComponent = undefined
  let buttonClick = useCallback((exercise) => {
    setCurrentExercise(exercise)
    setCurrentScreen(EXERCISE_SCREEN)
  })

  if (currentScreen === MENU_SCREEN){
    screenComponent = <div>
    <p>Exercise Menu</p>
    <ul>
      {exerciseList.map((exercise)=> {
        return <li key ={exercise.name}>
        <button onClick = {() => buttonClick(exercise)}>{exercise.name}</button>
        </li>
      })}
    </ul>
  </div>
  } else if (currentScreen === EXERCISE_SCREEN){
    switch(currentExercise.type){
      case DURATION_EXERCISE: 
      screenComponent = <DurationExercise
      exercise={currentExercise}
      setMenuScreen={()=>setCurrentScreen(MENU_SCREEN)}
      />
      break;
      case REPETITION_EXERCISE:
        screenComponent = <RepetitionExercise
        exercise={currentExercise}
        setMenuScreen={()=>setCurrentScreen(MENU_SCREEN)}
        />
         break;
        case PERSONAL_BEST_EXERCISE:
          screenComponent = <PersonalBestExercise
          exercise={currentExercise}
          setMenuScreen={()=>setCurrentScreen(MENU_SCREEN)}
          />
          break;
          default: 
            screenComponent = undefined

   }
}
  return (
    <div className="App">
      <header className = "App-header">
        <p>{screenComponent}</p>
      </header>
    </div>
  );
}

export default App;
