import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Manrope_400Regular,
  Manrope_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/manrope";

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Tasks</Text>
            <Text style={styles.subtitle}>4 tasks remaining</Text>
          </View>
          <Pressable style={styles.addButton}>
            <Text style={styles.addButtontext}>+</Text>
          </Pressable>
        </View>

        <View style={styles.filter}>
        <Pressable style={[styles.filterButton, styles.filterButtonActive]}>
          <Text style={styles.filterTextActive}>All</Text>
        </Pressable>
        <Pressable style={styles.filterButton}>
          <Text style={styles.filterText}>Active</Text>
        </Pressable>
        <Pressable style={styles.filterButton}>
          <Text style={styles.filterText}>Completed</Text>
        </Pressable>
        </View>
      </View>

      

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    color: "black",
    padding: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Manrope_800ExtraBold",
    color: "#1C1C1E",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    color: "#8E8E93",
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: "#3478F6",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtontext: {
    color: "white",
    fontSize: 32,
    marginTop: -6,
    borderRadius: 2,
  },
  filter: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 24,
  },
  filterButton: {
  },
  filterButtonActive: {

  },
  filterText: {

  },
  filterTextActive: {

  },
});
