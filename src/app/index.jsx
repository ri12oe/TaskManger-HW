import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/manrope";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.5;

export default function HomeScreen() {
  const tasks = [
    {
      id: "1",
      title: "Finish N322 grading",
      category: "SCHOOL",
      dueDate: "Due Today",
      completed: false,
    },
    {
      id: "2",
      title: "Pick up groceries",
      category: "PERSONAL",
      dueDate: "Due Today",
      completed: false,
    },
    {
      id: "3",
      title: "Review lecture slides",
      category: "SCHOOL",
      dueDate: "Due Today",
      completed: true,
    },
    {
      id: "4",
      title: "Work on website",
      category: "WORK",
      dueDate: "Due Friday",
      completed: false,
    },
    {
      id: "5",
      title: "Team meeting prep",
      category: "WORK",
      dueDate: "Due Saturday",
      completed: false,
    },
  ];

  function getCatergoryStyle(catergory) {
    if (catergory === "SCHOOL") {
      return styles.schoolCatergory;
    }
    if (catergory === "PERSONAL") {
      return styles.personalCatergory;
    }
    if (catergory === "WORK") {
      return styles.workCatergory;
    }
    return styles.workCatergory;
  }

  function renderTask({ item }) {
    return (
      <View style={styles.taskCard}>
        <View
          style={[styles.checkBox, item.completed && styles.checkBoxCompleted]}
        >
          {item.completed && <Text style={styles.checkMarked}>✓</Text>}
        </View>

        <View style={styles.taskConent}>
          <View style={styles.taskMeta}>
            <Text style={[styles.category, getCatergoryStyle(item.category)]}>
              {item.category.toUpperCase()}
            </Text>

            <Text style={styles.dueDate}>Due: {item.dueDate}</Text>
          </View>
          <Text
            style={[
              styles.taskTitle,
              item.completed && styles.taskTitleCompleted,
            ]}
          >
            {item.title}
          </Text>
        </View>

        <Text style={styles.chevron}>›</Text>
      </View>
    );
  }

  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_800ExtraBold,
    Manrope_700Bold,
    Manrope_500Medium,
    Manrope_600SemiBold,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  function openSheet() {
    setModalVisible(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  function closeSheet() {
    Animated.timing(translateY, {
      toValue: SHEET_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  }

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
          <Pressable onPress={openSheet} style={styles.addButton}>
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

        <Text style={styles.sectionTitle}>MY TASKS</Text>

        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />

        <Modal
          visible={modalVisible}
          animationType="none"
          onRequestClose={closeSheet}
          transparent
        >
          <Pressable style={styles.backdrop} onPress={closeSheet} />
          <Animated.View
            style={[styles.sheet, { transform: [{ translateY }] }]}
          >
            {/* Add Task form goes here */}
            <Text style={styles.sheetTitle}>Add Task</Text>
            {/* TextInput, category pills, due date row, Add Task button, Cancel */}
          </Animated.View>
        </Modal>
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
    gap: 8,
    marginBottom: 24,
  },
  filterButton: {
    backgroundColor: "#fff",
    borderColor: "#E5E5EA",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  filterButtonActive: {
    backgroundColor: "#3478F6",
    borderColor: "#3478F6",
  },
  filterText: {
    fontSize: 14,
    fontFamily: "Manrope_500Medium",
    color: "#1C1C1E",
  },
  filterTextActive: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "Manrope_700Bold",
  },
  sectionTitle: {
    fontFamily: "Manrope_700bold",
    fontSize: 12,
    color: "#8E8E93",
    marginBottom: 10,
  },
  schoolCatergory: {
    backgroundColor: "#E8F0FE",
    color: "#3478F6",
    fontFamily: "Manrope_700bold",
  },
  workCatergory: {
    backgroundColor: "#FFF4E5",
    color: "#FF9500",
    fontFamily: "Manrope_700bold",
  },
  personalCatergory: {
    backgroundColor: "#EAF9EE",
    color: "#34C759",
    fontFamily: "Manrope_700bold",
  },
  taskCard: {
    minHeight: 72,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 10,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderColor: "#E5E5EA",
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkBoxCompleted: {
    backgroundColor: "#3478F6",
    borderColor: "#3478F6",
  },
  checkMarked: {
    color: "#fff",
    fontFamily: "Manrope_700bold",
  },
  taskConent: {
    flex: 1,
  },
  taskMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 5,
  },
  dueDate: {
    color: "#8E8E93",
    fontSize: 11,
    fontFamily: "Manrope_500Medium",
  },
  category: {
    fontSize: 11,
    fontFamily: "Manrope_700bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: "hidden",
  },
  taskTitle: {
    fontSize: 15,
    color: "#1C1C1E",
    fontFamily: "Manrope_600SemiBold",
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#8E8E93",
  },
  chevron: {
    color: "#AEAEB2",
    fontSize: 32,
    marginLeft: 13,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00000080",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: SHEET_HEIGHT,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  sheetTitle: {
    fontFamily: "Manrope_800ExtraBold",
    fontSize: 20,
    color: "#1C1C1E",
    marginBottom: 26,
    marginTop: 40,
  },
});
