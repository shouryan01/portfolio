const monthYearFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC"
});

const fullDateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC"
});

export function formatMonthYear(date: Date): string {
  return monthYearFmt.format(date);
}

export function formatFullDate(date: Date): string {
  return fullDateFmt.format(date);
}

export function getYear(date: Date): number {
  return date.getUTCFullYear();
}
