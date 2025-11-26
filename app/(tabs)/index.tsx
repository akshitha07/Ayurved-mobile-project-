// FULL WORKING AYURVEDA + MARROW HOME PAGE
// WITH STUDY MATERIAL SECTION (RENAMED FROM LIBRARY)

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Search, Bell, Download } from "lucide-react-native";   // Added download icon

const { width, height } = Dimensions.get("window");

// Theme Colors
const COLORS = {
  primary: "#FD9029",
  secondary: "#0077BA",
  gradient: "#1447E6",
  darkText: "#545F71",
  lightBlue: "#9CB0CF",
};

export default function HomeScreen() {
  const courses = [
    {
      id: "c1",
      title: "Ayurveda Fundamentals",
      subtitle: "Intro • History • Principles",
      lessonsCompleted: 6,
      lessonsTotal: 10,
      progress: 0.6,
      thumb:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=512&q=60",
    },
    {
      id: "c2",
      title: "Doshas & Body Constitution",
      subtitle: "Vata • Pitta • Kapha",
      lessonsCompleted: 2,
      lessonsTotal: 8,
      progress: 0.25,
      thumb:
        "https://images.unsplash.com/photo-1549893078-7b1fd2a88d6f?auto=format&fit=crop&w=512&q=60",
    },
  ];

  const extraLessons = [
    "Nidana (Diagnosis) Basics",
    "Dinacharya & Ritucharya",
    "Herbal Pharmacology",
    "Rasashastra Introduction",
  ];

  const categories = [
    "All",
    "Fundamentals",
    "Doshas",
    "Herbs",
    "Panchakarma",
    "Chikitsa",
    "Diagnostics",
  ];

  // STUDY MATERIAL PREVIEW (ex-Library)
  const studyMaterial = [
    {
      id: "m1",
      title: "Charaka Samhita Notes (PDF)",
      cover:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0ea?auto=format&fit=crop&w=512&q=60",
    },
    {
      id: "m2",
      title: "Dravyaguna Herb List",
      cover:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=512&q=60",
    },
    {
      id: "m3",
      title: "Panchakarma Protocol Sheets",
      cover:
        "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b6?auto=format&fit=crop&w=512&q=60",
    },
  ];

  // UI states
  const [showAllLessons, setShowAllLessons] = useState(false);
  const [showAllMaterial, setShowAllMaterial] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.headerRow}>
        <View style={styles.leftHeader}>
          <Image
            source={{
              uri:
                "https://images.unsplash.com/photo-1545996124-5f6f47b557b6?auto=format&fit=crop&w=64&q=60",
            }}
            style={styles.avatar}
          />

          <View>
            <Text style={styles.greeting}>Hi, Jenifer</Text>
            <Text style={styles.subGreeting}>Welcome back — continue learning</Text>
          </View>
        </View>

        <View style={styles.headerIcons}>
          <Pressable style={styles.iconBtn}>
            <Search size={20} color={COLORS.darkText} />
          </Pressable>

          <Pressable style={styles.iconBtn}>
            <Bell size={20} color={COLORS.darkText} />
          </Pressable>
        </View>
      </View>

      {/* CONTINUE LESSON CARD */}
      <LinearGradient
        colors={[COLORS.gradient, COLORS.secondary]}
        style={styles.continueCard}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.continueTitle}>Continue your Ayurvedic journey</Text>
          <Text style={styles.continueSmall}>Panchakarma — 1 video remaining</Text>

          <TouchableOpacity style={styles.continueBtn}>
            <Text style={styles.continueBtnText}>Continue Lesson</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={{
            uri:
              "https://images.unsplash.com/photo-1543353071-087092ec393f?auto=format&fit=crop&w=512&q=60",
          }}
          style={styles.illustration}
        />
      </LinearGradient>

      {/* LESSONS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Lessons</Text>

        <TouchableOpacity onPress={() => setShowAllLessons(!showAllLessons)}>
          <Text style={styles.sectionLink}>
            {showAllLessons ? "Hide" : "See all"}
          </Text>
        </TouchableOpacity>
      </View>

      {courses.map((c, index) => (
        <View key={`${c.id}_${index}`} style={styles.lessonCard}>
          <Image source={{ uri: c.thumb }} style={styles.lessonThumb} />

          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>{c.title}</Text>
            <Text style={styles.lessonSub}>
              {c.subtitle} • {c.lessonsCompleted}/{c.lessonsTotal}
            </Text>

            <View style={styles.progressBg}>
              <View
                style={[styles.progressFill, { width: `${c.progress * 100}%` }]}
              />
            </View>
          </View>
        </View>
      ))}

      {showAllLessons &&
        extraLessons.map((item, i) => (
          <View key={`extra_${i}`} style={styles.responsiveCard}>
            <Text style={styles.lessonText}>{item}</Text>
          </View>
        ))}

      {/* CATEGORIES */}
      <View style={[styles.sectionHeader, { marginTop: 6 }]}>
        <Text style={styles.sectionTitle}>Categories</Text>

        <TouchableOpacity onPress={() => setCategoryOpen(!categoryOpen)}>
          <Text style={styles.sectionLink}>{selectedCategory} ▾</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((c, i) => {
          const active = selectedCategory === c;
          return (
            <TouchableOpacity
              key={`cat_${i}`}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setSelectedCategory(c)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {c}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {categoryOpen && (
        <View style={styles.dropdown}>
          {categories.map((c, index) => (
            <TouchableOpacity
              key={`drop_${index}`}
              style={styles.dropdownItem}
              onPress={() => {
                setSelectedCategory(c);
                setCategoryOpen(false);
              }}
            >
              <Text style={styles.dropdownText}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* STUDY MATERIAL (NEW, REPLACED LIBRARY) */}
      <View style={[styles.sectionHeader, { marginTop: 12 }]}>
        <Text style={styles.sectionTitle}>Study Material</Text>

        <TouchableOpacity onPress={() => setShowAllMaterial(!showAllMaterial)}>
          <Text style={styles.sectionLink}>
            {showAllMaterial ? "Hide" : "All"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {(showAllMaterial ? [...studyMaterial, ...studyMaterial] : studyMaterial).map(
          (m, index) => (
            <View key={`${m.id}_${index}`} style={styles.materialCard}>
              <Image source={{ uri: m.cover }} style={styles.materialCover} />

              <View style={styles.materialFooter}>
                <Text numberOfLines={2} style={styles.materialTitle}>
                  {m.title}
                </Text>

                {/* Download Icon (You can enable functionality later) */}
                <Pressable>
                  <Download size={20} color={COLORS.secondary} />
                </Pressable>
              </View>
            </View>
          )
        )}
      </ScrollView>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: height * 0.035,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  leftHeader: { flexDirection: "row", alignItems: "center" },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },

  greeting: { fontSize: 20, fontWeight: "700", color: COLORS.darkText },
  subGreeting: { fontSize: 12, color: "#8A94A4" },

  headerIcons: { flexDirection: "row", gap: 12 },
  iconBtn: { padding: 8 },

  continueCard: {
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  continueTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },
  continueSmall: { color: "#E8F2FF", marginBottom: 10 },

  continueBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 26,
  },
  continueBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },

  illustration: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: 12,
    marginLeft: 10,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: COLORS.darkText },
  sectionLink: { fontSize: 14, color: COLORS.secondary, fontWeight: "600" },

  lessonCard: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  lessonThumb: {
    width: 64,
    height: 64,
    borderRadius: 14,
    marginRight: 12,
  },
  lessonInfo: { flex: 1 },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.darkText,
    marginBottom: 4,
  },
  lessonSub: { color: "#8A94A4", marginBottom: 8 },

  progressBg: {
    height: 8,
    backgroundColor: "#E6EEF9",
    borderRadius: 8,
  },
  progressFill: {
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },

  responsiveCard: {
    backgroundColor: "#F6FBFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  lessonText: { fontWeight: "700", color: COLORS.darkText },

  chip: {
    borderWidth: 1,
    borderColor: "#D7E6F6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { color: COLORS.darkText, fontWeight: "600" },
  chipTextActive: { color: "#fff" },

  dropdown: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  dropdownItem: { paddingVertical: 10 },
  dropdownText: { color: COLORS.darkText },

  /* STUDY MATERIAL DESIGN */
  materialCard: {
    width: width * 0.44,
    height: width * 0.62,
    marginRight: 12,
    borderRadius: 14,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 3,
  },
  materialCover: {
    width: "100%",
    height: "75%",
  },
  materialFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  materialTitle: {
    width: "80%",
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.darkText,
  },
});
