import { DateTimeFormatOptions, Intl } from 'intl'; // import: intl 1.2.5

export const formatDate = (date: Date, format: string, options?: DateTimeFormatOptions): string => {
  // Check if date is valid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date provided.');
  }

  // Create Intl.DateTimeFormat instance with specified format and options
  const formatter = new Intl.DateTimeFormat(undefined, {
    ...options,
    dateStyle: format.includes('yyyy') || format.includes('yy') ? 'full' : 'short',
  });

  // Format the date using the formatter
  return formatter.format(date);
};