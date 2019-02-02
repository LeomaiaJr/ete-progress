import {Day, Days} from '../calendar'

export const startDay = new Day(2, 4)
export const endDay = new Day(11, 29)

export const whitelist: Array<Day | Days> = [
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

export const blacklist: Array<Day | Days> = [
	[3, 4, 8],
	[4, 18, 19],
	[5, 1],
	[5, 22, 24],
	[6, 20, 21],
	[7, 15, 29],
	[10, 7, 11],
	[11, 15],
].map(e => e.length === 2 ? Day.fromTuple(e) : Days.fromTuple(e))