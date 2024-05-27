import { View, Image, Text, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { favouriteURL } from '../api/moviedbs';
import { movieURL, isFavouriteURL } from '../api/moviedbs';
import { getUserID } from '../server/userName';
import { imageURL } from '../api/moviedbs';

var { width, height } = Dimensions.get('window')
const android = Platform.OS == 'android';
const topMargin = android ? '' : 'mt-3';
const getFullImageLink = (imageLink) => `${imageURL}/${imageLink}`;


export default function MovieScreen() {
     const { params: item } = useRoute();
     const [isFavourite, setIsFavourite] = useState(false);
     const navigation = useNavigation();
     const [userid, setUserID] = useState('');
     const [similarMovies, setSimilarMovies] = useState([]);
     const [loading, setLoading] = useState(false);
     const movie_id = item.id_movie
     // console.log("id movie: ",movie_id);
     // console.log(isFavourite)


     const updateFavourite = async (userId, movieId, isFavourite) => {
          setIsFavourite(!isFavourite)
          try {
               const response = await fetch(`${favouriteURL}`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                         id_user: userId,
                         id_movie: movieId,
                         isFavourite: isFavourite
                    })
               });

               if (!response.ok) {
                    throw new Error('Network response was not ok');
               }

               const data = await response.json();
               console.log(data);
          } catch (error) {
               console.error('There was a problem with the fetch operation:', error);
          }
     };
     useEffect(() => {
          fetchData();
     }, [])
     const fetchData = async () => {
          await getSimilarMovies();
          const userID = await getUserID();
          // console.log("ID của người dùng:", userID);
          setUserID(userID);
          await checkFavourite(userID, movie_id);
          setLoading(false);
     }
     const getSimilarMovies = async () => {
          fetch(`${movieURL}`)
               .then(response => response.json())
               .then(data => {
                    // console.log(data)
                    setSimilarMovies(data);
               })
               .catch(error => {
                    console.error('Fetch error:', error);
               });
     }
     const checkFavourite = async (userId, movieId) => {
          try {
               const response = await fetch(`${isFavouriteURL}`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                         id_user: userId,
                         id_movie: movieId
                    })
               });

               if (!response.ok) {
                    throw new Error('Network response was not ok');
               }

               const data = await response.json();
               // console.log(data);
               setIsFavourite(data.isFavourite)
          } catch (error) {
               console.error('There was a problem with the fetch operation:', error);
          }
     };
     return (
          <ScrollView
               contentContainerStyle={{ paddingBottom: 20 }}
               className="flex-1 bg-neutral-900"
          >
               <View className="w-full">
                    <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4" + topMargin}>
                         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                              <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => updateFavourite(userid, movie_id, isFavourite)}>
                              <HeartIcon size="35" color={isFavourite ? theme.background : "white"} />
                         </TouchableOpacity>
                    </SafeAreaView>
                    {
                         loading ? (
                              <Loading />
                         ) : (
                              <View>
                                   <Image
                                        source={{ uri: getFullImageLink(item.image_link) }}
                                        style={{ width, height: height * 0.55 }}
                                   />
                                   <LinearGradient
                                        colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                        style={{ width, height: height * 0.40 }}
                                        start={{ x: 0.5, y: 0 }}
                                        end={{ x: 0.5, y: 1 }}
                                        className="absolute bottom-0"
                                   />
                              </View>
                         )
                    }
               </View>
               <View style={{ marginTop: -(height * 0.0) }} className="space-y-3">
                    <Text className="text-white text-center text-3xl font-bold tracking-wider ">
                         {
                              item.title
                         }
                    </Text>
                    {/* Hiển thị thời gian xuất bản và thời lượng phim */}
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                         năm {item?.release_date?.split('-')[0]} • {item?.duration} phút
                    </Text>

                    {/* Hiển thị mô tả phim */}
                    <Text className="text-neutral-400 mx-4 tracking-wider">
                         {item?.summary}
                    </Text>
                    <View style={{ backgroundColor: 'black', padding: 10 }}>
                         <Text style={{ color: 'white' }}>
                              Diễn viên: {item.actors}
                         </Text>
                    </View>
                    <TouchableOpacity
                         style={styles.background}
                         onPress={() => navigation.push('ViewVideo', item)}
                         className="font-bold py-2 px-4 rounded-full"
                    >
                         <Text className="text-white text-center text-2xl">Play</Text>
                    </TouchableOpacity>
               </View>

               {/* {cast.length > 0 && <Cast navigation={navigation} cast={cast} />} */}

               <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
          </ScrollView>
     )
}
