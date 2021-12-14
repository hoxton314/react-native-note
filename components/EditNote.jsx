import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';

export default class EditNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            text: '',
            cat: 'BRAK',
            date: '',
            stringTab: [],
            key: this.props.route.params.key
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
        let old = await this.getItem((this.state.key).toString())
        old=JSON.parse(old)
        console.log(old)
        this.setState({ stringTab: categories, cat: categories[0], title: old.title, text: old.text, date: old.date, cat: old.category })


    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps != this.props) {
            this.setState({ key: this.props.route.params.key })

            let categories
            if (await this.getCategories() != null) {
                categories = await this.getCategories()
            } else {
                categories = 'BRAK'
            }
            categories = categories.split(',')
            console.log(this.props.route.params.key)
            let old = await SecureStore.getItemAsync(this.props.route.params.key) 
            old=JSON.parse(old)
            
            this.setState({ stringTab: categories, cat: categories[0], title: old.title, text: old.text, date: old.date, cat: old.category })
               
            


        }
        if(prevState.text!=this.state.text){
            console.log('DID UPDATE', this.state.text)
        }
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
    async updateNote() {
        //let date = new Date()
        let data = { title: this.state.title, text: this.state.text, date: this.state.date, key: this.state.key, category: this.state.cat }
        this.saveItem(this.props.route.params.key, JSON.stringify(data))
        window.setTimeout(() => { this.props.navigation.navigate("list", { key: Math.floor(Math.random() * (999999)) }) }, 400)

    }
    async saveItem(key, value) {
        await SecureStore.setItemAsync(key, value);
    }
    async getItem(key) {
        let result = await SecureStore.getItemAsync(key);
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
                    <Text style={{ fontSize: 30 }}> Edit {this.state.key} </Text>
                    <TextInput
                        underlineColorAndroid="#404EED"
                        placeholder="Title"
                        value={this.state.title}
                        onChangeText={(text) => this.setState({ title: text })}
                        style={styles.textinput}
                        defaultValue={this.props.route.params.title}
                    />
                    <TextInput
                        underlineColorAndroid="#404EED"
                        placeholder="Note"
                        value={this.state.text}
                        onChangeText={(text) => this.setState({ text: text })}
                        style={styles.textinput}
                        defaultValue={this.props.route.params.text}
                        multiline={true}
                    />
                    <Picker
                        selectedValue={this.state.cat}
                        value={this.state.cat}
                        onValueChange={(val) => { this.setState({ cat: val }) }}>
                        {/* {this.genPickItems()} */}
                        {
                            this.state.stringTab.map(a => { return <Picker.Item label={a} value={a} key={a} /> })
                        }

                    </Picker>
                    <Button
                        onPress={this.updateNote.bind(this)}
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
