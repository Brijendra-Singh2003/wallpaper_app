import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useWallpapers } from "@/hooks/useWallpapers";
import { LinearGradient } from "expo-linear-gradient";
import { Href, router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function index() {
  const { wallpapers, Add } = useWallpapers();

  return (
    <ParallaxScrollView
      style={{ marginTop: -8, backgroundColor: "black", paddingBottom: 56 }}
      headerImage={
        <Image
          style={{ height: "100%", width: "100%", backgroundColor: "#333" }}
          src="https://plus.unsplash.com/premium_photo-1666611820906-4d2d07ec36c1"
        />
      }
      headerBackgroundColor={{ dark: "black", light: "black" }}
    >
      <View style={styles.headerContainer}>
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "#0007", "#000d"]}
          style={styles.headerGradient}
        >
          <Text style={styles.headerText}>Explore</Text>
        </LinearGradient>
      </View>
      <FlatList
        style={styles.container}
        data={wallpapers}
        renderItem={(wallpaper) => (
          <TouchableOpacity
            onPress={() =>
              router.push(("/view/" + wallpaper.item.id) as Href<string>)
            }
            style={styles.imageContainer}
          >
            <Image src={wallpaper.item.uri} alt="" style={styles.image} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
      />

      <TouchableOpacity style={styles.loadingContainer} onPress={Add}>
        <Ionicons name="refresh" size={48} color="white" />
        <Text style={{color: "white"}}>Load More</Text>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: "#000",
    padding: 2,
  },
  imageContainer: {
    borderRadius: 8,
    backgroundColor: "#333",
    flexGrow: 1,
    margin: 2,
    aspectRatio: 9 / 16,
  },
  image: {
    borderRadius: 8,
    height: "100%",
    width: "100%",
  },
  headerContainer: {
    flex: 1,
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
