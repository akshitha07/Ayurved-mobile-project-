import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { BookOpen } from "lucide-react-native";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#FD9029",
  secondary: "#0077BA",
  dark: "#545F71",
};

const SUBJECTS = [
  {
    id: "panchakarma",
    name: "Panchakarma",
    topics: 5,
  },
  {
    id: "dravyaguna",
    name: "Dravyaguna",
    topics: 6,
  },
  {
    id: "kriyaSharira",
    name: "Kriya Sharira",
    topics: 4,
  },
];

export default function Subjects() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subjects</Text>

      <FlatList
        data={SUBJECTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push(`/subjects/${item.id}`)}
          >
            <BookOpen size={32} color={COLORS.secondary} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSub}>{item.topics} Topics</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.dark,
    marginVertical: 10,
  },
  card: {
    width: width - 32,
    padding: 20,
    backgroundColor: "#F6FBFF",
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D7E6F6",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    color: COLORS.dark,
  },
  cardSub: {
    fontSize: 13,
    color: "#7F8895",
    marginTop: 6,
  },
});
