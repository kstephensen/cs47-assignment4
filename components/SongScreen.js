import { WebView } from 'react-native-webview';
import Colors from '../Themes/colors';

export default function SongScreen({ route, navigation}) {
    const {song_url} = route.params;
    return(
       <WebView  source={{ uri: song_url }} style={{backgroundColor: Colors.background }}/>
    )
  }
  