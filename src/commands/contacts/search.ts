import axios from 'axios'
import { config } from "../../config"



exports.command = "search <query>"
exports.builder = {
    email: {
        describe: 'email address',
    },
    firstname: {
        describe: 'First name',
    },
    lastname: {
        describe: 'Last name',
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

let props = ['email', 'firstname', 'lastname', 'phone', 'jobtitle']

exports.handler = (argv: any) => {
    let key = config.get('oauth2.apiKey')
    let url = `https://api.hubapi.com/contacts/v1/search/query?q=${argv.query}&hapikey=${key}`

    axios.get(url)
         .then((res: any) => {
             // console.log(res.data.contacts)
             console.log(res.data.contacts.map((c: any) => {
                 let str = []
                 for (let p of props) {
                     if (c.properties[p]) {
                         str.push(c.properties[p].value)
                     } else {
                         str.push("...")
                     }
                 }
                 return str.join(", ")
             }).join('\n'))
         })
}
