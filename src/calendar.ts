class Day {
	constructor(public month: number, public day: number) {
	}

	static fromTuple(tuple: number[]): Day {
		return new Day(tuple[0], tuple[1])
	}
}

class Days {
	constructor(public month: number, public dayStart: number, public dayEnd: number) {
	}

	static fromTuple(tuple: number[]): Days {
		return new Days(tuple[0], tuple[1], tuple[2])
	}
}

const Whitelist: Array<Day|Days> = [
	[2, 9],
	[2, 23],
	[3, 23],
	[4, 6],
	[5, 18],
	[6, 1],
	[6, 29],
	[7, 6],
	[8, 17],
	[8, 31],
	[9, 14],
	[9, 28],
	[10, 5],
	[10, 19],
	[11, 9],
].map(e => e.length === 2 ? Day.fromTuple(e) : Days.fromTuple(e))

const Blacklist: Array<Day|Days> = [
	[3, 4, 8],
	[4, 18, 19],
	[5, 1],
	[5, 22, 24],
	[6, 20, 21],
	[7, 15, 29],
	[10, 7, 11],
	[11, 15],
].map(e => e.length === 2 ? Day.fromTuple(e) : Days.fromTuple(e))

class Calendar {
	private static whitelist = Whitelist
	private static blacklist = Blacklist

	private static isSameDay(date: Date, day: Day): boolean {
		return date.getUTCDate() == day.day && date.getUTCMonth() + 1 == day.month
	}

	private static isBetween(date: Date, days: Days): boolean {
		let month = date.getUTCMonth() + 1
		let day = date.getUTCDate()
		return month === days.month && day >= days.dayStart && day <= days.dayEnd
	}

	static isInList(date: Date, list: Array<Day|Days>) {
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
		return this.isWeekend(day) && !this.isInList(day, this.whitelist) ? false : !this.isInList(day, this.blacklist)
	}
}