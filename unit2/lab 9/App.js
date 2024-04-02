import 'react-native-gesture-handler';
import { StyleSheet, Text, View, FlatList, CheckBox, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';

const Stack = createStackNavigator();

// Navigation container
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DurationExercise" component={DurationExercise} />
        <Stack.Screen name="RepetitionExercise" component={RepetitionExercise} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Called to navigate to and display home screen
function Home({ navigation }) {
  const exercises = [
    {name: "Push Ups", type: "repetition", suggested: "Running"},
    {name: "Running", type: "duration", suggested:"Planks" },
    {name: "Planks", type: "repetition", suggested:"Swimming"},
    {name: "Swimming", type: "duration", suggested: "Push Ups"},
  ];

  // Exercise button component
  const ExerciseButton = ({ name, onPress }) => (
    <View style={styles.buttonContainer}>
      <Button
        title={name}
        onPress={onPress}
        color="#006700"
      />
    </View>
  );

  // Each exercise as a button
  let renderItem = ({ item }) => (
    <ExerciseButton
      name={item.name}
      onPress={() =>
        navigation.navigate(
          item.type === "repetition"
            ? "RepetitionExercise"
            : "DurationExercise",
          { name: item.name, suggested: item.suggested, exercises: exercises }
        )
      }
      suggested={item.suggested}

    />
  );
  // Home screen that lists exercises with title
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercises</Text>
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}
// Called to handle duration exercise logic
function DurationExercise({ route, navigation }) {
  const { name, suggested, exercises } = route.params;

  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Timer logistics 
  const startTimer = () => {
    setIsRunning(true);
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);
    setTimerInterval(interval);
  };
  const resetTimer = () => {
    clearInterval(timerInterval);
    setTimer(0);
    setIsRunning(false);
  };
  const [timerInterval, setTimerInterval] = useState(null);
 
  // Buttons within duration exercise page
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>Timer: {timer}</Text> {/* Display the timer here */}
      {!isRunning ? (
        <Button title="Start Timer" onPress={startTimer} color="#006700" />
      ) : (
        <Button title="Stop Timer" onPress={resetTimer} color="#006700" />
      )}
      <Button title="Reset Timer" onPress={resetTimer} color="#006700"  />
      <Button
        color="#006700"
        title="Suggested Exercise"
        onPress={() => {
          const suggestedExercise = exercises.find((exercise) => exercise.name === suggested);
          navigation.navigate(
            suggestedExercise.type === "repetition"
              ? "RepetitionExercise"
              : "DurationExercise",
            { name: suggestedExercise.name, suggested: suggestedExercise.suggested, exercises: exercises }
          );          
        }}
      />
      <Button title="Home" onPress={() => navigation.navigate("Home")} color="#006700"  />
    </View>
  );
}
  // Called to handle repetition exercise logic
  function RepetitionExercise({ route, navigation }) {
    const { name, suggested, exercises } = route.params;
    
    // Counter logic
    const [count, setCount] = useState(0);
    const increaseCount = () => {
      setCount(count + 1);
    };
    const resetCount = () => {
      setCount(0);
    };
  
    // Buttons within repetition exercise page
    return (
      <View style={styles.container}>
        <Text>{name}</Text>
        <Text>Count: {count}</Text> {}
        <Button title="Increase Count" onPress={increaseCount} color="#006700" />
        <Button title="Reset Count" onPress={resetCount} color="#006700"  />
        <Button
        title="Suggested Exercise"
        color="#006700" 
        onPress={() => {
          const suggestedExercise = exercises.find((exercise) => exercise.name === suggested);
          navigation.navigate(
            suggestedExercise.type === "repetition"
              ? "RepetitionExercise"
              : "DurationExercise",
            { name: suggestedExercise.name, suggested: suggestedExercise.suggested, exercises: exercises }
          );          
        }}
      />
      <Button title="Home" onPress={() => navigation.navigate("Home")} color="#006700"  />
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 5,
    paddingVertical: 50,
    paddingHorizontal: 50,
  },

  title: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: -5,
    },
  });
