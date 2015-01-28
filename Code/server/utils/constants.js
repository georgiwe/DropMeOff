module.exports = {
  TOKEN_EXP: 1.5,
  PAGE_SIZE: 10,
  userNames: {
    MIN: 3,
    MAX: 20
  },
  carModel: {
    MIN: 3,
    MAX: 30
  },
  username: {
    MIN: 4,
    MAX: 15
  },
  password: {
    MIN: 6,
    MAX: 30
  },
  roles: {
    all: ['user', 'admin'],
    user: 'user',
    admin: 'admin',
    default: ['user']
  },
  SEATS_MIN: 1,
  SEATS_MAX: 5,
  cities: ['Sofia', 'Plovdiv'] //["София", "Пловдив", "Варна", "Бургас", "Благоевград", "Велико Търново", "Видин", "Враца", "Габрово", "Добрич", "Кърджали", "Кюстендил", "Ловеч", "Монтана", "Пазарджик", "Перник", "Плевен", "Разград", "Русе", "Силистра", "Сливен", "Смолян", "Софийска", "Стара Загора", "Търговище", "Хасково", "Шумен", "Ямбол"]
};