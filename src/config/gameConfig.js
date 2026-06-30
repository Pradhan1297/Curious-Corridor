export const gameConfig = {
  birthdayPersonName: 'Neha',
  senderInitial: 'Pradhan',
  birthdayWish: 'Hope your birthday is as fun as you are.',
  level1: {
    riddle: 'He made one wish, got exactly what he wanted, and regretted every second. What\'s the toy called?',
    hint: 'Obsession',
    answer: ['One Wish Willow', 'one wish willow', 'one wish willow '],
  },
  level2: {
    question: 'Where the river can\'t make up its mind and the stars never quit. Name the park.',
    hint: 'Think back to what she told you.',
    answer: 'Big Bend National Park',
    options: [
      { label: 'Yosemite National Park', correct: false },
      { label: 'Big Bend National Park', correct: true },
      { label: 'Grand Canyon National Park', correct: false },
      { label: 'Great Smoky Mountains National Park', correct: false },
    ],
  },
  level3: {
    riddle: 'Queen by birth, queen by fight. The realm wasn\'t ready for her. Who is she?',
    hint: 'Leader of Team Black.',
    answer: ['Rhaenyra', 'rhaenyra', 'queen rhaenyra', 'queen rhaenyra targaryen', 'rhaenyra targaryen', 'Rhaenyra Targaryen'],
  },
  level4: {
    riddle: 'New York\'s best closer. No courtroom, no problem. Who is he?',
    hint: 'Pearson Hardman\'s finest.',
    answer: ['Harvey Specter', 'harvey specter', 'harvey', 'Harvey', 'specter'],
  },
};
