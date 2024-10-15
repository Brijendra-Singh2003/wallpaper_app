import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePathname } from "expo-router";
import { useWallpapers } from "@/hooks/useWallpapers";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export default function ViewWallpaper(props: { segment: string }) {
  const id = +usePathname().substring(6);
  const wallpaper = useWallpapers().wallpapers.find((w) => w.id === id);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!wallpaper) {
    return NOT_FOUND;
  }

  const downloadFile = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Allow access to your media library to save images."
      );
      return;
    }

    setIsDownloading(true);
    const downloadFolderUri = `${FileSystem.documentDirectory}Download/`;
    const fileUri = `${downloadFolderUri}${wallpaper.name}.jpg`;

    try {
      const dirInfo = await FileSystem.getInfoAsync(downloadFolderUri);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(downloadFolderUri, {
          intermediates: true,
        });
      }

      const downloadResumable = FileSystem.createDownloadResumable(
        wallpaper.uri,
        fileUri,
        {},
        ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
          const progress = totalBytesExpectedToWrite < 0 ? 0.1 : totalBytesWritten / totalBytesExpectedToWrite;
          setDownloadProgress(progress);
        }
      );

      const result = await downloadResumable.downloadAsync();

      if (!result?.uri) {
        Alert.alert("Download was canceled");
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(result.uri);
      const album = await MediaLibrary.getAlbumAsync("Download");

      if (album == null) {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      setIsDownloading(false);
      Alert.alert("Download Complete");
      console.log("Downloaded file saved to:", result.uri);
    } catch (error) {
      setIsDownloading(false);
      console.error("Error downloading the file:", error);
      Alert.alert("Download Failed", "An error occurred while downloading.");
    }
  };

  return (
    <View style={styles.main}>
      <Image style={styles.image} src={wallpaper.uri} />
      <LinearGradient
        colors={["#0000", "#000a", "#000c"]}
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          paddingVertical: 24,
        }}
      >
        {wallpaper.name && <Text style={styles.name}>{wallpaper.name}</Text>}
        <TouchableOpacity
          disabled={isDownloading}
          style={styles.button}
          onPress={downloadFile}
        >
          <AntDesign name="download" size={24} color="black" />
          <Text style={styles.text}>
            {isDownloading
              ? `${Math.round(downloadProgress * 100)}%`
              : "Download"}
          </Text>

          {isDownloading && (
            <View
              style={{
                position: "absolute",
                zIndex: -1,
                right: 0,
                backgroundColor: "gray",
                height: "100%",
                width: `${100 - Math.round(downloadProgress * 100)}%`,
              }}
            />
          )}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#151515",
  },
  image: {
    flex: 1,
    borderRadius: 16,
  },
  button: {
    backgroundColor: "white",
    marginHorizontal: 32,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    overflow: "hidden",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 8,
  },
  progressContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  progressBar: {
    width: "80%",
  },
  progressText: {
    color: "white",
    marginTop: 8,
  },
});

const NOT_FOUND = (
  <SafeAreaView
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "black",
    }}
  >
    <Text style={{ fontSize: 24, color: "white" }}>Wallpaper not found</Text>
  </SafeAreaView>
);
