import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Question from './components/Questions';
import Summary from './components/Summary';

const Stack = createStackNavigator();

// Creating questions and answer choices
const questions = [
  {
    prompt: "True or false: Oranges are orange",
    type: "true-false",
    choices: ["True", "False"],
    correct: 0 // The correct answer is True
  },
  {
    prompt: "Which is NOT a color in the rainbow",
    type: "multiple-choice",
    choices: ["Red", "Silver", "Blue"],
    correct: 1 // The correct answer is Silver
  },
  {
    prompt: "Choose which of the following are mammals",
    type: "multiple-answer",
    choices: ["Dog", "Frog", "Elephant"],
    correct: [0, 2] // The correct answers are Dog and Elephant
  }
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen 
          name="Question" 
          component={Question} 
          initialParams={{ questions }}
        />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}