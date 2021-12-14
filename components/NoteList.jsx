import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert, TextInput } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import { set } from 'react-native-reanimated';




//  async deleteItem(key){
//      await SecureStore.deleteItemAsync("key");
//  }

export default class NoteList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: this.props.route.params.key ? this.props.route.params.key : 123,
            colors: ['#EF476F', '#FFD166', '#06D6A0', '#118AB2', '#073B4C'],
            data: [],
            search: ''
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.route.params.key != this.props.route.params.key) {
            let keys = (await this.getItem("keys")).split(',')
            console.log(keys)
            let data = []
            keys.forEach(async (key) => {
                let toPush = await this.getItem(key)
                toPush = JSON.parse(toPush)
                data.push(toPush)
            })
            while (data.length != keys.length) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            console.log(data)
            this.setState({ data: data.filter(note => note != null) })


            this.setState({ key: this.props.route.params.key })
            console.log('================key update================', this.props.route.params.key)
        }
    }
    async componentDidMount() {
        // await SecureStore.deleteItemAsync("0");
        // await SecureStore.deleteItemAsync("1");
        // await SecureStore.deleteItemAsync("2");
        // await SecureStore.deleteItemAsync("3");
        // await SecureStore.deleteItemAsync("4");
        // await SecureStore.deleteItemAsync("5");
        // await SecureStore.deleteItemAsync("6");
        // await SecureStore.deleteItemAsync("keys");
        //this.saveItem("keys", "1,2,3")
        //Math.floor(Math.random() * (999999999999))
        console.log(await this.getItem("keys"))
        if (await this.getItem("keys") != null) {
            let keys = (await this.getItem("keys")).split(',')
            console.log(keys)
            let data = []
            keys.forEach(async (key) => {
                let toPush = await this.getItem(key)
                toPush = JSON.parse(toPush)
                data.push(toPush)
            })
            while (data.length != keys.length) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            console.log(data)

            this.setState({ data: data.filter(note => note != null) })
        }
    }
    async saveItem(key, value) {
        await SecureStore.setItemAsync(key, value);
    }
    async getItem(key) {
        let result = await SecureStore.getItemAsync(key);
        return result
    }
    delAlert(key) {
        Alert.alert(
            "Czy chcesz usunąć?",
            "Nie będzie możliwości przywrócenia danych!",
            [
                {
                    text: "Cancel",
                    onPress: () => { console.log("Cancel Pressed") },
                    style: "cancel"
                },
                { text: "OK", onPress: this.delete.bind(this, key) }
            ]
        )
    }
    async delete(key) {
        console.log(key)
        await SecureStore.deleteItemAsync(key.toString());

        let keys = (await this.getItem("keys")).split(',')
        console.log(keys)
        let data = []
        keys.forEach(async (key) => {
            let toPush = await this.getItem(key)
            toPush = JSON.parse(toPush)
            data.push(toPush)
        })
        while (data.length != keys.length) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        console.log(data)
        this.setState({ data: data.filter(note => note != null) })

        this.setState({ key: Math.floor(Math.random() * (999999999999)) })
        console.log('deleted')
    }
    search(a) {
        console.log('aaaaaaaaaaaa')
        console.log(a.title);
        console.log(this.state.search);
        try{
        return ('' == this.state.search || a.title.slice(0,this.state.search.length) == this.state.search || a.text.slice(0,this.state.search.length) == this.state.search || a.category.slice(0,this.state.search.length) == this.state.search) 
        } catch (error) {
        return true
        }
    }
    async editNote(key){
        let data = await this.getItem(key.toString())
        this.props.navigation.navigate("edit", { key: key.toString(), title:data.title, text: data.text })
    }
    render() {

        const renderItem = ({ item }, color = Math.floor(Math.random() * (5))) => (
            <TouchableOpacity onPress={this.editNote.bind(this, item.key)} onLongPress={this.delAlert.bind(this, item.key)} style={{ padding: 15, borderRadius: 20, marginTop: 10, flex: 1 / 2.2, height: 150, backgroundColor: this.state.colors[color] }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                    <Text numberOfLines={1} style={[styles.category, { color: this.state.colors[color] }]}>{item.category == null ? 'BRAK' : item.category}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
                <View>
                    <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                    <Text numberOfLines={6} style={styles.txt}>{item.text}</Text>
                </View>

            </TouchableOpacity>
        );
        return (
            <View>

                <TextInput
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Search"
                    onChangeText={(text) => this.setState({ search: text })}
                    style={styles.search}
                />

                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                    data={this.state.data.filter(this.search.bind(this))}
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                    style={styles.flatlist}
                    numColumns={2}
                    key={this.state.key}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    note: {
        color: 'white',
        height: '30%'
    },
    title: {
        color: 'white',
        fontWeight: 'bold'
    },
    date: {
        color: 'white'
    },
    txt: {
        color: 'white'
    },
    category: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 3,
        maxWidth: 60
    },
    search: {
        backgroundColor: 'lightgray',
        borderRadius: 25,
        margin: 10,
        height: 40,
    }


})
