import './style.sass'
import template, {doWatchers} from './template'

window.addEventListener('load', doWatchers, {once: true})

fetch('/api/percent').then(
    response => response.json().then(
        json => template.percent = json.percent * 100,
    ),
)

declare global {
  interface Window {
    Template: any
  }
}

window.Template = template