import axios from 'axios'
import { config } from "../../config"


exports.command = "status <email>"
exports.builder = {
    email: {
        describe: 'email address',
        demand: true
    },
}


exports.handler = (argv: any) => {
    let key = config.get('oauth2.apiKey')
    let url = `https://api.hubapi.com/email/public/v1/subscriptions/${argv.email}?hapikey=${key}`
    console.log(url)
    axios.get(url)
      .then((res: any) => {
          console.log(res.data)
      })
        .catch(console.log)
}
