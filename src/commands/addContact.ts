const HubSpotClient = require("hubspot-api")
import { config } from "../config"


exports.command = "addContact"
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
      .createOrUpdateContact({
          email: argv.email,
          firstname: argv.firstname,
          lastname: argv.lastname
      })
      .then( (msg: any) => {
          console.log(msg.msg)
      })
}
