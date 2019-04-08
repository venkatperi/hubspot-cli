import * as convict from 'convict'
import * as dotenv from 'dotenv'

const path = require('path')
const fs = require('fs')

dotenv.load()

export const config = convict({
    env: {
        format: String,
        default: 'development'
    },
    host: {
        format: 'String',
        default: 'localhost'
    },
    port: {
        format: 'port',
        default: '4041'
    },
    oauth2: {
        provider: {
            format: 'String',
            default: undefined,
        },
        apiKey: {
            format: 'String',
            default: undefined,
        },
        clientId: {
            format: 'String',
            default: undefined,
        },
        clientSecret: {
            format: 'String',
            default: undefined,
        },
        scopes: {
            format: 'Array',
            default: [''],
        },
        bearerToken: {
            format: 'String',
            default: undefined,
        },
        urls: {
            auth: {
                format: 'String',
                default: undefined
            },
            token: {
                format: 'String',
                default: undefined,
            },
            refresh: {
                format: 'String',
                default: undefined,
            },
        },
    },
})

let base = "."
if (!fs.existsSync(path.join(base, 'config.json'))) {
    base = '..'
}

config.loadFile(path.join(base, 'config.json'))

let provider = config.get('oauth2.provider')
config.loadFile(path.join(base, `config.${provider}.json`))


config.validate()


