import * as Cookies from 'js-cookie'
import './style.sass'
import template, {doWatchers} from './template'
import {initialize} from './utils'

const otpauth = require('otpauth')
let totp: any

function refreshAuth() {
  let secret: any

  try {
    secret = otpauth.Secret.fromB32(Cookies.get('secret') || '')
  } catch (e) {
    secret = otpauth.Secret.fromB32('invalid')
  }

  totp = new otpauth.TOTP({
    secret,
  })
}

function setup() {
  doWatchers()
  initialize()
  refreshAuth()

  document.querySelector('#login-modal--form').addEventListener('submit', e => {
    e.preventDefault()
    const input = document.querySelector('#login-modal--field') as HTMLInputElement
    const button = document.querySelector('#login-modal--button')
    const info = document.querySelector('#login-modal--info')

    button.classList.add('is-loading')
    input.setAttribute('disabled', 'true')

    Cookies.set('secret', input.value)
    refreshAuth()

    fetch('/api/auth', {
      headers: {Authorization: totp.generate()},
    }).then(response => {
      button.classList.remove('is-loading')
      input.removeAttribute('disabled')

      if (response.status === 200) {
        document.querySelector('#login-modal').classList.remove('is-active')
      } else {
        button.classList.add('is-danger')
        info.classList.remove('is-invisible')

        input.addEventListener('focus', () => {
          input.select()
          info.classList.add('is-invisible')
          button.classList.remove('is-danger')
        }, {once: true})
      }
    })
  }, {})
}

window.addEventListener('load', setup, {once: true})

fetch('/api/percent').then(
    response => {
      return response.json().then(
          json => {
            template.percent = json.percent * 100
            template.humanPercent = Math.floor(json.percent * 100) + '%'
          },
      )
    },
)

declare global {
  interface Window {
    Template: any
  }
}

window.Template = template
