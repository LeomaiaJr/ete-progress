export default class Calendar {
	constructor(private startDay: Day,
							private endDay: Day,
							private whitelist: Array<Day | Days>,
							private blacklist: Array<Day | Days>) {
	}

	private static isSameDay(date: Date, day: Day): boolean {
		return date.getUTCDate() == day.day && date.getUTCMonth() + 1 == day.month
	}

	private static isBetween(date: Date, days: Days): boolean {
		let month = date.getUTCMonth() + 1
		let day = date.getUTCDate()
		return month === days.month && day >= days.dayStart && day <= days.dayEnd
	}

	static isInList(date: Date, list: Array<Day | Days>) {
		return list.some(value => {
			if (value instanceof Day)
				return this.isSameDay(date, value)
			else
				return this.isBetween(date, value)
		})
	}

	static isWeekend(date: Date): boolean {
		return date.getUTCDay() === 0 || date.getUTCDay() === 6
	}

	isSchoolDay(day: Date): boolean {
		return Calendar.isWeekend(day) ? Calendar.isInList(day, this.whitelist) : !Calendar.isInList(day, this.blacklist)
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