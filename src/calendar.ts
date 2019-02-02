export default class Calendar {
	constructor(public startDay: Day,
							public endDay: Day,
							private whitelist: Array<Day | Days>,
							private blacklist: Array<Day | Days>) {
	}

	static isInList(date: Date, list: Array<Day | Days>) {
		return list.some(value => {
			if (value instanceof Day)
				return this.isSameDay(date, value.date)
			else
				return this.isBetween(date, value)
		})
	}

	private static isBetween(date: Date, days: Days): boolean {
		let month = date.getUTCMonth() + 1
		let day = date.getUTCDate()
		return month === days.month && day >= days.dayStart && day <= days.dayEnd
	}

	private static isSameDay(dateA: Date, dateB: Date): boolean {
		return dateA.getUTCFullYear() == dateB.getUTCFullYear()
				&& dateA.getUTCMonth() == dateB.getUTCMonth()
				&& dateA.getUTCDate() == dateB.getUTCDate()
	}

	static isWeekend(date: Date): boolean {
		return date.getUTCDay() === 0 || date.getUTCDay() === 6
	}

	isSchoolDay(day: Date): boolean {
		return Calendar.isWeekend(day) ? Calendar.isInList(day, this.whitelist) : !Calendar.isInList(day, this.blacklist)
	}

	getSchoolDayNumber(day: Date = new Date()): number {
		if (!this.isSchoolDay(day))
			throw new Error('Date isn\'t a school day.')

		let dayNumber: number = 0
		let currentDate = this.startDay.date
		while (currentDate.getTime() <= this.endDay.date.getTime()) {
			if (this.isSchoolDay(currentDate))
				dayNumber++

			if (Calendar.isSameDay(currentDate, day))
				break

			currentDate = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() + 1)
		}

		return dayNumber
	}

	countSchoolDays(): number {
		let days: number = 0
		let currentDate = this.startDay.date
		while (currentDate.getTime() <= this.endDay.date.getTime()) {
			if (this.isSchoolDay(currentDate))
				days++

			currentDate = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() + 1)
		}

		return days
	}
}

export class Day {
	public date: Date

	constructor(public month: number, public day: number, public year?: number) {
		this.date = new Date(year || (new Date()).getUTCFullYear(), this.month - 1, this.day)
	}

	static fromTuple(tuple: number[]): Day {
		return new Day(tuple[0], tuple[1])
	}
}

export class Days {
	public amount: number

	constructor(public month: number, public dayStart: number, public dayEnd: number) {
		this.amount = dayEnd - dayStart
	}

	static fromTuple(tuple: number[]): Days {
		return new Days(tuple[0], tuple[1], tuple[2])
	}
}