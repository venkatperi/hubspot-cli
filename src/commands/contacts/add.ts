const HubSpotClient = require("hubspot-api")
import * as _ from 'lodash'
import { config } from "../../config"


exports.command = "add <email> <firstname> <lastname>"
exports.builder = {
    email: {
        alias: 'e',
        describe: 'email address',
        demand: true,
    },
    firstname: {
        alias: 'f',
        describe: 'First name',
        demand: true,
    },
    lastname: {
        alias: 'l',
        describe: 'Last name',
        demand: true,
    },
    website: {
        describe: 'Website',
        demand: false,
    },
    company: {
        describe: 'Company',
        demand: false,
    },
    phone: {
        describe: 'Phone',
        demand: false,
    },
    street: {
        describe: 'Street Address',
        demand: false,
    },
    city: {
        describe: 'Address City',
        demand: false,
    },
    state: {
        describe: 'Address State',
        demand: false,
    },
    zip: {
        describe: 'Address zip',
        demand: false,
    },
}

exports.handler = (argv: any) => {
    const hs = new HubSpotClient(
        {hapikey: config.get('oauth2.apiKey')})

    hs.contacts
      .createOrUpdateContact(
          _.pick(argv, ['email', 'firstname', 'lastname', 'website', 'company',
              'phone', 'address', 'city', 'state', 'zip'])
      )
      .then((msg: any) => {
          // console.log(msg.msg)
      }).catch((e: Error) => console.log(e.message))
}
