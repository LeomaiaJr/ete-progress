import Calendar from './calendar'
import createProgressIndicator from './progress_indicator'
import client from './client'

let calendar: Calendar

async function build() {
	let data
	try {
		data = await import('./data/' + process.env.DATA)
	} catch (e) {
		throw new Error(`Data '${process.env.DATA}' not found`)
	}

	calendar = Calendar.fromModule(data)
}

function run() {
	if (!calendar.isSchoolDay(new Date())) {
		console.log('There are no classes today, quitting.')
		process.exit()
	}

	const schoolDaysAmount = calendar.countSchoolDays()
	const todaySchoolDay = calendar.getSchoolDayNumber()
	const progressBar = createProgressIndicator(todaySchoolDay / schoolDaysAmount, {length: 15})
	const daysRemaining = Math.round(Math.abs((calendar.endDay.date.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)))

	const message = `${Math.floor(todaySchoolDay / schoolDaysAmount * 100)}%    ${progressBar}\nFaltam ${daysRemaining} dias (${schoolDaysAmount - todaySchoolDay} letivos	)`

	console.log(`Posting message: '${message}'`)
	client.post('statuses/update', {status: message}, (error) => {
		if (error) throw error
	})
}

build().then(run)