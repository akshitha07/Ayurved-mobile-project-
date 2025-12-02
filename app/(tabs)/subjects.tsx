import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { ArrowLeft, HelpCircle } from "lucide-react-native";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#FD9029",   // orange
  secondary: "#0077BA", // blue
  gradient: "#1447E6",  // dark blue
  darkText: "#545F71",
  lightBlue: "#9CB0CF",
};

type Question = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

const QUIZ_DATA: Question[] = [
  {
    id: "q1",
    question: "How many primary Doshas are described in Ayurveda?",
    options: ["Two", "Three", "Four", "Five"],
    correctIndex: 1,
    explanation:
      "Ayurveda describes three primary Doshas: Vata, Pitta and Kapha. Balance of these maintains health.",
  },
  {
    id: "q2",
    question: "Which Dosha is primarily associated with heat and metabolism?",
    options: ["Vata", "Pitta", "Kapha", "All of the above"],
    correctIndex: 1,
    explanation:
      "Pitta Dosha governs metabolism, digestion and body temperature, hence associated with heat.",
  },
  {
    id: "q3",
    question: "Which classical text is considered one of the main Samhitas of Ayurveda?",
    options: [
      "Charaka Samhita",
      "Bhagavad Gita",
      "Yoga Sutra",
      "Ashtanga Vinyasa",
    ],
    correctIndex: 0,
    explanation:
      "Charaka Samhita is one of the main classical texts of Ayurveda along with Sushruta and Ashtanga Hridaya.",
  },
  {
    id: "q4",
    question: "‘Panchakarma’ in Ayurveda primarily refers to:",
    options: [
      "Five types of food",
      "Five cleansing procedures",
      "Five types of yoga",
      "Five types of herbs",
    ],
    correctIndex: 1,
    explanation:
      "Panchakarma refers to five main bio-cleansing procedures used to eliminate toxins and restore balance.",
  },
];

export default function QuizScreen() {
  const [current, setCurrent] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const question = QUIZ_DATA[current];
  const totalQuestions = QUIZ_DATA.length;
  const progress = (current + 1) / totalQuestions;

  const handleOptionPress = (index: number) => {
    if (isSubmitted) return; // lock after submit
    setSelectedIndex(index);
  };

  const handleSubmit = () => {
    if (selectedIndex === null) return; // do nothing if not chosen

    if (!isSubmitted) {
      // first submit: check answer
      if (selectedIndex === question.correctIndex) {
        setScore((prev) => prev + 1);
      }
      setIsSubmitted(true);
    }
  };

  const handleNext = () => {
    if (current < totalQuestions - 1) {
      setCurrent((prev) => prev + 1);
      setSelectedIndex(null);
      setIsSubmitted(false);
    } else {
      // Last question -> restart for now
      setCurrent(0);
      setSelectedIndex(null);
      setIsSubmitted(false);
      setScore(0);
    }
  };

  const isLastQuestion = current === totalQuestions - 1;

const getOptionStyle = (index: number): any[] => {
  const base: any[] = [styles.optionCard];

  if (!isSubmitted) {
    if (selectedIndex !== null && selectedIndex === index) {
      base.push(styles.optionSelected);
    }
    return base;
  }

  if (index === question.correctIndex) {
    base.push(styles.optionCorrect);
  } else if (
    selectedIndex !== null &&
    selectedIndex === index &&
    selectedIndex !== question.correctIndex
  ) {
    base.push(styles.optionWrong);
  }

  return base;
};


  const getLetter = (index: number) => String.fromCharCode(65 + index); // A, B, C, D

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <ArrowLeft size={22} color={COLORS.darkText} />
          <View>
            <Text style={styles.title}>Ayurveda Quiz</Text>
            <Text style={styles.subtitle}>
              Question {current + 1} of {totalQuestions}
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <HelpCircle size={20} color={COLORS.secondary} />
          <Text style={styles.scoreText}>{score}/{totalQuestions}</Text>
        </View>
      </View>

      {/* PROGRESS BAR */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* QUESTION CARD */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {/* OPTIONS */}
        <View style={{ marginTop: 12 }}>
          {question.options.map((opt, index) => (
            <TouchableOpacity
              key={`opt_${index}`}
              style={getOptionStyle(index)}
              activeOpacity={0.8}
              onPress={() => handleOptionPress(index)}
            >
              <View style={styles.optionLeft}>
                <View style={styles.optionLetter}>
                  <Text style={styles.optionLetterText}>
                    {getLetter(index)}
                  </Text>
                </View>
                <Text style={styles.optionText}>{opt}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* EXPLANATION */}
        {isSubmitted && (
          <View style={styles.explanationCard}>
            <Text style={styles.explanationTitle}>Explanation</Text>
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        )}
      </ScrollView>

      {/* BOTTOM BUTTONS */}
      <View style={styles.bottomBar}>
        {!isSubmitted ? (
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              selectedIndex === null && { opacity: 0.5 },
            ]}
            activeOpacity={0.8}
            onPress={handleSubmit}
            disabled={selectedIndex === null}
          >
            <Text style={styles.primaryBtnText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.8}
            onPress={handleNext}
          >
            <Text style={styles.primaryBtnText}>
              {isLastQuestion ? "Restart Quiz" : "Next Question"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

/* =================== STYLES =================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.darkText,
  },
  subtitle: {
    fontSize: 13,
    color: "#7F8895",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.secondary,
  },

  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "#E6EEF9",
    overflow: "hidden",
    marginBottom: 16,
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },

  questionCard: {
    backgroundColor: "#F6FBFF",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D7E6F6",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.darkText,
  },

  optionCard: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E1E6F0",
  },
  optionSelected: {
    borderColor: COLORS.secondary,
    backgroundColor: "#EEF5FF",
  },
  optionCorrect: {
    borderColor: "#2EAF4A",
    backgroundColor: "#E3F8EA",
  },
  optionWrong: {
    borderColor: "#E05A5A",
    backgroundColor: "#FFE5E5",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D0D8E6",
    justifyContent: "center",
    alignItems: "center",
  },
  optionLetterText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.darkText,
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.darkText,
  },

  explanationCard: {
    marginTop: 16,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#FFF9F1",
    borderWidth: 1,
    borderColor: "#FFE0B3",
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 6,
  },
  explanationText: {
    fontSize: 13,
    color: COLORS.darkText,
    lineHeight: 20,
  },

  bottomBar: {
    paddingVertical: 10,
  },
  primaryBtn: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
