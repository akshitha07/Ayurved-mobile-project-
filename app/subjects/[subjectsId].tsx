import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ListChecks } from "lucide-react-native";

const COLORS = {
  primary: "#FD9029",
  secondary: "#0077BA",
  darkText: "#545F71",
};

const TOPICS: Record<string, { id: string; name: string }[]> = {
  panchakarma: [
    { id: "vamana", name: "Vamana Karma" },
    { id: "virechana", name: "Virechana Therapy" },
    { id: "basti", name: "Basti Karma" },
    { id: "nasya", name: "Nasya Karma" },
    { id: "raktamokshana", name: "Raktamokshana" },
  ],
  dravyaguna: [
    { id: "dashamoola", name: "Dashamoola Group" },
    { id: "panchakola", name: "Panchakola Group" },
  ],
  kriyaSharira: [
    { id: "doshaTheory", name: "Doshas & Role" },
    { id: "srotas", name: "Srotas & Functions" },
    { id: "agni", name: "Agni & Metabolism" },
  ],
  kayachikitsa: [
    { id: "jwara", name: "Jwara (Fever)" },
    { id: "kasa", name: "Kasa (Cough)" },
  ],
};

export default function SubjectTopics() {
  const router = useRouter();
  const { subjectId } = useLocalSearchParams<{ subjectId: string }>();

  const topics = TOPICS[subjectId] || [];

  return (
    <View style={styles.container}>
      {/* Back to Subjects */}
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <ArrowLeft size={22} color={COLORS.darkText} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Select Topic</Text>

      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.topicCard}
            onPress={() => router.push(`/quiz/${item.id}`)}
            activeOpacity={0.85}
          >
            <ListChecks size={22} color={COLORS.secondary} />
            <Text style={styles.topicText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", padding: 16 },

  back: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backText: {
    marginLeft: 6,
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: "600",
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.darkText,
    marginBottom: 14,
  },

  topicCard: {
    padding: 18,
    backgroundColor: "#F6FBFF",
    borderWidth: 1,
    borderColor: "#D7E6F6",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },

  topicText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.darkText,
  },
});
