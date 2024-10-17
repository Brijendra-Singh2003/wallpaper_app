import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useWallpapers } from "@/hooks/useWallpapers";
import { LinearGradient } from "expo-linear-gradient";
import { Href, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function index() {
  const { wallpapers, Add } = useWallpapers();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={styles.container}
        data={wallpapers}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Image
              style={styles.header}
              src="https://plus.unsplash.com/premium_photo-1666611820906-4d2d07ec36c1"
            />
            <LinearGradient
              // Background Linear Gradient
              colors={["transparent", "#0007", "#000d"]}
              style={styles.headerGradient}
            >
              <Text style={styles.headerText}>Explore</Text>
            </LinearGradient>
          </View>
        }
        renderItem={(wallpaper) => (
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() =>
                router.push(("/view/" + wallpaper.item) as Href<string>)
              }
            >
              <Image
                src={`https://storage.vivago.ai/image/${wallpaper.item}.jpeg`}
                alt=""
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item}
        numColumns={2}
        onEndReached={Add}
        onEndReachedThreshold={1}
        removeClippedSubviews
        scrollEventThrottle={16}
        ListFooterComponent={
          <View style={styles.loadingContainer}>
            <Ionicons name="refresh" size={48} color="white" />
            <Text style={{ color: "white" }}>Loading...</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 400,
    width: "100%",
    overflow: "hidden",
  },
  container: {
    borderRadius: 8,
    flex: 1,
    height: "100%",
  },
  imageContainer: {
    flexGrow: 1,
    aspectRatio: 9 / 16,
    margin: 2,
  },
  image: {
    borderRadius: 8,
    height: "100%",
    width: "100%",
    backgroundColor: "#333",
  },
  headerContainer: {
    alignItems: "center",
    position: "relative",
  },
  headerGradient: {
    position: "absolute",
    bottom: 0,
    paddingVertical: 12,
    width: "100%",
  },
  headerText: {
    color: "white",
    fontSize: 44,
    width: "100%",
    textAlign: "center",
    fontWeight: "800",
  },
  loadingContainer: {
    width: "100%",
    height: 192,
    alignItems: "center",
    justifyContent: "center",
  },
});
