import Constants from "expo-constants";
import { StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";

export default function TabTwoScreen() {
  const url = Constants.expoConfig?.extra?.webviewUrl;

  if (!url) {
    return <Text>잘못된 경로로 접근하셨습니다.</Text>;
  }

  return <WebView style={styles.container} source={{ uri: url }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
