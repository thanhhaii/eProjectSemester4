import {
  endOfWeek,
  format,
  formatDuration,
  isSameMonth,
  isSameYear,
  isThisMonth,
  isThisWeek,
  isThisYear,
  isValid,
  Locale,
  parseISO,
  startOfWeek,
  toDate,
  nextMonday,
  formatDistanceToNowStrict,
  addDays,
  isToday,
  isTomorrow,
  isDate,
} from "date-fns"
import { GetLocale, GetWeekStartsOn, WeekStartsOn } from "./locale"
const createOptions = (): { locale?: Locale; weekStartsOn?: WeekStartsOn } => {
  return {
    locale: GetLocale(),
    weekStartsOn: GetWeekStartsOn(),
  }
}

export type DateLike = Date | number

//Get Day
export function GetDay(date: Date): string {
  return Format(date, "eeee")
}

export function IsDate(date: string | Date): boolean {
  return isDate(date)
}

///////////////////////////////
// PARSING
///////////////////////////////

export function ParseTime(raw: string): Date {
  return new Date(raw)
}

export function ToDate(date: DateLike): Date {
  return toDate(date)
}

export function ParseISO(date: string): Date {
  return parseISO(date)
}

///////////////////////////////
// FORMATS
///////////////////////////////
export function Format(date: DateLike, formatStr?: string): string {
  let finalFormatStr = ""
  if (!formatStr) {
    finalFormatStr = "eee, dd MMMM yyyy"
  } else {
    finalFormatStr = formatStr
  }

  return format(date, finalFormatStr, {
    ...createOptions(),
    useAdditionalDayOfYearTokens: false,
    useAdditionalWeekYearTokens: false,
    firstWeekContainsDate: 1,
  })
}

export function ReadableDuration(seconds: number): string {
  return formatDuration({
    seconds: seconds,
  })
}

export function FormatDateRange(
  dateLeft: Date,
  dateRight: Date,
  separator: string,
): string {
  let leftFormat = "dd MMMM yyyy"
  let rightFormat = "dd MMMM yyyy"
  if (isSameYear(dateLeft, dateRight) && isSameYear(dateLeft, new Date())) {
    if (isSameMonth(dateLeft, dateRight)) {
      leftFormat = "dd"
      rightFormat = "dd MMMM"
    } else {
      leftFormat = "dd MMMM"
      rightFormat = "dd MMMM"
    }
  }

  return [Format(dateLeft, leftFormat), Format(dateRight, rightFormat)].join(
    separator,
  )
}

export function GlanceDateOnlyFormat(
  src: string | DateLike | undefined,
): string {
  if (!src) {
    return ""
  }

  let date: Date
  if (typeof src === "string") {
    date = parseISO(src)
  } else {
    date = toDate(src)
  }

  if (!isValid(date)) {
    return "invalid date"
  }

  if (IsThisWeek(date)) {
    return Format(date, "eeee")
  }

  if (IsThisMonth(date)) {
    return Format(date, "eeee, dd")
  }

  if (IsThisYear(date)) {
    return Format(date, "eeee, dd MMMM")
  }

  return Format(date, "dd MMMM yyyy")
}

export function FormatDistanceToNowStrict(date: DateLike): string {
  return formatDistanceToNowStrict(date, createOptions())
}

///////////////////////////////
// Date
///////////////////////////////
export function IsToday(date: DateLike) {
  return isToday(date)
}

export function IsTomorrow(date: DateLike) {
  return isTomorrow(date)
}

export function GetEndLastWeek(date: DateLike): Date {
  const endOfLastWeek = new Date(
    StartOfWeek(date).setDate(StartOfWeek(date).getDate() - 1),
  )
  return endOfLastWeek
}

export function NextMonday(date: DateLike): Date {
  return nextMonday(date)
}

export function NextEndOfWeek(date: DateLike): Date {
  return EndOfWeek(nextMonday(date))
}

export function AddDays(date: DateLike, amount: number): Date {
  return addDays(date, amount)
}

///////////////////////////////
// Weeks
///////////////////////////////

export function IsThisWeek(date: DateLike): boolean {
  return isThisWeek(date, createOptions())
}

export function StartOfWeek(date: DateLike): Date {
  return startOfWeek(date, createOptions())
}

export function EndOfWeek(date: DateLike): Date {
  return endOfWeek(date, createOptions())
}

///////////////////////////////
// Month
///////////////////////////////

export function IsSameMonth(dateLeft: DateLike, dateRight: DateLike): boolean {
  return isSameMonth(dateLeft, dateRight)
}

export function IsThisMonth(date: DateLike): boolean {
  return isThisMonth(date)
}

///////////////////////////////
// Years
///////////////////////////////

export function IsThisYear(date: DateLike): boolean {
  return isThisYear(date)
}

export function IsSameYear(dateLeft: DateLike, dateRight: DateLike): boolean {
  return isSameYear(dateLeft, dateRight)
}
