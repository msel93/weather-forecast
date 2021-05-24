import moment from 'moment-timezone';

/**
 * Фасад для moment
 */

export const DATE_FORMATS = {
  DATE_FORMAT: 'DD MMM YYYY',
  ISO_DATE: 'YYYY-MM-DD'
};

export function formatDateToString (dateTime: Date, format: string): string {
  return moment(dateTime).format(format);
}

export function subtractDays (date: Date, value: number): Date {
  return moment(date).subtract(value, 'days').toDate();
}

export function getCurrentDate (): Date {
  return new Date();
}

export function getDateInUnixForRequest (dateString: string): number {
  const date = moment(dateString, DATE_FORMATS.ISO_DATE).toDate();
  const dateTime = moment(date).add(12, 'hours').toDate();
  return dateTime.getTime() / 1000;
}
