import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { videoURL } from '../api/moviedbs';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { styles, theme } from '../theme';

const { width } = Dimensions.get('window');
const getFullVideosLink = (videosLink) => `${videoURL}/${videosLink}`;

export default function Videos() {
  const { params: item } = useRoute();
  const navigation = useNavigation();

  const video = useRef(null);
  const [isReplayVisible, setIsReplayVisible] = useState(false);

  const handlePlaybackStatusUpdate = playbackStatus => {
    if (playbackStatus.isLoaded && !playbackStatus.isPlaying && playbackStatus.didJustFinish) {
      setIsReplayVisible(true);
    }
  };

  const handleReplay = async () => {
    setIsReplayVisible(false);
    if (video.current) {
      await video.current.replayAsync(); 
    }
  };

  return (
    <SafeAreaView style={stylesvd.container}>
      <SafeAreaView style={stylesvd.absoluteContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={stylesvd.backButton}>
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={stylesvd.videoContainer}>
        <Video
          ref={video}
          style={stylesvd.video}
          source={{ uri: getFullVideosLink(item.video_url) }}
          useNativeControls
          resizeMode="contain"
          isLooping={false}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
        {isReplayVisible && (
          <TouchableOpacity style={stylesvd.replayButton} onPress={handleReplay}>
            <Text style={stylesvd.replayButtonText}>Xem lại</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const stylesvd = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  videoContainer: {
    width: width,
    height: 220,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  video: {
    width: width,
    height: 250,
    backgroundColor: '#000',
  },
  replayButton: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  replayButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
