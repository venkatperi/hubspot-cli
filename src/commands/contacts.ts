import {HubSpotClient} from '../../../hs-node-api/src'


exports.command = "login"
exports.builder = {}
exports.handler = () => {
    const hs: HubSpotClient = new HubSpotClient({hapikey: "", "abc": 123})

    hs.contacts().getContacts({limit: 25})
        .then( console.log )
}
