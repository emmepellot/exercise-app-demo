import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Creating question array
const Question = ({ route, navigation }) => {
  const { questions } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(new Array(questions.length).fill(null));

  // Answering questions logic
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Summary', { questions, selectedAnswer });
    }
  };
  const handleAnswerSelection = (selectedIndex) => {
    const updatedAnswers = [...selectedAnswer];
    updatedAnswers[currentIndex] = selectedIndex; 
    setSelectedAnswer(updatedAnswers); 
  };

  // Handles the visual logic
  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{questions[currentIndex]?.prompt}</Text>
      {questions[currentIndex]?.choices.map((choice, index) => (
        <Button
          key={index}
          title={choice}
          onPress={() => handleAnswerSelection(index)}
          style={selectedAnswer[currentIndex] === index ? styles.selectedButton : null}
        />
      ))}
      <Button
        title="Next Question"
        onPress={handleNextQuestion}
      />
    </View>
  );
};

// Styling
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
