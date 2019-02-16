const isDef = (obj: any): boolean => typeof obj !== 'undefined'

export default class Calendar {

  constructor(
      public startDay: Day,
      public endDay: Day,
      private whitelist: Array<Day | Days>,
      private blacklist: Array<Day | Days>,
  ) {
  }

  private _schoolDays: number

  get schoolDays(): number {
    if (isDef(this._schoolDays)) {
      return this._schoolDays
    }

    this._schoolDays = 0
    let currentDate = this.startDay.date
    while (currentDate.getTime() <= this.endDay.date.getTime()) {
      if (this.isSchoolDay(currentDate)) {
        this._schoolDays++
      }

      currentDate = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24)
    }

    return this._schoolDays
  }

  public static fromModule(module: any): Calendar {
    if (!isDef(module.startDay) || !isDef(module.endDay) || !isDef(module.whitelist) || !isDef(module.blacklist)) {
      throw new Error(`Loaded module is invalid`)
    }

    return new Calendar(module.startDay, module.endDay, module.whitelist, module.blacklist)
  }

  private static isInList(date: Date, list: Array<Day | Days>) {
    return list.some(value => {
      if (value instanceof Day) {
        return this.isSameDay(date, value.date)
      } else {
        return this.isBetween(date, value)
      }
    })
  }

  private static isBetween(date: Date, days: Days): boolean {
    const month = date.getUTCMonth() + 1
    const day = date.getUTCDate()
    return month === days.month && day >= days.dayStart && day <= days.dayEnd
  }

  private static isSameDay(dateA: Date, dateB: Date): boolean {
    return dateA.getUTCFullYear() === dateB.getUTCFullYear()
        && dateA.getUTCMonth() === dateB.getUTCMonth()
        && dateA.getUTCDate() === dateB.getUTCDate()
  }

  private static isWeekend(date: Date): boolean {
    return date.getUTCDay() === 0 || date.getUTCDay() === 6
  }

  public isSchoolDay(day: Date): boolean {
    return Calendar.isWeekend(day) ? Calendar.isInList(day, this.whitelist) : !Calendar.isInList(day, this.blacklist)
  }

  public getSchoolDayNumber(day: Date = new Date()): number {
    while (!this.isSchoolDay(day)) {
      day = new Date(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate() - 1)
    }

    let dayNumber: number = 0
    let currentDate = this.startDay.date
    while (currentDate.getTime() <= this.endDay.date.getTime()) {
      if (this.isSchoolDay(currentDate)) {
        dayNumber++
      }

      if (Calendar.isSameDay(currentDate, day)) {
        break
      }

      currentDate = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24)
    }

    return dayNumber
  }
}

export class Day {

  public date: Date

  constructor(public month: number, public day: number, public year?: number) {
    this.date = new Date(year || (new Date()).getUTCFullYear(), this.month - 1, this.day)
  }

  public static fromTuple(tuple: number[]): Day {
    return new Day(tuple[0], tuple[1])
  }
}

export class Days {

  public amount: number

  constructor(public month: number, public dayStart: number, public dayEnd: number) {
    this.amount = dayEnd - dayStart
  }

  public static fromTuple(tuple: number[]): Days {
    return new Days(tuple[0], tuple[1], tuple[2])
  }
}
