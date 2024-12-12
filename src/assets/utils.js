export const formatPhoneNumber = (phone) => {
  if (!phone) return '';

  const cleaned = phone.replace(/\D+/g, ''); // Remove non-numeric characters
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }

  return phone; // Return the original input if not formatted
};

export const formatDate = (dateString) => {
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  const daysOfWeek = [
    'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${day} ${month}, ${dayOfWeek}`;
};

export function formatRussianDate(dateString) {
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `с ${day} ${month} ${year} года`;
}

