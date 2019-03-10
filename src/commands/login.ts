import { authenticate } from '../server'


exports.command = "login"
exports.builder = {}
exports.handler = () => {
    authenticate().then((user) => {
        console.log(`code: ${user}`)
    }).catch((e) => {
        console.log(e)
    })
}
