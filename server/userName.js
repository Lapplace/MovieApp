import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_ID_KEY = 'userID';
const VIP_LEVEL_KEY = 'vipLevel';

const saveUserID = async (userID) => {
  try {
    if (userID !== null && userID !== undefined) {
      await AsyncStorage.setItem(USER_ID_KEY, userID);
      console.log('ID của người dùng đã được lưu.');
    } else {
      console.error('Giá trị userID không hợp lệ:', userID);
    }
  } catch (error) {
    console.error('Lỗi khi lưu ID của người dùng:', error);
  }
};

const getUserID = async () => {
  try {
    const userID = await AsyncStorage.getItem(USER_ID_KEY);
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

const removeUserIDVIP = async () => {
  try {
    await AsyncStorage.multiRemove([USER_ID_KEY, VIP_LEVEL_KEY]);
    console.log('ID và VIP của người dùng đã được xóa.');
  } catch (error) {
    console.error('Lỗi khi xóa ID và VIP của người dùng:', error);
  }
};

const saveVipLevel = async (vipLevel) => {
  try {
    if (vipLevel !== null && vipLevel !== undefined) {
      await AsyncStorage.setItem(VIP_LEVEL_KEY, vipLevel);
      console.log('VIP của người dùng đã được lưu.');
    } else {
      console.error('Giá trị vipLevel không hợp lệ:', vipLevel);
    }
  } catch (error) {
    console.error('Lỗi khi lưu VIP của người dùng:', error);
  }
};

const getVipLevel = async () => {
  try {
    const vipLevel = await AsyncStorage.getItem(VIP_LEVEL_KEY);
    if (vipLevel !== null) {
      return vipLevel;
    } else {
      console.log('Không có VIP của người dùng.');
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi lấy VIP của người dùng:', error);
    return null;
  }
};

export { saveUserID, getUserID, removeUserIDVIP, getVipLevel, saveVipLevel };
