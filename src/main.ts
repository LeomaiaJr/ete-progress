import Calendar from './calendar'
import * as data_19 from './data/2019'

const calendar = new Calendar(data_19.startDay, data_19.endDay, data_19.whitelist, data_19.blacklist)
console.log(calendar.countSchoolDays())
