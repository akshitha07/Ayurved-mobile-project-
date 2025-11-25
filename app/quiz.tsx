import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ayurvedaQuiz, neetQuiz } from '@/data/quizData';
import { X } from 'lucide-react-native';

const MAX_FREE_QUESTIONS = 15;

export default function QuizScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showElaborate, setShowElaborate] = useState(false);

  const questions = category === 'ayurveda' ? ayurvedaQuiz : neetQuiz;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (questionsAnswered >= MAX_FREE_QUESTIONS) {
      Alert.alert(
        'Trial Version Over',
        'You have completed 15 free questions. Subscribe for full access to videos & quizzes.',
        [
          { text: 'Subscribe Now', onPress: () => router.replace('/subscription') }
        ]
      );
    }
  }, [questionsAnswered]);

  const handleAnswerSelect = (index: number) => {
    if (!showResult) {
      setSelectedAnswer(index);
      setShowResult(true);
      setQuestionsAnswered(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      Alert.alert(
        'Quiz Complete',
        `You have completed ${questionsAnswered} questions!`,
        [
          { text: 'OK', onPress: () => router.back() }
        ]
      );
    }
  };

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <X size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {category === 'ayurveda' ? 'Ayurveda Quiz' : 'NEET Quiz'}
        </Text>
        <Text style={styles.headerSubtitle}>
          Question {currentQuestionIndex + 1} of {Math.min(MAX_FREE_QUESTIONS, questions.length)}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentQuestionIndex + 1) / Math.min(MAX_FREE_QUESTIONS, questions.length)) * 100}%` }
            ]}
          />
        </View>

        <Text style={styles.question}>{currentQuestion.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === currentQuestion.correctAnswer;

            const optionStyle = [styles.option];
            if (showResult && isSelected && isCorrect) {
              optionStyle.push(styles.correctOption as any);
            } else if (showResult && isSelected && !isCorrect) {
              optionStyle.push(styles.incorrectOption as any);
            } else if (showResult && isCorrectAnswer) {
              optionStyle.push(styles.correctOption as any);
            }

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => handleAnswerSelect(index)}
                disabled={showResult}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {showResult && (
          <View style={styles.resultContainer}>
            <Text style={[styles.resultTitle, isCorrect ? styles.correctText : styles.incorrectText]}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </Text>

            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>Explanation:</Text>
              <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
            </View>

            <TouchableOpacity
              style={styles.elaborateButton}
              onPress={() => setShowElaborate(true)}
            >
              <Text style={styles.elaborateButtonText}>Show Elaborate Details</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={showElaborate}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowElaborate(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detailed Explanation</Text>
              <TouchableOpacity onPress={() => setShowElaborate(false)}>
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalText}>{currentQuestion.elaborateDetails}</Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowElaborate(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  closeButton: {
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#ddd',
    marginBottom: 24,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    padding: 16,
    lineHeight: 28,
  },
  optionsContainer: {
    padding: 16,
  },
  option: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  correctOption: {
    borderColor: '#34C759',
    backgroundColor: '#E8F5E9',
  },
  incorrectOption: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFEBEE',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  resultContainer: {
    padding: 16,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  correctText: {
    color: '#34C759',
  },
  incorrectText: {
    color: '#FF3B30',
  },
  explanationBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  elaborateButton: {
    backgroundColor: '#5856D6',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  elaborateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  modalBody: {
    padding: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  modalCloseButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    margin: 20,
    marginTop: 0,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
