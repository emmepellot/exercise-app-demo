import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Question = ({ route, navigation }) => {
  const { questions } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // State to store the selected answer

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null); // Reset selected answer when moving to the next question
    } else {
      navigation.navigate('Summary', { questions, selectedAnswer }); // Pass selectedAnswer to Summary component
    }
  };

  const handleAnswerSelection = (selectedIndex) => {
    const updatedAnswers = selectedAnswer ? [...selectedAnswer] : []; // Create a copy of the selectedAnswer array or initialize as an empty array if null
    updatedAnswers[currentIndex] = selectedIndex; // Update the selected answer for the current question
    setSelectedAnswer(updatedAnswers); // Set the updated array as the new selectedAnswer
};

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{questions[currentIndex]?.prompt}</Text>
      {questions[currentIndex]?.choices.map((choice, index) => (
        <Button
          key={index}
          title={choice}
          onPress={() => handleAnswerSelection(index)}
          style={selectedAnswer === index ? styles.selectedButton : null}
        />
      ))}
      <Button
        title="Next Question"
        onPress={handleNextQuestion}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  prompt: {
    marginBottom: 20,
    textAlign: 'center',
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
});

export default Question;
