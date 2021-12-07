import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'
import * as SecureStore from 'expo-secure-store';

export default class AddNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            text: ''
        }
    }
    async addNote() {
        let date = new Date()
        console.log(this.state.title)
        console.log(this.state.text)
        console.log()
        console.log()

        let keys = (await this.getKeys()).split(',')
        let key = keys
        key = parseInt(key[key.length - 1]) + 1
        keys.push(key.toString())
        console.log(keys)

        keys = keys.join(',')
        let data = { title: this.state.title, text: this.state.text, date: (date.getDate() + '.' + (date.getMonth() + 1)) }
        this.saveItem('keys', keys)
        this.saveItem(key.toString(), JSON.stringify(data))
        window.setTimeout(() => { this.props.navigation.navigate("list", { key: Math.floor(Math.random() * (999999)) }) }, 400)

    }
    async saveItem(key, value) {
        await SecureStore.setItemAsync(key, value);
    }
    async getKeys() {
        let result = await SecureStore.getItemAsync('keys');
        return result
    }
    render() {
        return (
            <View style={styles.main}>
                <View style={{ width: '80%', }}>
                    <Text> Note </Text>
                    <TextInput
                        underlineColorAndroid="#ff0000"
                        placeholder="Title"
                        onChangeText={(text) => this.setState({ title: text })}
                        style={styles.textinput}
                    />
                    <TextInput
                        underlineColorAndroid="#ff0000"
                        placeholder="Note"
                        onChangeText={(text) => this.setState({ text: text })}
                        style={styles.textinput}
                    />
                    <Button
                        onPress={this.addNote.bind(this)}
                        title="Add"
                        color="#5865F2"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textinput: {

        height: 80
    },
    main: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    }
})
