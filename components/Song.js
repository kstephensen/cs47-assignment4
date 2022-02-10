import {StyleSheet, View, Text, Image, Pressable} from "react-native";
import React, { useState } from 'react';
import Colors from '../Themes/colors.js';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



export default function Song({id, songName, artist, albumCover, duration, albumName, song_url, preview_url}) {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.songBox} onPress={() => navigation.navigate("Song Details", {'song_url': song_url}) }>
            <Pressable style={styles.iconBox} onPress={(e) => {
                e.stopPropagation();
                navigation.navigate("Song Preview", {'preview_url': preview_url}) // To do: add in navigation.navigate("screen", { links }) 
            }}>
                <AntDesign name="play" size={24} style={styles.playIcon} />
            </Pressable>
            <Image source={{uri: `${albumCover}`}} style={styles.thumbnail} />
            <View style={styles.nameBox}>
                <Text numberOfLines={1} style={styles.songText}>{songName}</Text>
                <Text numberOfLines={1} style={{color: Colors.gray}}>{artist}</Text>
            </View>
            <View style={styles.albumNameBox} >
                <Text numberOfLines={1} style={styles.songText}>{albumName}</Text>
            </View>
            <View style={styles.durationBox}>
                <Text numberOfLines={1} style={[styles.songText, styles.durationBox]}>{duration}</Text>
            </View>
            
        </Pressable>
    );
  }

  const styles = StyleSheet.create({
    songText: {
        color: Colors.white,
    },
    songBox: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'center',
        width: 370,
        height: 100,
        padding: 5,
        margin: 5,
    },
    iconBox: {
        alignContent: 'center',
        justifyContent: 'center',
        width: 35
    },
    playIcon: {
        color: Colors.spotify,
    },
    thumbnail: {
        height: 75,
        width: 75,
        margin: 5,
    },
    nameBox: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '30%',
        margin: 5,
    },
    albumNameBox: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '22%',
    },
    durationBox: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '35%',
        marginLeft: 5,
    }
  });