import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, CheckBox, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  //Default tasks as an array
  const [tasks, setTasks] = useState([
    //Tasks contain key, completed, and description properties
    { key: 1, description: 'Task 1', completed: false },
    { key: 2, description: 'Task 2', completed: false },
    { key: 3, description: 'Task 3', completed: false },
  ]);

  const [newTaskDescription, setNewTaskDescription] = useState('');

  //User can add new task with add button
  const addTask = () => {
    if (newTaskDescription.trim() !== '') {
      setTasks([...tasks, { key: tasks.length + 1, description: newTaskDescription, completed: false }]);
      setNewTaskDescription('');
    }
  };

  //Completion toggle 
  const toggleTaskCompletion = (key) => {
    setTasks(tasks.map(task => {
      if (task.key === key) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  //Create each task item
  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <CheckBox
        value={item.completed}
        onValueChange={() => toggleTaskCompletion(item.key)}
      />
      <Text style={item.completed ? styles.completedText : styles.uncompletedText}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.key.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Task"
          value={newTaskDescription}
          onChangeText={setNewTaskDescription}
        />
        <Button title="Add" onPress={addTask} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  uncompletedText: {
    marginLeft: 10,
    fontSize: 16,
  },
  completedText: {
    marginLeft: 10,
    fontSize: 16,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#00f',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});
