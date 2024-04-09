import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Summary = ({ route }) => {
    const { questions, selectedAnswer } = route.params;
    let totalScore = 0;
  
    return (
      <View style={styles.container}>
        {questions.map((question, index) => {
          const userAnswer = selectedAnswer[index]; // Get the user's answer for the current question
          console.log(userAnswer)
          // Determine correctness
          const isCorrect = (() => {
            if (!userAnswer || !question.correct) {
              return false; // Return false if either userAnswer or correct answer is undefined
            }
          
            if (question.type === 'true-false') {
              return userAnswer === question.correct;
            } else if (Array.isArray(question.correct)) {
              return question.correct.includes(userAnswer);
            } else {
              return userAnswer === question.correct;
            }
          })();
          
          if (isCorrect) totalScore++;
  
          return (
            <View key={index} style={styles.questionContainer}>
              <Text style={styles.question}>{question.prompt}</Text>
              <Text style={styles.answer}>
                Your Answer: {userAnswer !== undefined ? question.choices[userAnswer] : 'No Answer Provided'}
              </Text>
              <Text style={styles.correctAnswer}>
                Correct Answer: {question.choices[question.correct]}
              </Text>
            </View>
          );
        })}
        <Text style={styles.totalScore} testID="total">Total Score: {totalScore}</Text>
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
  totalScore: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    marginBottom: 10,
  },
  correctAnswer: {
    color: 'green',
  },
  incorrectAnswer: {
    color: 'red',
    textDecorationLine: 'line-through',
  },
});

export default Summary;
