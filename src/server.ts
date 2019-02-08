import express = require('express')
import Calendar from './calendar'
import createProgressIndicator from './progress_indicator'
import client from './client'
import auth from './auth'

let calendar: Calendar

const app = express()
app.use(express.static('../public'))

app.get('/api/percent', (req, res) => {
	let date = new Date(parseInt(req.query.millis) || Date.now())
	console.log(date)
	res.send(JSON.stringify({
		percent: calendar.getSchoolDayNumber(date) / calendar.countSchoolDays(),
	}))
})

app.get('/api/post', auth, (req, res) => {
	if (!calendar.isSchoolDay(new Date())) {
		res.send('There are no classes today, quitting.')
	}

	const schoolDaysAmount = calendar.countSchoolDays()
	const todaySchoolDay = calendar.getSchoolDayNumber()
	const progressBar = createProgressIndicator(todaySchoolDay / schoolDaysAmount, {length: 15})
	const daysRemaining = Math.round(Math.abs((calendar.endDay.date.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)))

	const message = `${Math.floor(todaySchoolDay / schoolDaysAmount * 100)}%    ${progressBar}\nFaltam ${daysRemaining} dias (${schoolDaysAmount - todaySchoolDay} letivos	)`

	res.send(`Posting message: '${message}'`)
	if (typeof req.query.debug === 'undefined' || !req.query.debug) {
		client.post('statuses/update', {status: message}, (error) => {
			if (error) throw error
		})
	}
})

export function start(data: Calendar, port: number = 80) {
	calendar = data
	app.listen(port)
}