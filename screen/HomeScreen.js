import { View, Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from '@react-navigation/native';
import Loading from "../components/loading";
import { movieURL } from '../api/moviedbs';

const android = Platform.OS == 'android';
export default function HomeScreen() {
     const [trending, setTrending] = useState([]);
     // const [upcoming, setUpcoming] = useState([]);
     // const [topRated, setTopRated] = useState([]);
     const [loading, setLoading] = useState(true);
     const navigation = useNavigation();

     useEffect(() => {
          getTrendingMovies();
          // getUpcomingMovie();
          // getTopRatedMovie();
     }, [])

     const getTrendingMovies = async () => {
          fetch(`${movieURL}`)
               .then(response => response.json())
               .then(data => {
                    // console.log(data)
                    setTrending(data);
               })
               .catch(error => {
                    console.error('Fetch error:', error);
               });
          setLoading(false);

     }
     return (
          <View className="flex-1 bg-neutral-800">
               <SafeAreaView className={android ? "-mb-2" : 'mb-3'}>
                    <StatusBar style="light" />
                    <View className='flex-row justify-between items-center mx-4 pt-2 pb-5'>
                         {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                              <Bars3CenterLeftIcon size="35" strokeWidth={2} color="white" />
                         </TouchableOpacity> */}

                         <Text className="text-white text-3xl font-bold">
                              <Text style={styles.text}>M</Text>ovie
                         </Text>
                         <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                              <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                         </TouchableOpacity>
                    </View>
               </SafeAreaView>
               {
                    loading ? (
                         <Loading />
                    ) : (

                         <ScrollView
                              showsVerticalScrollIndicator={false}
                              contentContainerStyle={{ paddingBottom: 10 }}
                         >
                              {/* Trending movies carousel */}
                              {trending.length > 0 && <TrendingMovies data={trending} />}

                              {/* upcoming movies row */}
                              <MovieList title="Upcoming" data={trending} />

                              {/* top rated movies row */}
                              <MovieList title="Top Rated" data={trending} />
                         </ScrollView>
                    )
               }
          </View>
     )
}