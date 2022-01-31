import { StyleSheet, Text, SafeAreaView, Pressable, Image, FlatList, View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";

import Colors from './Themes/colors.js';
import ConvertToMinutes from './utils/millisToMinuteSeconds';
import Song from './Song.js';

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

export default function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      // Comment out the one you are not using
      myTopTracks(setTracks, token);
      // albumTracks(ALBUM_ID, setTracks, token);
    }
  }, [token]);

  const SpotifyAuthButton = () => {
    return(
      <Pressable style={styles.spotifyButton} onLongPress={(promptAsync)}>
        <Image style={styles.smallSpotify} source={require('./assets/spotify-logo.png')}/>
        <Text style={styles.buttonText}>CONNECT WITH SPOTIFY</Text>   
      </Pressable>
    );
  } 

  const SpotifyList = () => {
    return(
      <View>
        <View style={styles.topSongBox}>
          <Image style={styles.smallSpotify} source={require('./assets/spotify-logo.png')} />
          <Text style={styles.buttonText}>My Top Tracks</Text>
        </View>
        <FlatList
          data={tracks}
          renderItem={({ item, index }) => renderSong(item, index)}
          keyExtractor={(item) => item.index} />
      </View>
      // <Text style={{color: Colors.white}}>{JSON.stringify(tracks[0].album.images[0].url)}</Text>
    );
  }

  const renderSong = (item, index) => (
    <Song 
      id = {index}
      songName = {item.name} 
      artist = {item.artists[0].name}
      albumCover = {item.album.images[0].url}
      duration = {ConvertToMinutes(item.duration_ms)}
      albumName = {item.album.name}/>
  );


  let contentDisplayed = null;

  if (token) {
    contentDisplayed = <SpotifyList/>
  } else{
    contentDisplayed = <SpotifyAuthButton/>
  } 

  return (
    <SafeAreaView style={styles.container}>
      {contentDisplayed}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  spotifyButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.spotify,
    width: '90%',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 99999,
  },
  smallSpotify: {
    height: 30,
    width: 30,
    backgroundColor: Colors.background,
    borderRadius: 99999,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    
  },
  topSongBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  }
});