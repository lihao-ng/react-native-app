import { Platform, Dimensions } from "react-native";

const isWeb = () => {
  return Platform.OS == "web";
}

const getWidth = () => {
  return Dimensions.get('window').width;
}

const getHeight = () => {
  return Dimensions.get('window').height;
}

export { isWeb, getWidth, getHeight };