import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox, Image } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Note from './components/Note'
import AddNote from './components/AddNote'
import NoteList from './components/NoteList'
import SideScreen from './components/SideScreen'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
])

export default function App(props) {
  //const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <SideScreen {...props} />}>
        <Drawer.Screen name="list" component={NoteList} options={screenOpt.list} initialParams={{ key: 123 }} />
        {/* <Drawer.Screen name="note" component={Note} /> */}
        <Drawer.Screen name="add" component={AddNote} options={screenOpt.add} />
        {/* <Drawer.Screen name="side" component={SideScreen} options={screenOpt.side} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
//options={screenOpt.list}
const ico = {
  CSS: {
    width: 35,
    height: 35
  }
}
const screenOpt = {
  list: {
    drawerIcon: () => (<Image style={ico.CSS} source={require('./assets/note.png')} />),
    title: 'Notes',
    headerStyle: {
      backgroundColor: '#404EED',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerShown: true
  },
  add: {
    drawerIcon: () => (<Image style={ico.CSS} source={require('./assets/add.png')} />),
    title: 'Add Note',
    headerStyle: {
      backgroundColor: '#404EED',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerShown: true
  },
  splash: {
    title: '',
    headerStyle: {
      backgroundColor: '#3f5ca8',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerShown: false
  },
}
