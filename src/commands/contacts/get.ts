const HubSpotClient = require("hubspot-api")
import * as _ from 'lodash'
import { config } from "../../config"


exports.command = "get <email>"
exports.builder = {
    email: {
        alias: 'e',
        describe: 'email address',
        demand: true,
    },
}

exports.handler = (argv: any) => {
    const hs = new HubSpotClient(
        {hapikey: config.get('oauth2.apiKey')})

    hs.contacts
      .getContacts(_.pick(argv, ['email',]))
      .then((msg: any) => {
          console.log(msg.msg)
      })
}
