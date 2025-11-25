import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Check, X } from 'lucide-react-native';

interface SubscriptionPlan {
  id: string;
  name: string;
  devices: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  color: string;
}

const plans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    devices: '1 device',
    monthlyPrice: 5,
    yearlyPrice: 50,
    features: [
      'Access to all courses',
      'Unlimited quizzes',
      '1 device login',
      'Standard video quality',
      'Email support',
    ],
    color: '#5856D6',
  },
  {
    id: 'standard',
    name: 'Standard',
    devices: '2 devices',
    monthlyPrice: 10,
    yearlyPrice: 100,
    features: [
      'All Basic features',
      '2 simultaneous devices',
      'HD video quality',
      'Download courses offline',
      'Priority email support',
    ],
    color: '#007AFF',
  },
  {
    id: 'premium',
    name: 'Premium',
    devices: 'Unlimited devices',
    monthlyPrice: 15,
    yearlyPrice: 150,
    features: [
      'All Standard features',
      'Unlimited devices',
      '4K video quality',
      'Personalized learning path',
      '24/7 priority support',
      'Exclusive content',
    ],
    color: '#FF9500',
  },
];

export default function SubscriptionScreen() {
  const router = useRouter();

  const handleSubscribe = (planName: string, duration: string, price: number) => {
    Alert.alert(
      'Subscribe to ' + planName,
      `You are subscribing to the ${planName} plan for $${price}/${duration}. This is a demo, no actual payment will be processed.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Subscribe',
          onPress: () => {
            Alert.alert(
              'Success!',
              'Subscription activated successfully!',
              [{ text: 'OK', onPress: () => router.back() }]
            );
          }
        }
      ]
    );
  };

  const PlanCard = ({ plan }: { plan: SubscriptionPlan }) => {
    return (
      <View style={[styles.planCard, { borderColor: plan.color }]}>
        <View style={[styles.planHeader, { backgroundColor: plan.color }]}>
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.planDevices}>{plan.devices}</Text>
        </View>

        <View style={styles.planBody}>
          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Monthly:</Text>
              <Text style={styles.price}>${plan.monthlyPrice}/mo</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Yearly:</Text>
              <Text style={styles.price}>${plan.yearlyPrice}/yr</Text>
              <Text style={styles.savings}>Save ${(plan.monthlyPrice * 12) - plan.yearlyPrice}</Text>
            </View>
          </View>

          <View style={styles.featuresContainer}>
            {plan.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Check size={18} color={plan.color} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.subscribeButton, { backgroundColor: plan.color }]}
              onPress={() => handleSubscribe(plan.name, 'month', plan.monthlyPrice)}
            >
              <Text style={styles.subscribeButtonText}>Monthly Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.subscribeButton, styles.yearlyButton, { borderColor: plan.color }]}
              onPress={() => handleSubscribe(plan.name, 'year', plan.yearlyPrice)}
            >
              <Text style={[styles.subscribeButtonTextAlt, { color: plan.color }]}>Yearly Plan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <X size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Your Plan</Text>
        <Text style={styles.headerSubtitle}>Unlock full access to all courses and quizzes</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Premium Benefits</Text>
          <Text style={styles.infoText}>
            Get unlimited access to all Ayurveda and NEET courses, quizzes, and study materials. Learn at your own pace on multiple devices.
          </Text>
        </View>

        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            All plans include a 7-day free trial. Cancel anytime.
          </Text>
          <Text style={styles.footerNote}>
            Note: Only one active login per device by default. Multi-device access requires Standard or Premium plan.
          </Text>
        </View>
      </ScrollView>
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
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1565C0',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  planCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planHeader: {
    padding: 20,
    alignItems: 'center',
  },
  planName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  planDevices: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  planBody: {
    padding: 20,
  },
  priceContainer: {
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
    width: 80,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginRight: 8,
  },
  savings: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '600',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  buttonContainer: {
    gap: 10,
  },
  subscribeButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  yearlyButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subscribeButtonTextAlt: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  footerNote: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
