import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
export default function SideScreen(props) {


    return (
        <DrawerContentScrollView {...props}>

            <DrawerItemList {...props} />

            <DrawerItem
                label="test"
                icon={() => <Image style={{ width: 45, height: 45 }} source={require('../assets/info.png')} />}
                onPress={() => alert("test")}
            />

        </DrawerContentScrollView>
    );

}

