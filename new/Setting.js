import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { FONTS, COLORS } from '../theme';
import { useNavigation } from '@react-navigation/native'
import { removeUserID } from '../server/userName';


export default function Setting() {
     const navigation = useNavigation();

     const navigateToEditProfile = () => {
          navigation.navigate("Account");

     }
     const navigateToSecurity = () => {
          console.log("Security function")
     }
     const navigateToNotifications = () => {
          console.log("Security function")
     }
     const navigateToPrivacy = () => {
          console.log("Security function")
     }

     const navigateToSubscription = () => {
          console.log("support");
     }
     const navigateToSupport = () => {
          console.log("support");
     }
     const navigateToTermsAndPolicies = () => {
          console.log("support");
     }
     const navigateToFreeSpace = () => {
          console.log("cacheAndCellularItems");
     }
     const navigateToDateSaver = () => {
          console.log("cacheAndCellularItems");
     }
     const navigateToReportProblem = () => {
          console.log("cacheAndCellularItems");
     }
     const addAcount = () => {
          console.log("cacheAndCellularItems");
     }
     const logout = () => {
          navigation.navigate("Login");
          removeUserID();

     }
     const accountItem = [
          { icon: "person-outline", text: "Edit Profile", action: navigateToEditProfile },
          { icon: "security", text: "Security", action: navigateToSecurity },
          { icon: "notifications-none", text: "Nontifications", action: navigateToNotifications },
          { icon: "lock-outline", text: "Privacy", action: navigateToPrivacy }
     ];
     const suportItem = [
          { item: "credit_card", text: "My Subscription", action: navigateToSubscription },
          { item: "help-outline", text: "Help & Support", action: navigateToSupport },
          { item: "info-outline", text: "Terms and Policies", action: navigateToTermsAndPolicies }
     ];
     const cacheAndCellularItems = [
          { item: "delete-outline", text: "Free up space", action: navigateToFreeSpace },
          { item: "save-alt", text: "Date Saver", action: navigateToDateSaver },
     ];
     const actionItems = [
          { item: "outline-flag", text: "Report a problem", action: navigateToReportProblem },
          { item: "people-outline", text: "Add Account", action: addAcount },
          { item: "logout", text: "Log out", action: logout }
     ];
     const renderSettingsItem = ({ icon, text, action }) => (
          <TouchableOpacity
               onPress={action}
               style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 8,
                    paddingLeft: 12
               }}>
               <MaterialIcons name={icon} size={24} color="black" />
               <Text style={{
                    marginLeft: 36,
                    ...FONTS.semiBold,
                    fontWeight: 600,
                    fontSize: 16
               }}>
                    {text}
               </Text>
          </TouchableOpacity>
     )
     return (
          <SafeAreaView style={{
               flex: 1,
               backgroundColor: '#fff'
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

                    <Text style={{ ...FONTS.h3 }}>Setting</Text>
               </View>
               <ScrollView style={{ marginBottom: 12 }}>
                    {/* AccountSetting */}
                    <View style={{ marginBottom: 12 }}>
                         <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Account</Text>
                         <View style={{
                              borderRadius: 12,
                              backgroundColor: COLORS.gray,
                         }}>
                              {
                                   accountItem.map((item, index) => (
                                        <React.Fragment key={index}>
                                             {renderSettingsItem(item)}
                                        </React.Fragment>
                                   ))
                              }
                         </View>
                    </View>
                    {/* Support and About setting */}
                    <View style={{ marginBottom: 12 }}>
                         <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Support & About</Text>
                         <View style={{
                              borderRadius: 12,
                              backgroundColor: COLORS.gray,
                         }}>
                              {
                                   suportItem.map((item, index) => (
                                        <React.Fragment key={index}>
                                             {renderSettingsItem(item)}
                                        </React.Fragment>
                                   ))
                              }
                         </View>
                    </View>
                    {/* Login,logout */}
                    <View style={{ marginBottom: 12 }}>
                         <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Log out</Text>
                         <View style={{
                              borderRadius: 12,
                              backgroundColor: COLORS.gray,
                         }}>
                              {
                                   actionItems.map((item, index) => (
                                        <React.Fragment key={index}>
                                             {renderSettingsItem(item)}
                                        </React.Fragment>
                                   ))
                              }
                         </View>
                    </View>
               </ScrollView>
          </SafeAreaView>
     )
}