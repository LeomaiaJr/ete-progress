import Calendar from './calendar'
import * as data_19 from './data/2019'
import createProgressIndicator from './progress_indicator'
import client from './client'

const calendar = new Calendar(data_19.startDay, data_19.endDay, data_19.whitelist, data_19.blacklist)

if (!calendar.isSchoolDay(new Date())) {
	console.log('There are no classes today, quitting.')
	process.exit()
}

const schoolDaysAmount = calendar.countSchoolDays()
const todaySchoolDay = calendar.getSchoolDayNumber(new Date(2019, 6, 30))
const progressBar = createProgressIndicator(todaySchoolDay / schoolDaysAmount)
const daysRemaining = Math.round(Math.abs((calendar.endDay.date.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)))

const message = `${Math.floor(todaySchoolDay / schoolDaysAmount * 100)}%    ${progressBar}   	${daysRemaining} Dias restantes`

console.log(`Posting message: '${message}'`)
client.post('statuses/update', {status: message}, (error) => {
	if (error) throw error
})