import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Video } from 'expo-av';
import { useState } from 'react';
import { ayurvedaCourses, neetCourses } from '@/data/coursesData';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  const CourseCard = ({ course }: { course: any }) => {
    const [showVideo, setShowVideo] = useState(false);

    return (
      <View style={styles.card}>
        {!showVideo ? (
          <>
            <Image source={{ uri: course.thumbnail }} style={styles.thumbnail} />
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => setShowVideo(true)}
            >
              <Text style={styles.playButtonText}>▶</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Video
            source={{ uri: course.videoUrl }}
            style={styles.video}
            useNativeControls
            shouldPlay
            isLooping
          />
        )}
        <Text style={styles.cardTitle}>{course.title}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Learning Portal</Text>
        <Text style={styles.headerSubtitle}>Free trial: 15 quiz questions</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ayurveda Courses</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
          {ayurvedaCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NEET Entrance Exam Courses</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
          {neetCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.quizSection}>
        <Text style={styles.sectionTitle}>Start Your Quiz</Text>
        <TouchableOpacity
          style={[styles.quizButton, styles.ayurvedaButton]}
          onPress={() => router.push('/quiz?category=ayurveda')}
        >
          <Text style={styles.quizButtonText}>Start Ayurveda Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quizButton, styles.neetButton]}
          onPress={() => router.push('/quiz?category=neet')}
        >
          <Text style={styles.quizButtonText}>Start NEET Quiz</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 24,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    opacity: 0.9,
  },
  section: {
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginLeft: 16,
    marginBottom: 12,
  },
  cardsContainer: {
    paddingLeft: 16,
  },
  card: {
    width: width * 0.7,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: 160,
    backgroundColor: '#ddd',
  },
  video: {
    width: '100%',
    height: 160,
  },
  playButton: {
    position: 'absolute',
    top: 60,
    left: width * 0.7 / 2 - 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    padding: 12,
  },
  quizSection: {
    padding: 16,
    marginTop: 8,
    marginBottom: 40,
  },
  quizButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  ayurvedaButton: {
    backgroundColor: '#34C759',
  },
  neetButton: {
    backgroundColor: '#FF9500',
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
