import {whitelist, blacklist} from './lists'

export default class Calendar {
	private static isSameDay(date: Date, day: Day): boolean {
		return date.getUTCDate() == day.day && date.getUTCMonth() + 1 == day.month
	}

	private static isBetween(date: Date, days: Days): boolean {
		let month = date.getUTCMonth() + 1
		let day = date.getUTCDate()
		return month === days.month && day >= days.dayStart && day <= days.dayEnd
	}

	static isInList(date: Date, list: Array<Day | Days>) {
		return list.every(value => {
			if (value instanceof Day)
				return this.isSameDay(date, value)
			else
				return this.isBetween(date, value)
		})
	}

	static isWeekend(date: Date): boolean {
		return date.getUTCDay() !== 0 && date.getUTCDay() !== 6
	}

	static isSchoolDay(day: Date): boolean {
		return this.isWeekend(day) && !this.isInList(day, whitelist) ? false : !this.isInList(day, blacklist)
	}
}

export class Day {
	constructor(public month: number, public day: number) {
	}

	static fromTuple(tuple: number[]): Day {
		return new Day(tuple[0], tuple[1])
	}
}

export class Days {
	constructor(public month: number, public dayStart: number, public dayEnd: number) {
	}

	static fromTuple(tuple: number[]): Days {
		return new Days(tuple[0], tuple[1], tuple[2])
	}
}