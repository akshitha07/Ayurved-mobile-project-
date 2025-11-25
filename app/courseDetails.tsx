// app/course-details.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function CourseDetails() {
  const router = useRouter();
  const { course } = useLocalSearchParams();
  const courseData = course ? JSON.parse(course as string) : null;

  // Enroll modal state
  const [showEnroll, setShowEnroll] = useState(false);

  if (!courseData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading course details...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header with back button and course image */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Image 
            source={courseData.image} 
            style={styles.courseImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageOverlay}
          />
        </View>

        {/* Course content */}
        <View style={styles.content}>
          <View style={styles.courseHeader}>
            <Text style={styles.title}>{courseData.title}</Text>
            <Text style={styles.instructor}>By {courseData.instructor}</Text>
            
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={16} color="#545F71" />
                <Text style={styles.metaText}>{courseData.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="document-text-outline" size={16} color="#545F71" />
                <Text style={styles.metaText}>{courseData.lessons?.length || 0} Lessons</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="star" size={16} color="#FDCC0D" />
                <Text style={[styles.metaText, { color: '#1a1a1a' }]}>4.7 (1,234)</Text>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>${courseData.price}</Text>
              {courseData.originalPrice && (
                <Text style={styles.originalPrice}>${courseData.originalPrice}</Text>
              )}
            </View>
          </View>

          {/* Course description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About This Course</Text>
            <Text style={styles.description}>
              {courseData.description || 'No description available.'}
            </Text>
          </View>

          {/* Lessons list */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Course Content</Text>
            {courseData.lessons?.map((lesson: any, index: number) => (
              <View key={index} style={styles.lessonItem}>
                <View style={styles.lessonIcon}>
                  <Ionicons name="play-circle" size={20} color="#0077BA" />
                </View>
                <View style={styles.lessonContent}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Enroll button */}
          <TouchableOpacity style={styles.enrollButton} onPress={() => setShowEnroll(true)}>
            <Text style={styles.enrollButtonText}>Enroll Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Enroll Modal - bottom sheet style */}
      <EnrollBottomSheet
        visible={showEnroll}
        onClose={() => setShowEnroll(false)}
        courseTitle={courseData.title}
        price={courseData.price}
        onEnrollSuccess={() => {
          setShowEnroll(false);
          Alert.alert('Success', `You are enrolled in "${courseData.title}"`);
          // optionally: navigate to my-courses or mark enrolled
        }}
      />
    </>
  );
}

/* ---------------------------
   Enroll Bottom Sheet Component
   --------------------------- */
function EnrollBottomSheet({
  visible,
  onClose,
  courseTitle,
  price,
  onEnrollSuccess,
}: {
  visible: boolean;
  onClose: () => void;
  courseTitle: string;
  price: string;
  onEnrollSuccess?: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coupon, setCoupon] = useState('');
  const [processing, setProcessing] = useState(false);

  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }).start();
    } else {
      Animated.timing(slideAnim, { toValue: 300, duration: 180, useNativeDriver: true }).start();
    }
  }, [visible]);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'FREE50') {
      Alert.alert('Coupon applied', '50% discount applied (demo)');
    } else if (!coupon.trim()) {
      Alert.alert('No coupon', 'Enter a coupon code');
    } else {
      Alert.alert('Invalid coupon', 'Try FREE50 for demo');
    }
  };

  const handlePayment = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Missing info', 'Please enter your name and email');
      return;
    }
    setProcessing(true);

    // Simulate payment/enrollment (replace with real integration)
    setTimeout(() => {
      setProcessing(false);
      onEnrollSuccess?.();
      setName('');
      setEmail('');
      setCoupon('');
    }, 1200);
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={modalStyles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View style={[modalStyles.sheet, { transform: [{ translateY: slideAnim }] }]}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={modalStyles.handle} />

          <Text style={modalStyles.title}>Secure your spot</Text>
          <Text style={modalStyles.courseTitle} numberOfLines={2}>{courseTitle}</Text>

          <View style={modalStyles.row}>
            <Text style={modalStyles.label}>Price</Text>
            <Text style={modalStyles.price}>${price}</Text>
          </View>

          <TextInput
            placeholder="Full name"
            placeholderTextColor="#9aa3b3"
            value={name}
            onChangeText={setName}
            style={modalStyles.input}
            autoCapitalize="words"
          />
          <TextInput
            placeholder="Email address"
            placeholderTextColor="#9aa3b3"
            value={email}
            onChangeText={setEmail}
            style={modalStyles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={modalStyles.couponRow}>
            <TextInput
              placeholder="Coupon code"
              placeholderTextColor="#9aa3b3"
              value={coupon}
              onChangeText={setCoupon}
              style={[modalStyles.input, { flex: 1, marginRight: 8 }]}
            />
            <TouchableOpacity style={modalStyles.couponBtn} onPress={applyCoupon}>
              <Text style={modalStyles.couponBtnText}>Apply</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[modalStyles.enrollBtn, processing && { opacity: 0.8 }]}
            onPress={handlePayment}
            disabled={processing}
          >
            <Text style={modalStyles.enrollBtnText}>
              {processing ? 'Processing...' : `Pay & Enroll ($${price})`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={modalStyles.cancelBtn} onPress={onClose}>
            <Text style={modalStyles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
}

/* ---------------------------
   Styles (original + modal)
   --------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  courseImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  content: {
    padding: 16,
  },
  courseHeader: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  instructor: {
    fontSize: 16,
    color: '#0077BA',
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 4,
    color: '#545F71',
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 16,
    color: '#9CB0CF',
    textDecorationLine: 'line-through',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#545F71',
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f4f8',
  },
  lessonIcon: {
    marginRight: 12,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 15,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  lessonDuration: {
    fontSize: 13,
    color: '#9CB0CF',
  },
  enrollButton: {
    backgroundColor: '#FD9029',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

/* Modal styles */
const modalStyles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 18,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 10,
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#E6E9EF',
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: { color: '#545F71', fontSize: 13, fontWeight: '600' },
  courseTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  label: { color: '#8891A6', fontWeight: '600' },
  price: { color: '#1447E6', fontWeight: '800' },
  input: {
    backgroundColor: '#F4F6F8',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
    color: '#333',
  },
  couponRow: { flexDirection: 'row', alignItems: 'center' },
  couponBtn: {
    backgroundColor: '#0077BA',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
  },
  couponBtnText: { color: '#fff', fontWeight: '700' },
  enrollBtn: {
    backgroundColor: '#FD9029',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  enrollBtnText: { color: '#fff', fontWeight: '800' },
  cancelBtn: { marginTop: 10, alignItems: 'center' },
  cancelText: { color: '#545F71', fontWeight: '600' },
});
