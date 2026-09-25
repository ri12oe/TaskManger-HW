import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/manrope";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.85;

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
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

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
      toValue: SCREEN_HEIGHT,
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
            <View style={styles.grabber}>
              <Pressable style={styles.Innergrabber} />
            </View>

            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Add Task</Text>
              <Pressable style={styles.closeButton} onPress={closeSheet}>
                <MaterialCommunityIcons
                  name="close-circle-outline"
                  size={24}
                  color="#1C1C1E"
                />
              </Pressable>
            </View>
            <ScrollView
              style={styles.sheetContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.taskForm}>
                <Text style={styles.formTitle}>Task Title</Text>
                <TextInput
                  style={styles.taskInput}
                  placeholder="Enter task title..."
                  placeholderTextColor="#6b7280"
                />
              </View>

              <View style={styles.categoryForm}>
                <Text style={styles.formTitle}>Category</Text>
                <View style={styles.categoryFilter}>
                  <Pressable
                    style={[styles.filterButton2, styles.filterButtonActive]}
                  >
                    <Text style={styles.filterTextActive2}>School</Text>
                  </Pressable>
                  <Pressable style={styles.filterButton2}>
                    <Text style={styles.filterText2}>Personal</Text>
                  </Pressable>
                  <Pressable style={styles.filterButton2}>
                    <Text style={styles.filterText2}>Work</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.dueDateForm}>
                <Text style={styles.formTitle}>Due Date</Text>
                <Pressable style={styles.dateInputRow}>
                  <View style={styles.dateInputLeft}>
                    <Feather name="calendar" size={24} color="#3478F6" />
                    <TextInput
                      style={styles.dateInputText}
                      placeholder="Today, October 24"
                      placeholderTextColor="#1C1C1E"
                      editable={false}
                    />
                  </View>
                  <Entypo name="chevron-down" size={24} color="#8E8E93" />
                </Pressable>
              </View>
            </ScrollView>
            <View style={styles.addTaskSection}>
              <Pressable style={styles.addTaskButton}>
                <Text style={styles.addTaskText}>Add Task</Text>
              </Pressable>
              <Pressable onPress={closeSheet}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            </View>
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
  categoryFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterButton: {
    backgroundColor: "#fff",
    borderColor: "#E5E5EA",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  filterButton2: {
    backgroundColor: "#fff",
    borderColor: "#E5E5EA",
    borderRadius: 20,
    paddingHorizontal: 26,
    paddingVertical: 10,
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
  filterText2: {
    fontSize: 14,
    fontFamily: "Manrope_500Medium",
    color: "#1C1C1E",
    textAlign: "center",
  },
  filterTextActive2: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "Manrope_700Bold",
    textAlign: "center",
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
    maxHeight: SHEET_MAX_HEIGHT,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 8,
    paddingTop: 12,
    paddingBottom: 24,
    flexDirection: "column",
  },
  sheetTitle: {
    fontFamily: "Manrope_800ExtraBold",
    fontSize: 20,
    color: "#1C1C1E",
  },
  grabber: {
    justifyContent: "center",
    alignItems: "center",
  },
  Innergrabber: {
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#E5E5EA",
    marginBottom: 24,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 26,
  },
  closeButton: {
    width: 32,
    height: 32,
    backgroundColor: "#F5F5F7",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  sheetContent: {
    marginBottom: 24,
  },
  taskForm: {
    marginBottom: 20,
  },
  formTitle: {
    textTransform: "uppercase",
    color: "#8E8E93",
    fontFamily: "Manrope_700bold",
    fontSize: 12,
    marginBottom: 8,
  },
  taskInput: {
    width: "100%",
    maxWidth: 350,
    borderColor: "#E5E5EA",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    fontFamily: "Manrope_500Medium",
    fontSize: 15,
  },
  // dateInput: {
  //   width: "100%",
  //   maxWidth: 350,
  //   borderColor: "#E5E5EA",
  //   borderWidth: 1,
  //   borderRadius: 12,
  //   paddingHorizontal: 16,
  //   paddingVertical: 14,
  //   backgroundColor: "#FFFFFF",
  //   fontFamily: "Manrope_500Medium",
  //   fontSize: 15,
  // },
  categoryForm: {
    marginBottom: 20,
  },
  dateInputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderColor: "#E5E5EA",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dateInputLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dateInputText: {
    fontSize: 15,
    fontFamily: "Manrope_600SemiBold",
    color: "#1C1C1E",
  },
  addTaskSection: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
  },
  addTaskButton: {
    backgroundColor: "#3478F6",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  addTaskText: {
    color: "#FFFFFF",
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
  },
  cancelText: {
    color: "#8E8E93",
    fontFamily: "Manrope_600SemiBold",
    fontSize: 15,
  },
});
