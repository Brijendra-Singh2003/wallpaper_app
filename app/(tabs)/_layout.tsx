import { Href, Link, Slot, usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function RootLayout() {
  const path = usePathname();

  return (
    <View
      style={{
        position: "relative",
        height: "100%",
        backgroundColor: "#000",
        flex: 1,
      }}
    >
      <Slot />
      <View style={styles.tab}>
        <Link href="/foryou" style={styles.icon}>
          <Ionicons
            name={path === "/foryou" ? "home-sharp" : "home-outline"}
            size={24}
          />
        </Link>
        <Link href={"/" as Href<string>} style={styles.icon}>
          <Ionicons
            name={path === "/" ? "compass-sharp" : "compass-outline"}
            size={24}
          />
        </Link>
        <Link href={"/account" as Href<string>} style={styles.icon}>
          <Ionicons
            name={path === "/account" ? "person-sharp" : "person-outline"}
            size={24}
          />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: "#0008",
    paddingVertical: 2,
    paddingHorizontal: 36,
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 16,
    // borderTopWidth: 1,
  },
  icon: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    color: "#fff",
  },
});
