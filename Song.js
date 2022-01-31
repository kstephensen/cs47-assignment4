import {StyleSheet, View, Text, Image} from "react-native";
import React, { useState } from 'react';
import Colors from './Themes/colors.js';


export default function Song({id, songName, artist, albumCover, duration, albumName}) {
    let base10Index = id + 1;
    return (
        <View style={styles.songBox}>
            <Text style={[styles.numberBox, styles.songText]}>{base10Index}</Text>
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
            
        </View>
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
    numberBox: {
        width: 20,
        alignContent: 'center',
        justifyContent: 'center',
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