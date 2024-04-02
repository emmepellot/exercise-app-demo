import React from 'react'

function PersonalBestExercise({ exercise, setMenuScreen }) {
  const [personalBest, setPersonalBest] = React.useState(0);

  const updatePersonalBest = () => {
    const newPersonalBest = Math.random() * 100;
    setPersonalBest(newPersonalBest);
  };

  return (
    <div className="PersonalBestExercise">
      <h2>{exercise.name}</h2>
      <p>Personal Best: {personalBest}</p>
      <button onClick={updatePersonalBest}>Update Personal Best</button>
      <button onClick={setMenuScreen}>Back to Menu</button>
    </div>
  );
}

export default PersonalBestExercise;
