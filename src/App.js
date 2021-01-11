import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,  View, Text, TextInput, Image,
  FlatList, StyleSheet, TouchableOpacity, Dimensions
} from 'react-native';
import { ToDoItem,NewItem } from './components';


function App() {

  const [newToDoText, setNewToDoText] = useState('');
  const [todos, setTodos] = useState([]);


  const renderToDoItem = ({item}) => {
   return <ToDoItem todoItem={item} editToDo={editToDo} removeToDo={removeToDo} />
  };

  const addToDo = () => {
    if(newToDoText!==''){
      let newItemId = todos.length> 0 ? (todos[todos.length - 1].id+1) : 1
      let newItem = {id: newItemId, title:newToDoText, isDone:false};
      setTodos([...todos, newItem]);
      setNewToDoText('');
    }
  }

  const editToDo = (id) => {
    let newTodo = todos.find(todo => todo.id ===id);
    newTodo.isDone = !newTodo.isDone;
    setTodos([...todos.map(todo => todo.id === id ? newTodo : todo)]);
  }

  const removeToDo = (id) => {
    setTodos([...todos.filter(todo => todo.id !==id)]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.title}>ToDo App</Text>
          <Text style={styles.count}>{todos.length}</Text>
      </View>
      <View style={styles.itemList}>
        <FlatList
          testID="list"
          ListEmptyComponent={
            <Text style={styles.emptyText}>No Matter</Text>
          }
          keyExtractor={(item, index) => item.id.toString()}
          data={todos}
          renderItem={renderToDoItem}
          numColumns={1}
        />
      </View>
      <View style={styles.newItem}>
        <View style={styles.newItemInput}>
           <TextInput
              testID="input"
              value={newToDoText} 
              onChangeText={(text)=>setNewToDoText(text)} 
              placeholder="New matter"  />
        </View>
        <TouchableOpacity
            testID="button"
            style={styles.newItemButton} 
            onPress={()=>addToDo()}>
          <Image
            source={require('./assets/plus.png')}
            style={styles.newItemButtonIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemList: {
    flex: 8,
    backgroundColor: '#AEA8A8',
    paddingTop: 10
  },
  emptyText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 15,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3097E3',
  },
  title: {
    flex: 9,
    margin: 10,
    fontSize: 30
  },
  count: {
    flex: 1,
    margin: 10,
    padding: 5,
    fontSize: 25,
    borderColor: '#000',
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center'
  },
  newItem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3097E3',
    justifyContent: 'center'
},
newItemInput: {
    flex: 8,
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.12,
    borderColor: '#000000',
    borderRadius: 10,
    borderWidth: 1,
    padding: 3,
    margin: 10
  },
  newItemButton: {
    flex: 1,
    margin: 10,
    right: 10
  },
  newItemButtonIcon: {
    borderColor: '#000000',
    borderRadius: 50,
    borderWidth: 1,
    width: Dimensions.get('window').width * 0.12,
    height: Dimensions.get('window').width * 0.12
  }
});

export default App;
