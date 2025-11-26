import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
const { width } = Dimensions.get("window");
const CARD_WIDTH = Math.round((width - 48) / 2); // two columns, 16px padding + 16 gap

// sample data (replace with your actual courses)
const courses = [
  {
    id: '1',
    title: 'Introduction to Ayurveda',
    image: require('@/assets/images/Introduction to Ayurveda.jpg'),
    instructor: 'Dr. Smith',
    duration: '2h 30m',
    price: '49.99',
    description: 'Learn the fundamentals of Ayurveda, its history, and basic principles.',
    lessons: [
      { title: 'Introduction to Ayurveda', duration: '15:30' },
      { title: 'Five Elements Theory', duration: '20:15' },
      { title: 'Three Doshas', duration: '25:45' },
    ]
  },
  {
    id: "2",
    title: "Introduction to Ayurveda",
    image: require("@/assets/images/Dosha Theory & Body Constitution.png"),
    instructor: "Dr. Smith",
    duration: "2h 30m",
    price: "49.99",
    description: 'Learn the fundamentals of Ayurveda, its history, and basic principles.',
    lessons: [
      { title: 'Introduction to Ayurveda', duration: '15:30' },
      { title: 'Five Elements Theory', duration: '20:15' },
      { title: 'Three Doshas', duration: '25:45' },
    ]
  },
  {
    id: "3",
    title: "Introduction to Ayurveda",
    image: require("@/assets/images/ayurvedic-herbs.jpg"),
    instructor: "Dr. Smith",
    duration: "2h 30m",
    price: "49.99",
    description: 'Learn the fundamentals of Ayurveda, its history, and basic principles.',
    lessons: [
      { title: 'Introduction to Ayurveda', duration: '15:30' },
      { title: 'Five Elements Theory', duration: '20:15' },
      { title: 'Three Doshas', duration: '25:45' },
    ]
  },
  {
    id: "4",
    title: "Introduction to Ayurveda",
    image: require("@/assets/images/Introduction to Ayurveda.jpg"),
    instructor: "Dr. Smith",
    duration: "2h 30m",
    price: "49.99",
    description: 'Learn the fundamentals of Ayurveda, its history, and basic principles.',
    lessons: [
      { title: 'Introduction to Ayurveda', duration: '15:30' },
      { title: 'Five Elements Theory', duration: '20:15' },
      { title: 'Three Doshas', duration: '25:45' },
    ]
  },
  {
    id: "5",
    title: "Introduction to Ayurveda",
    image: require("@/assets/images/yoga-meditation.jpg"),
    instructor: "Dr. Smith",
    duration: "2h 30m",
    price: "49.99",
    description: 'Learn the fundamentals of Ayurveda, its history, and basic principles.',
    lessons: [
      { title: 'Introduction to Ayurveda', duration: '15:30' },
      { title: 'Five Elements Theory', duration: '20:15' },
      { title: 'Three Doshas', duration: '25:45' },
    ]
  },
];

export default function CourseExplore() {
  const router = useRouter();

  const onPressCourse = (course: any) => {
  router.push({
    pathname: '/courseDetails',
    params: { 
      course: JSON.stringify(course) 
    }
  });
};
  const renderCourse = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} onPress={() => onPressCourse(item)} activeOpacity={0.85}>
      <View style={styles.thumbWrap}>
        <Image source={item.image} style={styles.thumb} />
        {/* Gradient overlay to match modern look */}
        <LinearGradient
          colors={["transparent", "rgba(20,71,230,0.18)"]}
          style={styles.thumbGradient}
        />
        {/* Price tag */}
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>${item.price}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.instructor}>{item.instructor}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.duration}>{item.duration}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Beginner</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const keyExtractor = (i: any) => i.id;

  return (
    <View style={styles.screen}>
      {/* Header / Search */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore courses</Text>
        <TextInput
          placeholder="Search courses, topics, instructors..."
          placeholderTextColor="#8891A6"
          style={styles.search}
        />
      </View>

      {/* Category chips */}
      <View style={styles.chipsRow}>
        {["All", "Ayurveda", "Yoga", "Herbs", "NEET"].map((c) => (
          <TouchableOpacity key={c} style={[styles.chip, c === "All" && styles.chipActive]}>
            <Text style={[styles.chipText, c === "All" && styles.chipTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Grid */}
      <FlatList
        contentContainerStyle={styles.listContent}
        data={courses}
        renderItem={renderCourse}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.column}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f8fafc" },
  header: { padding: 16, paddingTop: 24 },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FD9029", // primary
    marginBottom: 12,
  },
  search: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    borderColor: "#eef3f8",
    fontSize: 14,
    color: "#1a1a1a",
  },
  chipsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "transparent",
    marginRight: 8,
    shadowColor: "#9CB0CF",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  chipActive: {
    backgroundColor: "#0077BA", // secondary
  },
  chipText: {
    color: "#545F71",
    fontWeight: "600",
    fontSize: 13,
  },
  chipTextActive: {
    color: "#fff",
  },

  listContent: { paddingHorizontal: 16, paddingBottom: 40, paddingTop: 8 },
  column: { justifyContent: "space-between", marginBottom: 16 },

  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#9CB0CF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
  },
  thumbWrap: { width: "100%", height: 130, position: "relative" },
  thumb: { width: "100%", height: "100%" },
  thumbGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 54,
  },
  priceTag: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "#1447E6", // blue gradient color
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
  },
  priceText: { color: "#fff", fontWeight: "700" },

  cardBody: { padding: 12 },
  title: { fontSize: 15, fontWeight: "700", color: "#545F71", marginBottom: 6 },
  instructor: { fontSize: 13, color: "#0077BA", fontWeight: "600", marginBottom: 10 },

  metaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  duration: { color: "#9CB0CF", fontSize: 13, fontWeight: "600" },
  badge: { backgroundColor: "#FD9029", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: "#fff", fontWeight: "700", fontSize: 12 },
});
