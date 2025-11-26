import { Tabs } from 'expo-router';
import { Home, User, BookOpen, Edit3 } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // Secondary theme color
        tabBarActiveTintColor: '#0077BA',
        tabBarInactiveTintColor: '#545F71',

        // FIX: Center icons & labels + responsive for all Android devices
        tabBarStyle: {
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0.5,
          borderTopColor: '#E0E0E0',
        },

        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,   // Centers label
        },

        tabBarIconStyle: {
          marginTop: 4,      // Centers icon
        },
      }}
    >

      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={23} color={color} />
          ),
        }}
      />

      {/* COURSES */}
      <Tabs.Screen
        name="course"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color }) => (
            <BookOpen size={23} color={color} />
          ),
        }}
      />

      {/* QUIZ */}
      <Tabs.Screen
        name="quiz"
        options={{
          title: 'Quiz',
          tabBarIcon: ({ color }) => (
            <Edit3 size={23} color={color} />
          ),
        }}
      />

      {/* PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={23} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
