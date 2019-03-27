import * as convict from 'convict'
import * as dotenv from 'dotenv'

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

config.loadFile('./config.json')
let provider = config.get('oauth2.provider')
config.loadFile(`./config.${provider}.json`)

config.validate()


