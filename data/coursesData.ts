export interface Course {
  id: string;
  title: string;
  category: 'ayurveda' | 'neet';
  videoUrl: string;
  thumbnail: string;
}

export const ayurvedaCourses: Course[] = [
  {
    id: 'ayur-1',
    title: 'Introduction to Ayurveda Fundamentals',
    category: 'ayurveda',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.pexels.com/photos/3905880/pexels-photo-3905880.jpeg',
  },
  {
    id: 'ayur-2',
    title: 'Dosha Theory and Body Constitution',
    category: 'ayurveda',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.pexels.com/photos/3872392/pexels-photo-3872392.jpeg',
  },
  {
    id: 'ayur-3',
    title: 'Ayurvedic Pharmacology Basics',
    category: 'ayurveda',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg',
  },
];

export const neetCourses: Course[] = [
  {
    id: 'neet-1',
    title: 'NEET Physics: Mechanics Fundamentals',
    category: 'neet',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg',
  },
  {
    id: 'neet-2',
    title: 'NEET Chemistry: Organic Chemistry',
    category: 'neet',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
  },
  {
    id: 'neet-3',
    title: 'NEET Biology: Human Physiology',
    category: 'neet',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg',
  },
];
