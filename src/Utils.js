
export const SPEED_OF_LIGHT = 299792458; // in m/s

const TIME_MOD_MINUTES = 60;
const TIME_MOD_HOURS = TIME_MOD_MINUTES * 60;
const TIME_MOD_DAYS = TIME_MOD_HOURS * 24;
const TIME_MOD_MONTHS = TIME_MOD_DAYS * 30;
const TIME_MOD_YEARS = TIME_MOD_MONTHS * 12;


export function convertTimeToSeconds(amount, currentUnit) {
  switch (currentUnit) {
    case 'seconds': return amount;
    case 'minutes': return amount * TIME_MOD_MINUTES;
    case 'hours': return amount * TIME_MOD_HOURS;
    case 'days': return amount * TIME_MOD_DAYS;
    case 'months': return amount * TIME_MOD_MONTHS;
    case 'years': return amount * TIME_MOD_YEARS;
    default: return 0;
  }
}

export function convertSecondsToCleanTime(amount) {
  if (amount > TIME_MOD_YEARS) {
    return { amount: amount / TIME_MOD_YEARS, unit: 'years' };
  }
  if (amount > TIME_MOD_MONTHS) {
    return { amount: amount / TIME_MOD_MONTHS, unit: 'months' };
  }
  if (amount > TIME_MOD_DAYS) {
    return { amount: amount / TIME_MOD_DAYS, unit: 'days' };
  }
  if (amount > TIME_MOD_HOURS) {
    return { amount: amount / TIME_MOD_HOURS, unit: 'hours' };
  }
  if (amount > TIME_MOD_MINUTES) {
    return { amount: amount / TIME_MOD_MINUTES, unit: 'minutes' };
  }
  return { amount: amount, unit: 'seconds' };
}

export function precisionRoundMod(number, precision) {
  var factor = Math.pow(10, precision);
  var n = precision < 0 ? number : 0.01 / factor + number;
  return Math.round(n * factor) / factor;
}
