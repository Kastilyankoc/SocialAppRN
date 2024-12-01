// data.js
export const profileData = {
  username: 'selim_user',
  profilePic: 'https://picsum.photos/200',
  followers: 1200,
  following: 300,
  posts: [
    { id: '1', image: 'https://picsum.photos/300/300?random=1' },
    { id: '2', image: 'https://picsum.photos/300/300?random=2' },
    { id: '3', image: 'https://picsum.photos/300/300?random=3' },
    { id: '4', image: 'https://picsum.photos/300/300?random=4' },
    { id: '5', image: 'https://picsum.photos/300/300?random=5' },
    { id: '6', image: 'https://picsum.photos/300/300?random=6' },
  ],
};

export const exploreData = [
  {
    id: '1',
    image: 'https://picsum.photos/200/300.jpg',
    comments: [
      { id: 'c1', text: 'Muhteşem bir manzara!', rating: 10, likedBy: [] },
      { id: 'c2', text: 'Orada olmak isterdim...', rating: 8, likedBy: [] },
      { id: 'c11', text: 'Harika bir fotoğraf.', rating: 7, likedBy: [] },
      { id: 'c12', text: 'Muhteşem bir yemek!', rating: 6, likedBy: [] },
      { id: 'c13', text: 'Harika bir lezzet.', rating: 7, likedBy: [] },
    ],
  },
  {
    id: '2',
    image: 'https://picsum.photos/200/300.webp',
    comments: [
      { id: 'c3', text: 'Muhteşem bir araba!', rating: 9, likedBy: [] },
      { id: 'c4', text: 'Çok şık görünüyor.', rating: 7, likedBy: [] },
    ],
  },
  {
    id: '3',
    image: 'https://picsum.photos/seed/picsum/200/300',
    comments: [
      { id: 'c5', text: 'Muhteşem bir şehir!', rating: 8, likedBy: [] },
      { id: 'c6', text: 'Güzel bir görüntü.', rating: 6, likedBy: [] },
    ],
  },
  {
    id: '4',
    image: 'https://picsum.photos/200/300/?blur',
    comments: [
      { id: 'c7', text: 'Muhteşem bir hayvan!', rating: 7, likedBy: [] },
      { id: 'c8', text: 'Harika bir fotoğraf.', rating: 5, likedBy: [] },
    ],
  },
  {
    id: '5',
    image: 'https://picsum.photos/200/300?grayscale',
    comments: [
      { id: 'c9', text: 'Muhteşem bir yemek!', rating: 6, likedBy: [] },
      { id: 'c10', text: 'Harika bir lezzet.', rating: 4, likedBy: [] },
    ],
  },
];

export const trendsData = [
  // Buraya trend içeriklerini ekleyebiliriz.
];

export const myCommentsData = [
  {
    id: '1',
    image: 'https://picsum.photos/200/300.jpg',
    comments: [
      {
        id: 'c1',
        text: 'Muhteşem bir manzara!',
        rating: 10,
        likedBy: [],
        user: { id: 'u1', name: 'Ali', profilePic: 'https://picsum.photos/50' },
      },
      {
        id: 'c2',
        text: 'Orada olmak isterdim...',
        rating: 8,
        likedBy: [],
        user: { id: 'u2', name: 'Ayşe', profilePic: 'https://picsum.photos/51' },
      },
    ],
  },
  {
    id: '2',
    image: 'https://picsum.photos/200/300.webp',
    comments: [
      {
        id: 'c3',
        text: 'Muhteşem bir araba!',
        rating: 9,
        likedBy: [],
        user: { id: 'u3', name: 'Mehmet', profilePic: 'https://picsum.photos/52' },
      },
      {
        id: 'c4',
        text: 'Çok şık görünüyor.',
        rating: 7,
        likedBy: [],
        user: { id: 'u4', name: 'Elif', profilePic: 'https://picsum.photos/53' },
      },
    ],
  },
];





// export const courseData = [
//     {
//       id: 1,
//       points: '4.8',
//       title: 'Finansal Özgürlük ve Yatırım',
//       description: 'Finansal bağımsızlık için yatırım stratejilerini öğrenin.',
//       imageUri: 'https://picsum.photos/800/400?random=1',
//       categoryId: 'Yatırım Eğitimi',
//       price: 250,
//       duration: '2 saat',
//       createdAt: '2021-05-15',
//       updatedAt: '2023-03-01',
//       mentor: {
//         id: 1,
//         name: 'Ahmet Karaca',
//         imageUri: 'https://picsum.photos/200?random=1',
//         time: '1 saat',
//       },
//     },
//     {
//       id: 2,
//       points: '4.6',
//       title: 'Kendi Şirketinizi Kurun',
//       description: 'Başlangıç rehberi ile kendi işinizi kurmanın yolları.',
//       imageUri: 'https://picsum.photos/800/400?random=2',
//       categoryId: 'Girişimcilik',
//       price: 300,
//       duration: '1.5 saat',
//       createdAt: '2022-07-10',
//       updatedAt: '2023-06-01',
//       mentor: {
//         id: 2,
//         name: 'Zeynep Yılmaz',
//         imageUri: 'https://picsum.photos/200?random=2',
//         time: '45 dakika',
//       },
//     },
//     {
//       id: 3,
//       points: '4.4',
//       title: 'Sağlıklı Yaşam ve Beslenme',
//       description: 'Uzman diyetisyen ile sağlıklı beslenme ipuçları.',
//       imageUri: 'https://picsum.photos/800/400?random=3',
//       categoryId: 'Sağlık ve Wellness',
//       price: 150,
//       duration: '2 saat',
//       createdAt: '2023-02-01',
//       updatedAt: '2023-09-15',
//       mentor: {
//         id: 3,
//         name: 'Elif Çelik',
//         imageUri: 'https://picsum.photos/200?random=3',
//         time: '1 saat',
//       },
//     },
//   ];
  
//   export const categoryData = [
//     {
//       id: 1,
//       name: 'Yatırım',
//       createdAt: '2021-01-01',
//       updatedAt: '2023-03-01',
//       image: 'https://picsum.photos/400?random=4',
//     },
//     {
//       id: 2,
//       name: 'Girişimcilik',
//       createdAt: '2022-01-01',
//       updatedAt: '2023-06-01',
//       image: 'https://picsum.photos/400?random=5',
//     },
//     {
//       id: 3,
//       name: 'Sağlık',
//       createdAt: '2023-01-01',
//       updatedAt: '2023-09-01',
//       image: 'https://picsum.photos/400?random=6',
//     },
//   ];
  
//   export const mentorData = [
//     {
//       id: 1,
//       name: 'Ahmet Karaca',
//       image: 'https://picsum.photos/200?random=7',
//     },
//     {
//       id: 2,
//       name: 'Zeynep Yılmaz',
//       image: 'https://picsum.photos/200?random=8',
//     },
//     {
//       id: 3,
//       name: 'Elif Çelik',
//       image: 'https://picsum.photos/200?random=9',
//     },
//   ];
  
//   export const userData = [
//     {
//       id: 1,
//       name: 'Kerem Altuğ',
//       image: 'https://picsum.photos/200?random=10',
//     },
//   ];
