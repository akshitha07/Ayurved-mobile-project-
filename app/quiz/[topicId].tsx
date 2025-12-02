import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ArrowLeft, HelpCircle } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

// Theme colors
const COLORS = {
  primary: "#FD9029",
  secondary: "#0077BA",
  dark: "#545F71",
  lightBlue: "#E6EEF9",
};

// Topic wise question bank
const QUIZ_BANK: any = {
  vamana: [
    {
      id: "q1",
      question: "Vamana Karma eliminates which Dosha predominantly?",
      options: ["Vata", "Pitta", "Kapha", "All of the above"],
      correctIndex: 2,
      explanation:
        "Vamana helps eliminate aggravated Kapha Dosha from the upper part of the body.",
    },
    {
      id: "q2",
      question: "Which is the best season for Vamana?",
      options: ["Greeshma", "Varsha", "Vasanta", "Hemanta"],
      correctIndex: 2,
      explanation:
        "Vasanta Ritu is best for Vamana because Kapha is naturally aggravated in that season.",
    },
  ],

  virechana: [
    {
      id: "q1",
      question: "Virechana is mainly indicated for diseases caused by:",
      options: ["Vata", "Kapha", "Pitta", "Mamsa"],
      correctIndex: 2,
      explanation: "It primarily eliminates aggravated Pitta Dosha.",
    },
  ],
};

export default function TopicQuizPage() {
  const router = useRouter();
  const { topicId } = useLocalSearchParams();
  const QUESTIONS = QUIZ_BANK[topicId as string] || [];

  const [current, setCurrent] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const question = QUESTIONS[current];
  const total = QUESTIONS.length;

  const progress = (current + 1) / total;

  const handleSelect = (index: number) => {
    if (!isSubmitted) setSelectedIndex(index);
  };

  const handleSubmit = () => {
    if (selectedIndex === null) return;
    if (selectedIndex === question.correctIndex) {
      setScore(score + 1);
    }
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (current < total - 1) {
      setCurrent(current + 1);
      setSelectedIndex(null);
      setIsSubmitted(false);
    } else {
      router.push({
        pathname: "/quiz/result",
        params: { score, total, topic: topicId },
      });
    }
  };

  const getOptionStyle = (index: number): any[] => {
    const styleArray: any[] = [styles.optionCard];

    if (!isSubmitted) {
      if (selectedIndex === index) styleArray.push(styles.optionSelected);
      return styleArray;
    }

    if (index === question.correctIndex) styleArray.push(styles.optionCorrect);
    else if (selectedIndex === index) styleArray.push(styles.optionWrong);

    return styleArray;
  };

  const getLetter = (i: number) => String.fromCharCode(65 + i);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <ArrowLeft size={22} color={COLORS.dark} onPress={() => router.back()} />
        <View>
          <Text style={styles.title}>{topicId?.toString().toUpperCase()}</Text>
          <Text style={styles.subtitle}>
            Q {current + 1}/{total}
          </Text>
        </View>

        <View style={styles.headerRight}>
          <HelpCircle size={20} color={COLORS.secondary} />
          <Text style={styles.scoreText}>{score}/{total}</Text>
        </View>
      </View>

      {/* PROGRESS */}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {/* OPTIONS */}
        {question.options.map((opt: string, index: number) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(index)}
            onPress={() => handleSelect(index)}
            activeOpacity={0.8}
          >
            <View style={styles.optionLeft}>
              <View style={styles.optionCircle}>
                <Text style={styles.optionLetter}>{getLetter(index)}</Text>
              </View>
              <Text style={styles.optionText}>{opt}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* EXPLANATION */}
        {isSubmitted && (
          <View style={styles.explanationCard}>
            <Text style={styles.explanationTitle}>Explanation</Text>
            <Text style={styles.explanationText}>
              {question.explanation}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* SUBMIT / NEXT BUTTON */}
      <TouchableOpacity
        style={[styles.button, selectedIndex === null && !isSubmitted && { opacity: 0.5 }]}
        onPress={isSubmitted ? handleNext : handleSubmit}
        disabled={selectedIndex === null && !isSubmitted}
      >
        <Text style={styles.buttonText}>
          {isSubmitted ? (current === total - 1 ? "Finish" : "Next") : "Submit"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}



/********* Styles ***********/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.dark,
  },
  subtitle: {
    fontSize: 14,
    color: "#7E8899",
  },
  scoreText: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: "700",
  },

  track: {
    width: "100%",
    height: 6,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 999,
    marginBottom: 16,
  },
  fill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 999,
  },

  questionCard: {
    backgroundColor: "#F6FBFF",
    padding: 16,
    borderRadius: 14,
    borderColor: "#D7E6F6",
    borderWidth: 1,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.dark,
  },

  optionCard: {
    marginTop: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E1E6F0",
    padding: 14,
    backgroundColor: "#FFF",
  },
  optionSelected: {
    backgroundColor: "#E9F2FF",
    borderColor: COLORS.secondary,
  },
  optionCorrect: {
    backgroundColor: "#DFFFE2",
    borderColor: "#27AE60",
  },
  optionWrong: {
    backgroundColor: "#FFE5E5",
    borderColor: "#D9534F",
  },
  optionLeft: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  optionCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#B7C3D5",
    justifyContent: "center",
    alignItems: "center",
  },
  optionLetter: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.dark,
  },
  optionText: {
    fontSize: 14,
    color: COLORS.dark,
    flex: 1,
  },

  explanationCard: {
    padding: 14,
    marginTop: 16,
    borderRadius: 14,
    backgroundColor: "#FFF7E8",
    borderColor: "#FFDAA5",
    borderWidth: 1,
  },
  explanationTitle: {
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.dark,
  },

  button: {
    backgroundColor: COLORS.secondary,
    padding: 14,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
