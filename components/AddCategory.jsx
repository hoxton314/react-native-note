import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'
import * as SecureStore from 'expo-secure-store';

export default class AddNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }
    async componentDidMount() {
        console.log(await this.getCategories())
    }
    async addCategory() {
        let categories
        let category = this.state.text
        if (await this.getCategories() != null) {
            categories = (await this.getCategories()).split(',')
        } else {
            categories = []
        }

        categories.push(category)


        categories = categories.join(',')


        this.saveItem('categories', categories)
        window.setTimeout(() => { this.props.navigation.navigate("list", { key: Math.floor(Math.random() * (999999)) }) }, 400)

    }
    async saveItem(key, value) {
        await SecureStore.setItemAsync(key, value);
    }
    async getCategories() {
        let result = await SecureStore.getItemAsync('categories');
        return result
    }
    render() {
        return (
            <View style={styles.main}>
                <View style={{ width: '80%', }}>
                    <Text style={{ fontSize: 30 }}> Category </Text>
                    <TextInput
                        underlineColorAndroid="#404EED"
                        placeholder="Category"
                        onChangeText={(text) => this.setState({ text: text })}
                        style={styles.textinput}
                    />
                    <Button
                        onPress={this.addCategory.bind(this)}
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
