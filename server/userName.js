import AsyncStorage from '@react-native-async-storage/async-storage';

// Lưu ID của người dùng
const saveUserID = async (userID) => {
  try {
    await AsyncStorage.setItem('userID', userID);
    console.log('ID của người dùng đã được lưu.');
  } catch (error) {
    console.error('Lỗi khi lưu ID của người dùng:', error);
  }
};

// Lấy ID của người dùng
const getUserID = async () => {
  try {
    const userID = await AsyncStorage.getItem('userID');
    if (userID !== null) {
      return userID;
    } else {
      console.log('Không có ID của người dùng.');
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi lấy ID của người dùng:', error);
    return null;
  }
};
// xóa id người dùng
const removeUserID = async () => {
     try {
       await AsyncStorage.removeItem('userID');
       console.log('ID của người dùng đã được xóa.');
     } catch (error) {
       console.error('Lỗi khi xóa ID của người dùng:', error);
     }
   };
   

export { saveUserID, getUserID, removeUserID };
