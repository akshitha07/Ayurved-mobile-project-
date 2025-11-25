import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function CourseScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Courses</Text>

      <View style={styles.card}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1581091870622-81f18f7e6f5c" }}
          style={styles.courseImage}
        />
        <Text style={styles.courseTitle}>Introduction to Ayurveda</Text>
      </View>

      <View style={styles.card}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1581092334607-3c52bd30f692" }}
          style={styles.courseImage}
        />
        <Text style={styles.courseTitle}>Dosha Theory & Body Constitution</Text>
      </View>

      <View style={styles.card}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1581091012184-9deda96b2c1a" }}
          style={styles.courseImage}
        />
        <Text style={styles.courseTitle}>NEET Physics – Mechanics Fundamentals</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },

  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
  },

  courseImage: {
    width: '100%',
    height: 160,
  },

  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 12,
  },
});
