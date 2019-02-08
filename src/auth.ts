const otpauth = require('otpauth')
import {Request, Response, NextFunction} from 'express'

let totp = new otpauth.TOTP({
  secret: otpauth.Secret.fromB32(process.env.SECRET)
})

export default function auth(req: Request, res: Response, next: NextFunction) {
  if (totp.validate({token: req.headers.authorization || ''}))
    return res.status(401).send('Unauthorized')

  next()
}