import { config } from "../config"
import { authenticate } from '../server'

exports.command = "login"
exports.builder = {}
exports.handler = () => {
    authenticate().then((accessToken) => {
        config.set('oauth2.bearerToken', accessToken)
        console.log("Logged in. OK to close the window/tab.")
    }).catch((e) => {
        console.log(e)
    })
}
