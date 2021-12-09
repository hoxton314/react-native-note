import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';




//  async deleteItem(key){
//      await SecureStore.deleteItemAsync("key");
//  }

export default class NoteList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: this.props.route.params.key ? this.props.route.params.key : 123,
            colors: ['#EF476F', '#FFD166', '#06D6A0', '#118AB2', '#073B4C'],
            data: [{ title: '123', text: '2rqwfgsg', date: '23 Dec' }, { title: '123', text: '2rqwfgsg', date: '23 Dec' }, { title: '123', text: '2rqwfgsg', date: '23 Dec' }]
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
            this.setState({ data: data })


            this.setState({ key: this.props.route.params.key })
            console.log('================key update================', this.props.route.params.key)
        }
    }
    async componentDidMount() {
        //this.saveItem("keys", "1,2,3")
        //Math.floor(Math.random() * (999999999999))

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
        this.setState({ data: data })
    }
    async saveItem(key, value) {
        await SecureStore.setItemAsync(key, value);
    }
    async getItem(key) {
        let result = await SecureStore.getItemAsync(key);
        return result
    }
    delAlert() {
        Alert.alert(
            "Czy chcesz usunąć?",
            "Nie będzie możliwości przywrócenia danych!",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: this.delete() }
            ]
        )
    }
    render() {

        const renderItem = ({ item }) => (
            <TouchableOpacity onLongPress={this.delAlert.bind(this)} style={{ padding: 15, borderRadius: 20, marginTop: 10, flex: 1 / 2.2, height: 150, backgroundColor: this.state.colors[Math.floor(Math.random() * (5))] }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.title}>{item.date}</Text>
                </View>
                <View>
                    <Text style={styles.title}>{item.text}</Text>
                </View>

            </TouchableOpacity>
        );
        const { isFocused } = this.props;
        return (
            <View>

                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                    data={this.state.data}
                    renderItem={renderItem}
                    keyExtractor={item => Math.floor(Math.random() * (99999999999999))}
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
        color: 'white'
    },
    flatlist: {
        // width: '45%',
        //flexDirection: 'row'
    }

})
