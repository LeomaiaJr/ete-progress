import Calendar from './calendar'
import * as server from './server'

async function build() {
  let data
  try {
    data = await import('./data/' + process.env.DATA)
  } catch (e) {
    throw new Error(`Data '${process.env.DATA}' not found`)
  }

  return Calendar.fromModule(data)
}

build().then(calendar => server.start(calendar, parseInt(process.env.PORT)))
