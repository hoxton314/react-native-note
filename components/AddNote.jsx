import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';

export default class AddNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            text: '',
            cat: null,
            stringTab: ['a', 'b', 'c']
        }
        this.funkcja = null
        this.catUpd()
    }
    // componentDidMount = () => {
    //     this.funkcja = this.props.navigation.addListener('focus', () => {
    //         // ta funkcja wykona się za kazdym razem kiedy ekran zostanie przywrócony
    //         this.refresh()
    //     });
    //     // ta funkcja wykona się raz podczas uruchomienia ekranu
    //     this.refresh()
    // }
    async componentDidMount() {
        let categories
        if (await this.getCategories() != null) {
            categories = await this.getCategories()
        } else {
            categories = 'BRAK'
        }
        categories = categories.split(',')
        this.setState({ stringTab: categories, cat: categories[0] })
    }
    componentDidUpdate(prevProps, prevState){
        
    }
    async catUpd() {
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 500));
            let categories
            if (await this.getCategories() != null) {
                categories = await this.getCategories()
            } else {
                categories = 'BRAK'
            }
            categories = categories.split(',')
            this.setState({ stringTab: categories })
        }
    }
    async addNote() {
        let date = new Date()
        console.log(this.state.title)
        console.log(this.state.text)
        console.log()
        console.log()
        let keys
        let key
        if (await this.getKeys() != null) {
            keys = (await this.getKeys()).split(',')
            key = parseInt(keys[keys.length - 1]) + 1
        } else {
            keys = []
            key = 1
        }

        keys.push(key.toString())


        keys = keys.join(',')
        console.log('KLUCZE')
        console.log(keys)
        console.log(key)
        console.log('KLUCZE END')
        let data = { title: this.state.title, text: this.state.text, date: (date.toISOString().split('T')[0]), key: key, category: this.state.cat }
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
    async getCategories() {
        let result = await SecureStore.getItemAsync('categories');
        return result
    }
    // async genPickItems() {
    //     let categories
    //     if(await this.getCategories()!=null){
    //         categories = await this.getCategories()
    //     }else{
    //         categories='BRAK'
    //     }
    //     categories = categories.split(',')
    //     let pickArr=[]
    //     console.log(categories)
    //     categories.forEach(cat => {
    //        pickArr.push(<Picker.Item label={cat} value={cat} />)
    //     });
    //     console.log(pickArr)
    //     return pickArr
    // }
    render() {
        return (
            <View style={styles.main}>
                <View style={{ width: '80%', }}>
                    <Text style={{ fontSize: 30 }}> Note </Text>
                    <TextInput
                        underlineColorAndroid="#404EED"
                        placeholder="Title"
                        onChangeText={(text) => this.setState({ title: text })}
                        style={styles.textinput}
                    />
                    <TextInput
                        underlineColorAndroid="#404EED"
                        placeholder="Note"
                        onChangeText={(text) => this.setState({ text: text })}
                        style={styles.textinput}
                    />
                    <Picker
                        selectedValue={this.state.cat}
                        onValueChange={(val) => { this.setState({ cat: val }) }}>
                        {/* {this.genPickItems()} */}
                        {
                            this.state.stringTab.map(a => { return <Picker.Item label={a} value={a} /> })
                        }

                    </Picker>
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
