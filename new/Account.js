import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from '../theme';
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';
import { imageDataURL } from '../constants/data';
import * as ImagePicker from "expo-image-picker";
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';


export default function Account() {
     const navigation = useNavigation();
     const [selectedImage, setSelectedImage] = useState(imageDataURL[0])
     const [name, setName] = useState("Melissa Peters");
     const [email, setEmail] = useState("met@gmail.com");
     const [password, setPassword] = useState("randompass");
     const [country, setCountry] = useState("Nigeria");

     const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
     const today = new Date();
     const startDate = getFormatedDate(
          today.setDate(today.getDate() + 1),
          "YYYY/MM/DD"
     )
     const [selectedStartDate, setSelectedStartDate] = useState("01/01/1990");
     const [startedDate, setStartedDate] = useState("12/12/2023");
     const handlechangeStartDate = (propDate) => {
          setStartedDate(propDate);
     }
     const handleOnPressStarDate = () => {
          setOpenStartDatePicker(!openStartDatePicker)
     }
     const handleImageSelection = async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
               mediaTypesz: ImagePicker.MediaTypeOptions.All,
               allowsEditing: true,
               aspect: [4, 4],
               quality: 1
          })
          console.log(result);
          if (!result.canceled) {
               setSelectedImage(result.assets[0].uri)
          }
     };
     function renderDatePicker() {
          return (
               <Modal
                    animationType='slide'
                    transparent={true}
                    visible={openStartDatePicker}
               >
                    <View style={{
                         flex: 1,
                         alignContent: "center",
                         justifyContent: "center"
                    }}>
                         <View style={{
                              margin: 20,
                              backgroundColor: COLORS.primary,
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 20,
                              padding: 35,
                              width: "90%",
                              shadowColor: "#000",
                              shadowOffset: {
                                   width: 0,
                                   height: 2
                              },
                              shadowOpacity: 0.25,
                              shadowRadius: 4,
                              elevation: 5
                         }}>
                              <DatePicker
                                   mode='calendar'
                                   minimumDate={startDate}
                                   selected={startDate}
                                   onDateChange={handlechangeStartDate}
                                   onSelectedChange={(date) => setSelectedStartDate(date)}
                                   options={{
                                        backgroundColor: COLORS.primary,
                                        textHeaderColor: '#469ab6',
                                        textDefaultColor: COLORS.white,
                                        selectedTextColor: COLORS.white,
                                        mainColor: "#469ab6",
                                        textSecondaryColor: COLORS.white,
                                        borderColor: "rgba(122,146,165,0.1)"
                                   }}
                              />
                              <TouchableOpacity
                                   onPress={handleOnPressStarDate}
                              >
                                   <Text style={{ ...FONTS.body3, color: COLORS.white }}>Close</Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               </Modal>

          );
     }
     return (
          <SafeAreaView style={{
               flex: 1,
               backgroundColor: COLORS.white,
               paddingHorizontal: 22
          }}>
               <View style={{
                    marginHorizontal: 12,
                    flexDirection: "row",
                    justifyContent: "center"
               }}
               >
                    <TouchableOpacity
                         onPress={() => navigation.goBack()}
                         style={{
                              position: "absolute",
                              left: 0
                         }}
                    >
                         <MaterialIcons
                              name="keyboard-arrow-left"
                              size={30}
                              color={'#0f0f0f'}
                         />
                    </TouchableOpacity>
                    <Text style={{ ...FONTS.h3 }}>Edit Profile</Text>
               </View>
               <ScrollView>
                    <View style={{
                         alignItems: "center",
                         marginVertical: 22
                    }}>
                         <TouchableOpacity
                              onPress={handleImageSelection}
                         >
                              <Image
                                   source={{ uri: selectedImage }}
                                   style={{
                                        height: 170,
                                        width: 170,
                                        borderRadius: 85,
                                        borderWidth: 2,
                                        borderColor: COLORS.primary
                                   }}
                              />
                              <View style={{
                                   position: 'absolute',
                                   bottom: 0,
                                   right: 10,
                                   zIndex: 9999
                              }}>
                                   <MaterialIcons
                                        name='photo-camera'
                                        size={32}
                                        color={COLORS.primary}
                                   />
                              </View>
                         </TouchableOpacity>
                    </View>
                    <View>
                         <View style={{
                              flexDirection: 'column',
                              marginBottom: 6
                         }}>
                              <Text style={{ ...FONTS.h4 }}>Name</Text>
                              <View style={{
                                   height: 44,
                                   width: "100%",
                                   borderColor: COLORS.secondaryGray,
                                   borderWidth: 1,
                                   borderRadius: 4,
                                   marginVertical: 6,
                                   justifyContent: "center",
                                   paddingLeft: 8
                              }}>
                                   <TextInput
                                        value={name}
                                        onChangeText={value => setName(value)}
                                        editable={true}
                                   />
                              </View>
                         </View>
                         <View style={{
                              flexDirection: 'column',
                              marginBottom: 6
                         }}>
                              <Text style={{ ...FONTS.h4 }}>Email</Text>
                              <View style={{
                                   height: 44,
                                   width: "100%",
                                   borderColor: COLORS.secondaryGray,
                                   borderWidth: 1,
                                   borderRadius: 4,
                                   marginVertical: 6,
                                   justifyContent: "center",
                                   paddingLeft: 8
                              }}>
                                   <TextInput
                                        value={email}
                                        onChangeText={value => setEmail(value)}
                                        editable={true}
                                   />
                              </View>
                         </View>
                         <View style={{
                              flexDirection: 'column',
                              marginBottom: 6
                         }}>
                              <Text style={{ ...FONTS.h4 }}>Password</Text>
                              <View style={{
                                   height: 44,
                                   width: "100%",
                                   borderColor: COLORS.secondaryGray,
                                   borderWidth: 1,
                                   borderRadius: 4,
                                   marginVertical: 6,
                                   justifyContent: "center",
                                   paddingLeft: 8
                              }}>
                                   <TextInput
                                        value={password}
                                        onChangeText={value => setPassword(value)}
                                        editable={true}
                                        secureTextEntry
                                   />
                              </View>
                         </View>
                         <View style={{
                              flexDirection: 'column',
                              marginBottom: 6
                         }}>
                              <Text style={{ ...FONTS.h4 }}>Date or Birth</Text>

                              <TouchableOpacity
                                   onPress={handleOnPressStarDate}
                                   style={{
                                        height: 44,
                                        width: "100%",
                                        borderColor: COLORS.secondaryGray,
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        marginVertical: 6,
                                        justifyContent: "center",
                                        paddingLeft: 8
                                   }}>
                                   <Text>
                                        {selectedStartDate}
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
                    <View style={{
                         flexDirection: 'column',
                         marginBottom: 6
                    }}>
                         <Text style={{ ...FONTS.h4 }}>Country</Text>
                         <View style={{
                              height: 44,
                              width: "100%",
                              borderColor: COLORS.secondaryGray,
                              borderWidth: 1,
                              borderRadius: 4,
                              marginVertical: 6,
                              justifyContent: "center",
                              paddingLeft: 8
                         }}>
                              <TextInput
                                   value={country}
                                   onChangeText={value => setCountry(value)}
                                   editable={true}
                              />
                         </View>
                    </View>
                    <TouchableOpacity style={{
                         backgroundColor: COLORS.primary,
                         height:44,
                         borderRadius:6,
                         alignItems:'center',
                         justifyContent:"center"
                    }}>
                         <Text style={{
                              ...FONTS.body3,
                              color:COLORS.white
                         }}>
                              Save Change
                         </Text>
                    </TouchableOpacity>
                    {renderDatePicker()}
               </ScrollView>
          </SafeAreaView>
     )
}