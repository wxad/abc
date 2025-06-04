export const MONTHS = [
  {
    zhCN: '1月',
    enUS: 'Jan',
  },
  {
    zhCN: '2月',
    enUS: 'Feb',
  },
  {
    zhCN: '3月',
    enUS: 'Mar',
  },
  {
    zhCN: '4月',
    enUS: 'Apr',
  },
  {
    zhCN: '5月',
    enUS: 'May',
  },
  {
    zhCN: '6月',
    enUS: 'Jun',
  },
  {
    zhCN: '7月',
    enUS: 'Jul',
  },
  {
    zhCN: '8月',
    enUS: 'Aug',
  },
  {
    zhCN: '9月',
    enUS: 'Sep',
  },
  {
    zhCN: '10月',
    enUS: 'Oct',
  },
  {
    zhCN: '11月',
    enUS: 'Nov',
  },
  {
    zhCN: '12月',
    enUS: 'Dec',
  },
];

export const DATE_INPUT_PLACEHOLDER = {
  zhCN: '请选择日期',
  enUS: 'Select date',
};

export const DATE_RANGE_INPUT_PLACEHOLDER = {
  zhCN: '请选择日期范围',
  enUS: 'Select date range',
};

export const convertDateToString = (date?: Date | '' | null, locale: 'zhCN' | 'enUS' = 'zhCN') => {
  if (!date) {
    return '';
  }
  let year = '';
  let month = '';
  let day = '';
  try {
    if (locale === 'zhCN') {
      [year, month, day] = date.toLocaleDateString('zh-Hans-CN').split('/');
    } else {
      [month, day, year] = date.toLocaleDateString('en-US').split('/');
    }
  } catch (error) {
    [month, day, year] = date.toLocaleDateString('en-US').split('/');
  }

  const addZero = (s: string) => {
    if (parseInt(s, 10) < 10) {
      return `0${s}`;
    }
    return s;
  };
  return locale === 'zhCN' ? `${year}-${addZero(month)}-${addZero(day)}` : `${addZero(month)}/${addZero(day)}/${year}`;
};

export const convertDateRangeToString = (
  range?: [Date | undefined | null, Date | undefined | null],
  locale: 'zhCN' | 'enUS' = 'zhCN',
) => {
  if (!range) {
    return '';
  }
  const from = range[0];
  const to = range[1];
  if (!(from && to)) {
    return '';
  }
  if (isDayAfter(to, from)) {
    return `${convertDateToString(from, locale)} - ${convertDateToString(to, locale)}`;
  }
  return `${convertDateToString(to, locale)} - ${convertDateToString(from, locale)}`;
};

export const isSameDay = (date1?: Date | null, date2?: Date | null) => {
  if (!date1 || !date2) {
    return false;
  }

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isSameMonth = (date1?: Date | null, date2?: Date | null) => {
  if (!date1 || !date2) {
    return false;
  }

  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
};

export const isLegalDateString = (date: string, locale: 'zhCN' | 'enUS' = 'zhCN') => {
  if (date.trim() === '') {
    return true;
  }
  const strings = locale === 'zhCN' ? date.split('-') : date.split('/');

  const yearString = locale === 'zhCN' ? strings[0] : strings[2];
  const monthString = locale === 'zhCN' ? strings[1] : strings[0];
  const dayString = locale === 'zhCN' ? strings[2] : strings[1];

  if (
    strings.length === 3 &&
    yearString.length === 4 &&
    (monthString.length === 2 || monthString.length === 1) &&
    (dayString.length === 2 || dayString.length === 1) &&
    !isNaN(Number(yearString)) &&
    !isNaN(Number(monthString)) &&
    !isNaN(Number(dayString))
  ) {
    const checkLeapYear = (str: number) => (str % 4 === 0 && str % 100 !== 0) || str % 400 === 0;
    const solar = [1, 3, 5, 7, 8, 10, 12];
    const lunar = [4, 6, 9, 11];
    const year = parseInt(yearString, 10);
    const month = parseInt(monthString, 10);
    const day = parseInt(dayString, 10);
    if (month > 0 && month < 13) {
      if (solar.includes(month)) {
        if (day > 0 && day < 32) {
          return true;
        }
      } else if (lunar.includes(month)) {
        if (day > 0 && day < 31) {
          return true;
        }
      } else {
        if (checkLeapYear(year) && day > 0 && day < 30) {
          return true;
        }
        if (!checkLeapYear(year) && day > 0 && day < 29) {
          return true;
        }
      }
    }
    return false;
  }
  return false;
};

export const isLegalDateRangeString = (date: string, locale: 'zhCN' | 'enUS' = 'zhCN') => {
  if (date.trim() === '') {
    return true;
  }
  const strings = date.split(' - ');
  return (
    strings.length === 2 &&
    strings[0].length &&
    strings[1].length &&
    isLegalDateString(strings[0], locale) &&
    isLegalDateString(strings[1], locale)
  );
};

export const isDayBefore = (date1?: Date | null, date2?: Date | null) => {
  if (!date1 || !date2) {
    return false;
  }

  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);
  newDate1.setHours(0, 0, 0, 0);
  newDate2.setHours(0, 0, 0, 0);
  return newDate1.getTime() < newDate2.getTime();
};

export const isDayAfter = (date1?: Date | null, date2?: Date | null) => {
  if (!date1 || !date2) {
    return false;
  }

  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);
  newDate1.setHours(0, 0, 0, 0);
  newDate2.setHours(0, 0, 0, 0);
  return newDate1.getTime() > newDate2.getTime();
};

export const today = new Date();

export const getDefaultMaxDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  date.setMonth(11, 31);
  return date;
};

export const getDefaultMinDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 4);
  date.setMonth(0, 1);
  return date;
};

export const clone = (d: Date | null | undefined) => (d ? new Date(d.getTime()) : null);

export const isDayInRange = (
  date: Date,
  dateRange: [Date | null | undefined, Date | null | undefined],
  exclusive: boolean = false,
) => {
  if (date === null || dateRange[0] === null || dateRange[1] === null) {
    return false;
  }

  const day = clone(date);
  const start = clone(dateRange[0]);
  const end = clone(dateRange[1]);

  if (day) {
    day.setHours(0, 0, 0, 0);
  }
  if (start) {
    start.setHours(0, 0, 0, 0);
  }
  if (end) {
    end.setHours(0, 0, 0, 0);
  }

  return start && day && end
    ? start <= day && day <= end && (!exclusive || (!isSameDay(start, day) && !isSameDay(day, end)))
    : null;
};
