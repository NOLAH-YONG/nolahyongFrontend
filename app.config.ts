import { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "노라용",
  slug: "nolahyong",
  scheme: "nolahyong",
  extra: {
    webviewUrl: process.env.EXPO_PUBLIC_WEBVIEW_URL,
  },
});
