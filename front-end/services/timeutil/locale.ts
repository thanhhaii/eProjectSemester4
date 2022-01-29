import { Locale } from "date-fns"
import enUS from "date-fns/locale/en-US"
import vi from "date-fns/locale/vi"

export type LocaleCode = "vi" | "vi-VN" | "en" | "en-US"
export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6
export interface DateOptions {
  locale?: Locale
  weekStartsOn?: WeekStartsOn
}

const _localeMap: { [key: string]: Locale } = {
  vi: vi,
  "vi-VN": vi,
  en: enUS,
  "en-US": enUS,
}

let _localeCode = "en"
export function SetLocaleCode(code: string): void {
  _localeCode = code
}

export function GetLocale(): Locale | undefined {
  if (_localeCode in _localeMap) {
    return _localeMap[_localeCode]
  }

  return vi
}

let _weekStartsOn: WeekStartsOn = 1
export function SetWeekStartsOn(weekStartsOn: WeekStartsOn): void {
  _weekStartsOn = weekStartsOn
}

export function GetWeekStartsOn(): WeekStartsOn {
  return _weekStartsOn
}
