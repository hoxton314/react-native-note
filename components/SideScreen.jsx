import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
export default function SideScreen(props) {


    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem
                label=""
                icon={() => <Image style={{ width: 128, height: 128 }} source={require('../assets/pencil.png')} />}
                onPress={() => {}}
                style={{marginLeft:'auto'}}
            />
            
            <DrawerItemList {...props} />

            <DrawerItem
                label="info"
                icon={() => <Image style={{ width: 45, height: 45 }} source={require('../assets/info.png')} />}
                onPress={() => alert("Notatnik v2")}
            />

        </DrawerContentScrollView>
    );

}

