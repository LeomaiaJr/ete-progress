const otpauth = require('otpauth')
import {NextFunction, Request, Response} from 'express'

const totp = new otpauth.TOTP({
  secret: otpauth.Secret.fromB32(process.env.SECRET),
})

export default function auth(req: Request, res: Response, next: NextFunction) {
  if (totp.validate({token: req.headers.authorization || ''}) !== 0)
    return res.status(401).send('Unauthorized')

  next()
}
