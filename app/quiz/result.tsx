import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Trophy, RotateCcw, ArrowLeft } from "lucide-react-native";

const COLORS = {
    primary: "#FD9029",
    secondary: "#0077BA",
    dark: "#545F71",
    bg: "#F8FAFC",
};

export default function QuizResult() {
    const router = useRouter();
    const { score, total, topic } = useLocalSearchParams();

    const percentage = Math.round((Number(score) / Number(total)) * 100);

    const getMessage = () => {
        if (percentage === 100) return "Excellent! You're a pro! 🎯";
        if (percentage >= 70) return "Great job! Keep it up! ⭐";
        if (percentage >= 40) return "Decent attempt! Try again 💪";
        return "Don’t give up! Learn & retry 🚀";
    };

    return (
        <View style={styles.container}>
            <Trophy size={70} color={COLORS.primary} />

            <Text style={styles.heading}>Quiz Completed!</Text>
            <Text style={styles.subText}>{topic}</Text>

            <Text style={styles.scoreText}>
                {score}/{total} Correct ({percentage}%)
            </Text>

            <Text style={styles.message}>{getMessage()}</Text>

            <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => router.replace(`/quiz/${topic}`)}



            >
                <RotateCcw size={20} color="#fff" />
                <Text style={styles.primaryBtnText}>Retry Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => router.push(`/quiz`)}
            >
                <ArrowLeft size={20} color={COLORS.secondary} />
                <Text style={styles.secondaryBtnText}>Back to Topics</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    heading: {
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.dark,
        marginTop: 12,
    },
    subText: {
        fontSize: 16,
        color: COLORS.secondary,
        marginBottom: 12,
    },
    scoreText: {
        fontSize: 22,
        fontWeight: "800",
        color: COLORS.secondary,
        marginTop: 6,
    },
    message: {
        fontSize: 16,
        color: COLORS.dark,
        textAlign: "center",
        marginVertical: 18,
    },
    primaryBtn: {
        flexDirection: "row",
        backgroundColor: COLORS.secondary,
        padding: 12,
        borderRadius: 10,
        gap: 6,
        alignItems: "center",
        marginTop: 10,
    },
    primaryBtnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
    },
    secondaryBtn: {
        flexDirection: "row",
        padding: 12,
        gap: 6,
        marginTop: 14,
    },
    secondaryBtnText: {
        fontSize: 15,
        color: COLORS.secondary,
        fontWeight: "700",
    },
});
