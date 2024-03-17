import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, CheckBox, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from 'react-native-elements';

const Stack = createStackNavigator();

// Navigation container
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="TODO App" component={TodoAppScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Check async storage
  const handleLogin = async () => {
    if (username === 'test' && password === 'Test1@') {
      navigation.navigate('TODO App');
      return;
    }
    
    try {
      const registrationData = await AsyncStorage.getItem('registrationData');
      if (registrationData !== null) {
        const users = JSON.parse(registrationData);
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
          navigation.navigate('TODO App');
        } else {
          alert('Incorrect username or password');
        }
      } else {
        alert('No stored registration data');
      }
    } catch (error) {
      console.error('Error retrieving registration data:', error);
    }
  };
  // Style sheet login
  const loginStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginBottom: 20,
    },
    inputContainer: {
      marginBottom: 20,
      width: '70%',
    },
    input: {
      marginBottom: 50,
    },
    buttonContainer: {
      width: '50%',
      marginBottom: 10,
    },
  });
  
  // Styling
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={loginStyles.title}>Login Screen</Text>
      <View style={loginStyles.inputContainer}>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          testID="login-username"
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          testID="login-password"
        />
      </View>
      <View style={loginStyles.buttonContainer}>
        <Button
          title="Login"
          onPress={handleLogin}
          testID="login-button"
        />
      </View>
      <View style={loginStyles.buttonContainer}>
        <Button
          title="Register"
          onPress={() => navigation.navigate('Registration')}
          testID="login-register"
        />
      </View>
    </View>
  );  
}


function RegistrationScreen({ navigation }) {
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [phonenumber, setPhonenumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmpassword, setConfirmPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [zip, setZip] = React.useState('');
  const [newsletter, setNewsletter] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  // Validation messages
  const validateInput = (name, value) => {
    switch (name) {
      case 'firstname':
      case 'lastname':
        const namePattern = /^[^\d=?\\/@#%^&*()]+$/;
        return !namePattern.test(value) ? `Error: ${name} must only include alphabetic characters` : '';
      case 'phonenumber':
        const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
        return !phonePattern.test(value) ? 'Error: Phone number must be in the format (xxx) xxx-xxxx' : '';
      case 'email':
        const emailPattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return !emailPattern.test(value) ? 'Error: Invalid email address' : '';
      case 'password':
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{8,}$/;
        return !passwordPattern.test(value) ? 'Error: Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long' : '';
      case 'zip':
        const zipPattern = /^\d{5}$/;
        return !zipPattern.test(value) ? 'Error: ZIP code must be exactly 5 digits' : '';
      default:
        return '';
    }
  };

  const handleBlur = (name, value) => {
    const errorMessage = validateInput(name, value);
    setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleRegister = async () => {
    const inputErrors = {};

    // Phone Number validation
    inputErrors.phonenumber = validateInput('phonenumber', phonenumber);

    // Email validation
    inputErrors.email = validateInput('email', email);

    // Password validation
    inputErrors.password = validateInput('password', password);

    // First Name and Last Name validation
    inputErrors.firstname = validateInput('firstname', firstname);
    inputErrors.lastname = validateInput('lastname', lastname);

    // ZIP Code validation
    inputErrors.zip = validateInput('zip', zip);

    // Check if there are any errors
    const hasErrors = Object.values(inputErrors).some(error => error !== '');

    if (!hasErrors) {
      try {
        const registrationData = await AsyncStorage.getItem('registrationData');
        let data = [];
        if (registrationData) {
          data = JSON.parse(registrationData);
        }
        data.push({ username, password });
        await AsyncStorage.setItem('registrationData', JSON.stringify(data));
        navigation.navigate('Login');
      } catch (error) {
        console.error('Error saving registration data:', error);
      }
    } else {
      setErrors(inputErrors);
    }
  };
  // Style sheet registration
  const registrationStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginBottom: 20,
    },
    inputContainer: {
      marginBottom: 20,
      width: '50%',
    },
    input: {
      marginBottom: 0,
    },
    buttonContainer: {
      width: '50%',
    },
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={registrationStyles.title}>Registration</Text>
      <View style={registrationStyles.inputContainer}>
        <Input
          label="First Name"
          value={firstname}
          onChangeText={setFirstname}
          onBlur={() => handleBlur('firstname', firstname)}
          errorMessage={errors.firstname}
          testID="firstname"
        />
        <Input
          label="Last Name"
          value={lastname}
          onChangeText={setLastname}
          onBlur={() => handleBlur('lastname', lastname)}
          errorMessage={errors.lastname}
          testID="lastname"
        />
        <Input
          label="Username"
          value={username}
          onChangeText={setUsername}
          testID="username"
        />
        <Input
          label="Phone Number"
          value={phonenumber}
          onChangeText={setPhonenumber}
          onBlur={() => handleBlur('phonenumber', phonenumber)}
          errorMessage={errors.phonenumber}
          testID="phonenumber"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onBlur={() => handleBlur('password', password)}
          errorMessage={errors.password}
          testID="password"
        />
        <Input
          label="Confirm Password"
          value={confirmpassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          testID="confirmpassword"
        />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          onBlur={() => handleBlur('email', email)}
          errorMessage={errors.email}
          testID="email"
        />
        <Input
          label="ZIP Code"
          value={zip}
          onChangeText={setZip}
          onBlur={() => handleBlur('zip', zip)}
          errorMessage={errors.zip}
          testID="zip"
        />
        <CheckBox
          title="Sign up for newsletter"
          checked={newsletter}
          onPress={() => setNewsletter(!newsletter)}
        />
      </View>
      <View style={registrationStyles.buttonContainer}>
        <Button
          title="Register"
          onPress={handleRegister}
          disabled={Object.values(errors).some(error => error !== '')}
          testID="register-button"
        />
      </View>
    </View>
  );
}

// TODO Screen from ex7
function TodoAppScreen() {
  // Default tasks as an array
  const [tasks, setTasks] = useState([
    // Tasks contain key, completed, and description properties
    { key: 1, description: 'Task 1', completed: false },
    { key: 2, description: 'Task 2', completed: false },
    { key: 3, description: 'Task 3', completed: false },
  ]);
  const [newTaskDescription, setNewTaskDescription] = useState('');

  // User can add new task with add button
  const addTask = () => {
    if (newTaskDescription.trim() !== '') {
      setTasks([...tasks, { key: tasks.length + 1, description: newTaskDescription, completed: false }]);
      setNewTaskDescription('');
    }
  };

  // Completion toggle 
  const toggleTaskCompletion = (key) => {
    setTasks(tasks.map(task => {
      if (task.key === key) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  // Create each task item
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
// Styling
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
