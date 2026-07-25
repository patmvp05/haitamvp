import type { RecommendationRecord } from '@/lib/data/types';

export type TvLanguage = 'en' | 'zh' | 'ko' | 'vi';

export interface TvLanguageOption {
  code: TvLanguage;
  shortLabel: string;
  nativeLabel: string;
  locale: string;
}

export const TV_LANGUAGES: readonly TvLanguageOption[] = [
  { code: 'en', shortLabel: 'EN', nativeLabel: 'English', locale: 'en-US' },
  { code: 'zh', shortLabel: '中文', nativeLabel: '简体中文', locale: 'zh-CN' },
  { code: 'ko', shortLabel: '한국', nativeLabel: '한국어', locale: 'ko-KR' },
  { code: 'vi', shortLabel: 'VI', nativeLabel: 'Tiếng Việt', locale: 'vi-VN' },
];

type WeatherKey =
  | 'clear'
  | 'mainlyClear'
  | 'partlyCloudy'
  | 'overcast'
  | 'fog'
  | 'lightDrizzle'
  | 'drizzle'
  | 'heavyDrizzle'
  | 'freezingDrizzle'
  | 'lightRain'
  | 'rain'
  | 'heavyRain'
  | 'freezingRain'
  | 'lightSnow'
  | 'snow'
  | 'heavySnow'
  | 'snowGrains'
  | 'rainShowers'
  | 'heavyShowers'
  | 'snowShowers'
  | 'thunderstorm'
  | 'unknown';

export interface TvMessages {
  room: string;
  roomWelcomeLabel: string;
  greetingMorning: string;
  greetingAfternoon: string;
  greetingEvening: string;
  welcome: string;
  welcomeGuest: string;
  occasionStay: string;
  checkout: string;
  checkoutAt: string;
  breakfast: string;
  recommendationsTitle: string;
  noRecommendations: string;
  breakfastServed: string;
  airportPickup: string;
  lateCheckout: string;
  wifiDetails: string;
  joinWifi: string;
  reception: string;
  contactReception: string;
  scanReception: string;
  movies: string;
  watchMovies: string;
  language: string;
  chooseLanguage: string;
  languageHint: string;
  selected: string;
  weatherUnavailable: string;
  weather: Record<WeatherKey, string>;
}

export const TV_MESSAGES: Record<TvLanguage, TvMessages> = {
  en: {
    room: 'Room',
    roomWelcomeLabel: 'Welcome and stay details for room {room}',
    greetingMorning: 'Good morning',
    greetingAfternoon: 'Good afternoon',
    greetingEvening: 'Good evening',
    welcome: 'Welcome',
    welcomeGuest: 'Welcome, {name}',
    occasionStay: '{occasion} stay',
    checkout: 'Checkout',
    checkoutAt: '{weekday} at {time}',
    breakfast: 'Breakfast',
    recommendationsTitle: 'Things To Do Nearby',
    noRecommendations: 'No recommendations available.',
    breakfastServed: 'Breakfast served {hours}',
    airportPickup: 'Ask reception about our airport pickup service',
    lateCheckout: 'Late checkout available on request',
    wifiDetails: 'Wi-Fi details',
    joinWifi: 'Scan to join the Wi-Fi network',
    reception: 'Reception',
    contactReception: 'Contact reception',
    scanReception: 'Scan to contact reception',
    movies: 'Movies',
    watchMovies: 'Watch movies',
    language: 'Language',
    chooseLanguage: 'Choose your language',
    languageHint: 'Use left and right, then press OK',
    selected: 'Selected',
    weatherUnavailable: 'Weather unavailable',
    weather: {
      clear: 'Clear',
      mainlyClear: 'Mainly clear',
      partlyCloudy: 'Partly cloudy',
      overcast: 'Overcast',
      fog: 'Fog',
      lightDrizzle: 'Light drizzle',
      drizzle: 'Drizzle',
      heavyDrizzle: 'Heavy drizzle',
      freezingDrizzle: 'Freezing drizzle',
      lightRain: 'Light rain',
      rain: 'Rain',
      heavyRain: 'Heavy rain',
      freezingRain: 'Freezing rain',
      lightSnow: 'Light snow',
      snow: 'Snow',
      heavySnow: 'Heavy snow',
      snowGrains: 'Snow grains',
      rainShowers: 'Rain showers',
      heavyShowers: 'Heavy showers',
      snowShowers: 'Snow showers',
      thunderstorm: 'Thunderstorm',
      unknown: 'Unknown',
    },
  },
  zh: {
    room: '客房',
    roomWelcomeLabel: '{room}号客房欢迎及入住信息',
    greetingMorning: '早上好',
    greetingAfternoon: '下午好',
    greetingEvening: '晚上好',
    welcome: '欢迎您',
    welcomeGuest: '欢迎您，{name}',
    occasionStay: '{occasion}之旅',
    checkout: '退房',
    checkoutAt: '{weekday} {time}',
    breakfast: '早餐',
    recommendationsTitle: '附近精选',
    noRecommendations: '暂无推荐。',
    breakfastServed: '早餐时间 {hours}',
    airportPickup: '机场接送服务请咨询前台',
    lateCheckout: '可向前台申请延迟退房',
    wifiDetails: '无线网络信息',
    joinWifi: '扫码连接无线网络',
    reception: '前台',
    contactReception: '联系前台',
    scanReception: '扫码联系前台',
    movies: '电影',
    watchMovies: '观看电影',
    language: '语言',
    chooseLanguage: '选择语言',
    languageHint: '使用左右方向键，然后按确认键',
    selected: '已选择',
    weatherUnavailable: '天气信息暂不可用',
    weather: {
      clear: '晴',
      mainlyClear: '大致晴朗',
      partlyCloudy: '局部多云',
      overcast: '阴',
      fog: '有雾',
      lightDrizzle: '小毛毛雨',
      drizzle: '毛毛雨',
      heavyDrizzle: '强毛毛雨',
      freezingDrizzle: '冻毛毛雨',
      lightRain: '小雨',
      rain: '有雨',
      heavyRain: '大雨',
      freezingRain: '冻雨',
      lightSnow: '小雪',
      snow: '有雪',
      heavySnow: '大雪',
      snowGrains: '米雪',
      rainShowers: '阵雨',
      heavyShowers: '强阵雨',
      snowShowers: '阵雪',
      thunderstorm: '雷雨',
      unknown: '未知',
    },
  },
  ko: {
    room: '객실',
    roomWelcomeLabel: '{room}호 객실 환영 및 투숙 안내',
    greetingMorning: '좋은 아침입니다',
    greetingAfternoon: '좋은 오후입니다',
    greetingEvening: '좋은 저녁입니다',
    welcome: '환영합니다',
    welcomeGuest: '{name} 님, 환영합니다',
    occasionStay: '{occasion} 여행',
    checkout: '체크아웃',
    checkoutAt: '{weekday} {time}',
    breakfast: '조식',
    recommendationsTitle: '주변 즐길 거리',
    noRecommendations: '현재 추천 장소가 없습니다.',
    breakfastServed: '조식 시간 {hours}',
    airportPickup: '공항 픽업은 리셉션에 문의해 주세요',
    lateCheckout: '레이트 체크아웃은 요청 시 이용 가능합니다',
    wifiDetails: '와이파이 정보',
    joinWifi: 'QR 코드를 스캔해 와이파이에 연결하세요',
    reception: '리셉션',
    contactReception: '리셉션에 문의',
    scanReception: 'QR 코드를 스캔해 리셉션에 문의하세요',
    movies: '영화',
    watchMovies: '영화 보기',
    language: '언어',
    chooseLanguage: '언어 선택',
    languageHint: '좌우 버튼으로 이동한 뒤 확인을 누르세요',
    selected: '선택됨',
    weatherUnavailable: '날씨 정보를 불러올 수 없습니다',
    weather: {
      clear: '맑음',
      mainlyClear: '대체로 맑음',
      partlyCloudy: '구름 조금',
      overcast: '흐림',
      fog: '안개',
      lightDrizzle: '약한 이슬비',
      drizzle: '이슬비',
      heavyDrizzle: '강한 이슬비',
      freezingDrizzle: '어는 이슬비',
      lightRain: '약한 비',
      rain: '비',
      heavyRain: '폭우',
      freezingRain: '어는 비',
      lightSnow: '약한 눈',
      snow: '눈',
      heavySnow: '폭설',
      snowGrains: '싸락눈',
      rainShowers: '소나기',
      heavyShowers: '강한 소나기',
      snowShowers: '눈 소나기',
      thunderstorm: '뇌우',
      unknown: '알 수 없음',
    },
  },
  vi: {
    room: 'Phòng',
    roomWelcomeLabel: 'Lời chào và thông tin lưu trú cho phòng {room}',
    greetingMorning: 'Chào buổi sáng',
    greetingAfternoon: 'Chào buổi chiều',
    greetingEvening: 'Chào buổi tối',
    welcome: 'Chào mừng',
    welcomeGuest: 'Chào mừng, {name}',
    occasionStay: 'Kỳ nghỉ {occasion}',
    checkout: 'Trả phòng',
    checkoutAt: '{weekday} lúc {time}',
    breakfast: 'Bữa sáng',
    recommendationsTitle: 'Khám phá gần đây',
    noRecommendations: 'Hiện chưa có địa điểm gợi ý.',
    breakfastServed: 'Bữa sáng phục vụ {hours}',
    airportPickup: 'Hỏi lễ tân về dịch vụ đón tại sân bay',
    lateCheckout: 'Có thể yêu cầu trả phòng muộn',
    wifiDetails: 'Thông tin Wi-Fi',
    joinWifi: 'Quét mã để kết nối Wi-Fi',
    reception: 'Lễ tân',
    contactReception: 'Liên hệ lễ tân',
    scanReception: 'Quét mã để liên hệ lễ tân',
    movies: 'Phim',
    watchMovies: 'Xem phim',
    language: 'Ngôn ngữ',
    chooseLanguage: 'Chọn ngôn ngữ',
    languageHint: 'Dùng phím trái, phải rồi nhấn OK',
    selected: 'Đã chọn',
    weatherUnavailable: 'Không có thông tin thời tiết',
    weather: {
      clear: 'Trời quang',
      mainlyClear: 'Ít mây',
      partlyCloudy: 'Mây rải rác',
      overcast: 'Nhiều mây',
      fog: 'Sương mù',
      lightDrizzle: 'Mưa phùn nhẹ',
      drizzle: 'Mưa phùn',
      heavyDrizzle: 'Mưa phùn nặng hạt',
      freezingDrizzle: 'Mưa phùn đóng băng',
      lightRain: 'Mưa nhẹ',
      rain: 'Mưa',
      heavyRain: 'Mưa lớn',
      freezingRain: 'Mưa đóng băng',
      lightSnow: 'Tuyết nhẹ',
      snow: 'Tuyết',
      heavySnow: 'Tuyết rơi dày',
      snowGrains: 'Hạt tuyết',
      rainShowers: 'Mưa rào',
      heavyShowers: 'Mưa rào lớn',
      snowShowers: 'Mưa tuyết',
      thunderstorm: 'Dông',
      unknown: 'Không xác định',
    },
  },
};

const CATEGORY_TRANSLATIONS: Record<
  TvLanguage,
  Record<string, string>
> = {
  en: {},
  zh: {
    attraction: '景点',
    cafe: '咖啡馆',
    food: '美食',
    shopping: '购物',
  },
  ko: {
    attraction: '명소',
    cafe: '카페',
    food: '음식',
    shopping: '쇼핑',
  },
  vi: {
    attraction: 'Tham quan',
    cafe: 'Cà phê',
    food: 'Ẩm thực',
    shopping: 'Mua sắm',
  },
};

const PLACE_TRANSLATIONS: Record<
  Exclude<TvLanguage, 'en'>,
  Record<string, string>
> = {
  zh: {
    'War Remnants Museum': '战争遗迹博物馆',
    'Bến Thành Market': '滨城市场',
    'Bitexco Skydeck': 'Bitexco 金融塔观景台',
  },
  ko: {
    'War Remnants Museum': '전쟁박물관',
    'Bến Thành Market': '벤탄 시장',
    'Bitexco Skydeck': '비텍스코 스카이덱',
  },
  vi: {
    'War Remnants Museum': 'Bảo tàng Chứng tích Chiến tranh',
    'Bến Thành Market': 'Chợ Bến Thành',
    'Bitexco Skydeck': 'Đài quan sát Bitexco',
  },
};

const LOCATION_TRANSLATIONS: Record<
  Exclude<TvLanguage, 'en'>,
  Record<string, string>
> = {
  zh: { 'Ho Chi Minh City, Vietnam': '越南胡志明市' },
  ko: { 'Ho Chi Minh City, Vietnam': '베트남 호찌민시' },
  vi: { 'Ho Chi Minh City, Vietnam': 'TP. Hồ Chí Minh, Việt Nam' },
};

const OCCASION_TRANSLATIONS: Record<
  Exclude<TvLanguage, 'en'>,
  Record<string, string>
> = {
  zh: {
    anniversary: '纪念日',
    birthday: '生日',
    honeymoon: '蜜月',
  },
  ko: {
    anniversary: '기념일',
    birthday: '생일',
    honeymoon: '신혼여행',
  },
  vi: {
    anniversary: 'kỷ niệm',
    birthday: 'sinh nhật',
    honeymoon: 'trăng mật',
  },
};

const DEMO_WELCOME_MESSAGE =
  'Welcome back, David. We hope you enjoy your stay with us at Haita — and that tonight feels worth celebrating.';

const DEMO_WELCOME_TRANSLATIONS: Record<Exclude<TvLanguage, 'en'>, string> = {
  zh: '欢迎再次光临，David。祝您在 Haita 酒店入住愉快，也愿今晚值得庆祝。',
  ko: 'David 님, 다시 찾아주셔서 감사합니다. Haita에서 편안한 시간 보내시고, 오늘 밤이 기념할 만한 순간이 되길 바랍니다.',
  vi: 'Chào mừng David quay trở lại. Chúc bạn có kỳ nghỉ thật dễ chịu tại Haita và một buổi tối đáng nhớ.',
};

const WEATHER_KEYS_BY_CODE: Record<number, WeatherKey> = {
  0: 'clear',
  1: 'mainlyClear',
  2: 'partlyCloudy',
  3: 'overcast',
  45: 'fog',
  48: 'fog',
  51: 'lightDrizzle',
  53: 'drizzle',
  55: 'heavyDrizzle',
  56: 'freezingDrizzle',
  57: 'freezingDrizzle',
  61: 'lightRain',
  63: 'rain',
  65: 'heavyRain',
  66: 'freezingRain',
  67: 'freezingRain',
  71: 'lightSnow',
  73: 'snow',
  75: 'heavySnow',
  77: 'snowGrains',
  80: 'rainShowers',
  81: 'rainShowers',
  82: 'heavyShowers',
  85: 'snowShowers',
  86: 'snowShowers',
  95: 'thunderstorm',
  96: 'thunderstorm',
  99: 'thunderstorm',
};

export function parseTvLanguage(value: string | null | undefined): TvLanguage | null {
  const normalized = value?.trim().toLowerCase().replace('_', '-');
  if (!normalized) return null;
  if (normalized === 'zh' || normalized.startsWith('zh-') || normalized === 'cn') return 'zh';
  if (normalized === 'ko' || normalized.startsWith('ko-') || normalized === 'kr') return 'ko';
  if (normalized === 'vi' || normalized.startsWith('vi-')) return 'vi';
  if (normalized === 'en' || normalized.startsWith('en-')) return 'en';
  return null;
}

export function normalizeTvLanguage(value: string | null | undefined): TvLanguage {
  return parseTvLanguage(value) ?? 'en';
}

export function getTvLocale(language: TvLanguage): string {
  return TV_LANGUAGES.find((option) => option.code === language)?.locale ?? 'en-US';
}

export function fillMessage(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
}

export function getGreetingMessage(language: TvLanguage, date: Date): string {
  const messages = TV_MESSAGES[language];
  const hour = date.getHours();
  if (hour < 12) return messages.greetingMorning;
  if (hour < 18) return messages.greetingAfternoon;
  return messages.greetingEvening;
}

export function formatTvCheckout(
  date: string | null,
  time: string | null,
  language: TvLanguage,
): string | null {
  if (!date) return null;
  const clock = (time ?? '11:00').slice(0, 5);
  const checkout = new Date(`${date}T${clock}`);
  if (Number.isNaN(checkout.getTime())) return null;

  const locale = getTvLocale(language);
  const weekday = checkout.toLocaleDateString(locale, { weekday: 'long' });
  const formattedTime = checkout.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: '2-digit',
  });

  return fillMessage(TV_MESSAGES[language].checkoutAt, {
    weekday,
    time: formattedTime,
  });
}

export function formatTvHours(
  value: string,
  language: TvLanguage,
): string {
  if (language === 'en') return value;
  const locale = getTvLocale(language);

  return value.replace(
    /(\d{1,2}):(\d{2})\s*(AM|PM)/gi,
    (_, hourValue: string, minuteValue: string, periodValue: string) => {
      let hour = Number(hourValue) % 12;
      if (periodValue.toUpperCase() === 'PM') hour += 12;
      const time = new Date(2000, 0, 1, hour, Number(minuteValue));
      return time.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: '2-digit',
      });
    },
  );
}

export function translateWeather(
  conditionCode: number,
  language: TvLanguage,
): string {
  const key = WEATHER_KEYS_BY_CODE[conditionCode] ?? 'unknown';
  return TV_MESSAGES[language].weather[key];
}

export function translateLocation(
  location: string,
  language: TvLanguage,
): string {
  if (language === 'en') return location;
  return LOCATION_TRANSLATIONS[language][location] ?? location;
}

export function translateOccasion(
  occasion: string,
  language: TvLanguage,
): string {
  if (language === 'en') return occasion;
  return OCCASION_TRANSLATIONS[language][occasion.toLowerCase()] ?? occasion;
}

export function translateWelcomeMessage(
  message: string,
  language: TvLanguage,
): string {
  if (language === 'en' || message !== DEMO_WELCOME_MESSAGE) return message;
  return DEMO_WELCOME_TRANSLATIONS[language];
}

export function translateRecommendationName(
  name: string,
  language: TvLanguage,
): string {
  if (language === 'en') return name;
  return PLACE_TRANSLATIONS[language][name] ?? name;
}

export function translateRecommendationMeta(
  recommendation: RecommendationRecord,
  language: TvLanguage,
): string {
  const category = recommendation.category
    ? CATEGORY_TRANSLATIONS[language][recommendation.category.toLowerCase()] ??
      recommendation.category
    : null;
  const distance = recommendation.distance_label
    ? translateDistance(recommendation.distance_label, language)
    : null;

  return [distance, category].filter(Boolean).join(' · ');
}

function translateDistance(value: string, language: TvLanguage): string {
  if (language === 'en') return value;
  const match = value.match(/^(\d+)\s+min(?:ute)?s?\s+walk$/i);
  if (!match) return value;

  const minutes = match[1];
  if (language === 'zh') return `步行${minutes}分钟`;
  if (language === 'ko') return `도보 ${minutes}분`;
  return `Đi bộ ${minutes} phút`;
}
