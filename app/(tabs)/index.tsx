import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

const emotions = [
  { name: 'Sadness', icon: 'sad', color: '#00BFFF' }, // Deep Sky Blue
  { name: 'Happiness', icon: 'happy', color: '#FFD700' }, // Gold
  { name: 'Anger', icon: 'flame', color: '#FF4500' }, // Orange Red
  { name: 'Fear', icon: 'warning', color: '#FF1493' }, // Deep Pink
  { name: 'Surprise', icon: 'flash', color: '#00FF7F' }, // Spring Green
  { name: 'Love', icon: 'heart', color: '#FF69B4' }, // Hot Pink
  { name: 'Calm', icon: 'leaf', color: '#00FA9A' }, // Medium Spring Green
  { name: 'Excitement', icon: 'star', color: '#FFA500' }, // Orange
];

export const songs = [
  // 💫 Uplifting & Hopeful
  { name: 'Starlight', vector: { sadness: 0, happiness: 3, anger: 0, fear: 0, surprise: 0, love: 2, calm: 1, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/3skn2lauGk7Dx6bVIt5DVj' },
  { name: 'Feeling Good', vector: { sadness: 0, happiness: 3, anger: 0, fear: 0, surprise: 0, love: 1, calm: 0, excitement: 2 }, spotify: 'https://open.spotify.com/embed/track/5PK1JCSdr34gWgzYHgt3Jq' },
  { name: 'Pressure', vector: { sadness: 0, happiness: 2, anger: 0, fear: 0, surprise: 0, love: 0, calm: 0, excitement: 3 }, spotify: 'https://open.spotify.com/embed/track/1pbyc2rbpwxZjCbKC2X7UV' },
  { name: 'Resistance', vector: { sadness: 1, happiness: 0, anger: 0, fear: 0, surprise: 0, love: 2, calm: 2, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/1C2QJNTmsTxCDBuIgai8QV' },
  { name: 'Aftermath', vector: { sadness: 2, happiness: 0, anger: 0, fear: 0, surprise: 0, love: 2, calm: 3, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/2z1D4PqjWYEsXeXxE6euQ2' },
  { name: 'Explorers', vector: { sadness: 2, happiness: 0, anger: 0, fear: 0, surprise: 2, love: 0, calm: 2, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/2wc6dUVcaltYeOZN8B2xe9' },

  // ⚡ Energetic / Adrenaline
  { name: 'Hysteria', vector: { sadness: 0, happiness: 0, anger: 2, fear: 0, surprise: 0, love: 1, calm: 0, excitement: 3 }, spotify: 'https://open.spotify.com/embed/track/7xyYsOvq5Ec3P4fr6mM9fD' },
  { name: 'Plug In Baby', vector: { sadness: 0, happiness: 2, anger: 0, fear: 0, surprise: 0, love: 0, calm: 0, excitement: 3 }, spotify: 'https://open.spotify.com/embed/track/2UKARCqDrhkYDoVR4FN5Wi' },
  { name: 'Supermassive Black Hole', vector: { sadness: 0, happiness: 0, anger: 0, fear: 0, surprise: 1, love: 2, calm: 0, excitement: 3 }, spotify: 'https://open.spotify.com/embed/track/3lPr8ghNDBLc2uZovNyLs9' },
  { name: 'Time Is Running Out', vector: { sadness: 0, happiness: 0, anger: 0, fear: 2, surprise: 0, love: 1, calm: 0, excitement: 2 }, spotify: 'https://open.spotify.com/embed/track/2takcwOaAZWiXQijPHIx7B' },
  { name: 'Psycho', vector: { sadness: 0, happiness: 0, anger: 3, fear: 0, surprise: 0, love: 0, calm: 0, excitement: 2 }, spotify: 'https://open.spotify.com/embed/track/383QXk8nb2YrARMUwDdjQS' },
  { name: 'Hyper Music', vector: { sadness: 0, happiness: 0, anger: 3, fear: 0, surprise: 0, love: 0, calm: 0, excitement: 3 }, spotify: 'https://open.spotify.com/embed/track/7BxQJTzBjhfpx8PVT1qASg' },
  { name: 'Stockholm Syndrome', vector: { sadness: 0, happiness: 0, anger: 3, fear: 1, surprise: 0, love: 0, calm: 0, excitement: 3 }, spotify: 'https://open.spotify.com/embed/track/3ox5lIXRf4r977FsE7JfXs' },
  { name: 'Map of the Problematique', vector: { sadness: 2, happiness: 0, anger: 0, fear: 2, surprise: 0, love: 0, calm: 0, excitement: 2 }, spotify: 'https://open.spotify.com/embed/track/7CHxfqxxZA9lHpvH66029a' },

  // 🌌 Cosmic / Epic / Awe
  { name: 'Knights of Cydonia', vector: { sadness: 0, happiness: 2, anger: 0, fear: 0, surprise: 3, love: 0, calm: 0, excitement: 3 }, spotify: 'https://open.spotify.com/embed/track/7ouMYWpwJ422jRcDASZB7P' },
  { name: 'Take a Bow', vector: { sadness: 0, happiness: 0, anger: 2, fear: 0, surprise: 3, love: 0, calm: 0, excitement: 3 }, spotify: 'https://open.spotify.com/embed/track/0wTZ6F9kPaoAJzPd0QKY5Y' },
  { name: 'Exogenesis: Symphony Part I (Overture)', vector: { sadness: 2, happiness: 0, anger: 0, fear: 0, surprise: 3, love: 0, calm: 2, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/6zkhhG8iQ8waiwGkQuhoE1' },
  { name: 'Butterflies and Hurricanes', vector: { sadness: 0, happiness: 0, anger: 0, fear: 0, surprise: 2, love: 0, calm: 0, excitement: 2 }, spotify: 'https://open.spotify.com/embed/track/0xJLcjd0gaZct43xG1UlXS' },
  { name: 'Survival', vector: { sadness: 0, happiness: 2, anger: 2, fear: 0, surprise: 0, love: 0, calm: 0, excitement: 3 }, spotify: 'https://open.spotify.com/embed/track/2IFqUmfW8oQoKn6ToxKsMs' },

  // ❤️ Emotional / Romantic
  { name: 'Undisclosed Desires', vector: { sadness: 0, happiness: 2, anger: 0, fear: 0, surprise: 0, love: 3, calm: 1, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/0It6VJoMAare1zdV2wxqZq' },
  { name: 'Madness', vector: { sadness: 1, happiness: 0, anger: 0, fear: 0, surprise: 0, love: 3, calm: 1, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/0c4IEciLCDdXEhhKxj4ThA' },
  { name: 'Neutron Star Collision (Love Is Forever)', vector: { sadness: 0, happiness: 2, anger: 0, fear: 0, surprise: 0, love: 3, calm: 0, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/4AIazttPmHpd7p7pwJw692' },
  { name: 'Unintended', vector: { sadness: 2, happiness: 0, anger: 0, fear: 0, surprise: 0, love: 3, calm: 2, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/6kyxQuFD38mo4S3urD2Wkw' },
  { name: 'Endlessly', vector: { sadness: 2, happiness: 0, anger: 0, fear: 0, surprise: 0, love: 2, calm: 1, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/3fTzpkCxUf3nQ9edubQRDK' },

  // 🖤 Melancholic / Dark
  { name: 'Sing for Absolution', vector: { sadness: 3, happiness: 0, anger: 0, fear: 0, surprise: 0, love: 1, calm: 2, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/6Dct63YMBXtjGqCwr0HkYb' },
  { name: 'Falling Away With You', vector: { sadness: 3, happiness: 0, anger: 0, fear: 0, surprise: 0, love: 2, calm: 2, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/5cvFycFL4BTMA3dHSstMqi' },
  { name: 'The Small Print', vector: { sadness: 2, happiness: 0, anger: 2, fear: 0, surprise: 0, love: 0, calm: 0, excitement: 1 }, spotify: 'https://open.spotify.com/embed/track/6mPJvjjx7pcfZuI57Dh95o' },
  { name: 'Megalomania', vector: { sadness: 2, happiness: 0, anger: 0, fear: 0, surprise: 2, love: 0, calm: 1, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/2Ql35D6jSAcDyLnQGsD6ie' },
  { name: 'Dead Inside', vector: { sadness: 3, happiness: 0, anger: 0, fear: 2, surprise: 0, love: 1, calm: 0, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/2daZovie6pc2ZK7StayD1K' },
  { name: 'The Dark Side', vector: { sadness: 2, happiness: 0, anger: 0, fear: 0, surprise: 0, love: 2, calm: 1, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/0dMYPDqcI4ca4cjqlmp9mE' },
  { name: 'Ruled by Secrecy', vector: { sadness: 3, happiness: 0, anger: 0, fear: 0, surprise: 0, love: 0, calm: 3, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/5Zm5oxx8yyLKOAJf1knPmR' },

  // 😱 Fear / Dystopia / Anxiety
  { name: 'The Handler', vector: { sadness: 1, happiness: 0, anger: 2, fear: 3, surprise: 0, love: 0, calm: 0, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/2cQTVGXSf6JelS23kwuuFV' },
  { name: 'MK Ultra', vector: { sadness: 0, happiness: 0, anger: 0, fear: 3, surprise: 0, love: 0, calm: 0, excitement: 2 }, spotify: 'https://open.spotify.com/embed/track/0MrkZz4D3fGlEkhebjPPrh' },
  { name: 'Assassin', vector: { sadness: 0, happiness: 0, anger: 3, fear: 2, surprise: 0, love: 0, calm: 0, excitement: 2 }, spotify: 'https://open.spotify.com/embed/track/6JnFVmPyJvjnfBag0hhIFa' },
  { name: 'Uprising', vector: { sadness: 0, happiness: 1, anger: 2, fear: 0, surprise: 0, love: 0, calm: 0, excitement: 2 }, spotify: 'https://open.spotify.com/embed/track/4VqPOruhp5EdPBeR92t6lQ' },
  { name: 'Citizen Erased', vector: { sadness: 2, happiness: 0, anger: 0, fear: 3, surprise: 2, love: 0, calm: 0, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/0PEogXgSTxYjiL9oltS2Oc' },
  { name: 'Apocalypse Please', vector: { sadness: 2, happiness: 0, anger: 0, fear: 3, surprise: 3, love: 0, calm: 0, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/6z0QCh7CTU9bE5C7TAHK4R' },

  // 🌊 Peaceful / Reflective
  { name: 'Blackout', vector: { sadness: 2, happiness: 0, anger: 0, fear: 0, surprise: 0, love: 0, calm: 3, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/2nTgdpxwpXTk5x1c9yaO3W' },
  { name: 'Invincible', vector: { sadness: 0, happiness: 2, anger: 0, fear: 0, surprise: 0, love: 2, calm: 2, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/2zmR3FG7iOGDAdwrVPzdg9' },
  { name: 'Mercy', vector: { sadness: 1, happiness: 0, anger: 0, fear: 0, surprise: 0, love: 2, calm: 2, excitement: 0 }, spotify: 'https://open.spotify.com/embed/track/2qkmPUG7ARsRwhVICQVwQS' },
  { name: 'Defector', vector: { sadness: 0, happiness: 0, anger: 0, fear: 0, surprise: 0, love: 0, calm: 1, excitement: 2 }, spotify: 'https://open.spotify.com/embed/track/4FnAEvbT3mjxpkUKpGwXYM' },
];


export default function HomeScreen() {
  const [emotionGrades, setEmotionGrades] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
  const [matchedSong, setMatchedSong] = useState<{name: string, score: number, spotify?: string} | null>(null);

  const handleEmotionPress = (index: number) => {
    setEmotionGrades(prev => {
      const newGrades = [...prev];
      if (newGrades[index] >= 3) {
        newGrades[index] = 0; // Reset to 0 if already at max
      } else {
        newGrades[index] += 1; // Increment grade
      }
      return newGrades;
    });
  };

  const getBorderIntensity = (grade: number) => {
    // Grade 0: 0.2 opacity, Grade 1: 0.4, Grade 2: 0.7, Grade 3: 1.0
    const opacity = 0.2 + (grade * 0.25);
    return opacity;
  };

  const calculateCosineSimilarity = (userVector: number[], songVector: any) => {
    const emotionKeys = ['sadness', 'happiness', 'anger', 'fear', 'surprise', 'love', 'calm', 'excitement'];
    
    let dotProduct = 0;
    let userMagnitude = 0;
    let songMagnitude = 0;
    
    for (let i = 0; i < emotionKeys.length; i++) {
      const userValue = userVector[i];
      const songValue = songVector[emotionKeys[i]] || 0;
      
      dotProduct += userValue * songValue;
      userMagnitude += userValue * userValue;
      songMagnitude += songValue * songValue;
    }
    
    userMagnitude = Math.sqrt(userMagnitude);
    songMagnitude = Math.sqrt(songMagnitude);
    
    if (userMagnitude === 0 || songMagnitude === 0) return 0;
    
    return dotProduct / (userMagnitude * songMagnitude);
  };

  const findBestMatch = () => {
    let bestMatch = { name: '', score: -1, spotify: '' };
    
    songs.forEach(song => {
      const similarity = calculateCosineSimilarity(emotionGrades, song.vector);
      if (similarity > bestMatch.score) {
        bestMatch = { name: song.name, score: similarity, spotify: song.spotify };
      }
    });
    
    console.log('Best match found:', bestMatch);
    console.log('Embed URL:', getSpotifyEmbedUrl(bestMatch.spotify));
    setMatchedSong(bestMatch);
  };

  const renderGradeIndicators = (grade: number, color: string) => {
    return (
      <ThemedView style={styles.gradeContainer}>
        {[0, 1, 2].map((dotIndex) => (
          <ThemedView
            key={dotIndex}
            style={[
              styles.gradeDot,
              dotIndex < grade ? { backgroundColor: color } : styles.gradeDotInactive
            ]}
          />
        ))}
      </ThemedView>
    );
  };

  const getSpotifyEmbedUrl = (spotifyUrl: string) => {
    return spotifyUrl;
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.titleText}>Museic Box 📻</ThemedText>
      <ThemedView style={styles.grid}>
        {Array.from({ length: 9 }, (_, index) => {
          if (index < 8) {
            // Emotion cells
            const emotion = emotions[index];
            const grade = emotionGrades[index];
            return (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.cell,
                  {
                    borderColor: emotion.color,
                    borderWidth: 2,
                    shadowColor: emotion.color,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: getBorderIntensity(grade),
                    shadowRadius: grade > 0 ? 8 : 0,
                    elevation: grade > 0 ? 4 : 0,
                  }
                ]}
                onPress={() => handleEmotionPress(index)}
              >
                <Ionicons name={emotion.icon as any} size={24} color={emotion.color} />
                <ThemedText style={styles.emotionText}>{emotion.name}</ThemedText>
                {renderGradeIndicators(grade, emotion.color)}
              </TouchableOpacity>
            );
          } else {
            // Submit cell
            return (
              <TouchableOpacity key={index} style={styles.submitCell} onPress={findBestMatch}>
                <Ionicons name="play" size={32} color="#FFFFFF" />
              </TouchableOpacity>
            );
          }
        })}
      </ThemedView>
      
      {matchedSong && (
        <ThemedView style={styles.resultContainer}>
          <ThemedText style={styles.resultTitle}>Your Muse Match:</ThemedText>
          <ThemedText style={styles.songName}>{matchedSong.name}</ThemedText>
          <ThemedText style={styles.similarityScore}>
            Similarity: {(matchedSong.score * 100).toFixed(1)}%
          </ThemedText>
          
          
        </ThemedView>
      )}
      
      {/* Spotify Embed Player */}
      {matchedSong?.spotify && (
        <ThemedView style={styles.spotifyEmbedContainer}>
          <WebView
          scalesPageToFit={true}
          bounces={false}
          javaScriptEnabled
          style={{ height: 352, width: Dimensions.get('window').width, backgroundColor: '#151718' }}
          source={{
            html: `
                  <!DOCTYPE html>
                  <html>
                    <head></head> 
                    <body style="margin: 0; padding: 0; background: #151718; height: 352px; overflow: hidden;">
                
                 <iframe data-testid="embed-iframe" 
                  style="border-radius:12px" src="${getSpotifyEmbedUrl(matchedSong.spotify)}" 
                  width="100%" height="352" frameBorder="0" allowfullscreen="" 
                  allow="autoplay; clipboard-write; encrypted-media; 
                  fullscreen; picture-in-picture" loading="lazy"></iframe>
                  
                  </body>
                  </html>
            `,
          }}
          automaticallyAdjustContentInsets={false}
        />
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70, // Increased from 50 to 70 (20px more gap)
    paddingHorizontal: 20,
    paddingBottom: 20, // Add some bottom padding
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  grid: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  cell: {
    width: 90,
    height: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  emotionText: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
  submitCell: {
    width: 90,
    height: 90,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    gap: 3,
  },
  gradeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  gradeDotInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  songName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
    textAlign: 'center',
  },
  similarityScore: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  spotifyEmbedContainer: {
    marginTop: 30,
    marginHorizontal: 0,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#151718',
    minHeight: 352,
    width: Dimensions.get('window').width,
  },
  spotifyEmbed: {
    height: 352,
    backgroundColor: '#000',
  },
});
