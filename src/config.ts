import * as convict from 'convict'
import * as dotenv from 'dotenv'

dotenv.load()

export const config = convict({
    env: {
        format: 'string',
        default: 'development',
        env: 'NODE_ENV'
    },
    host: {
        format: 'ipaddress',
        default: '127.0.0.1',
        env: 'HOST_ADDRESS'
    },
    port: {
        format: 'port',
        default: '4041',
        env: 'HOST_PORT'
    },
    hubspot: {
        oauth: {
            apiKey: {
                format: 'string',
                env: 'HUBSPOT_API_KEY'
            },
            clientId: {
                format: 'string',
                env: 'HUBSPOT_CLIENT_ID'
            },
            clientSecret: {
                format: 'string',
                env: 'HUBSPOT_CLIENT_SECRET'
            },
            scopes: {
                format: 'string',
                env: 'HUBSPOT_SCOPES'
            },
            urls: {
                auth: {
                    format: 'string',
                    env: 'HUBSPOT_OAUTH2_AUTH_URL'
                },
                token: {
                    format: 'string',
                    env: 'HUBSPOT_OAUTH2_TOKEN_URL'
                },
                refresh: {
                    format: 'string',
                    env: 'HUBSPOT_OAUTH2_TOKEN_URL'
                },
            },
        }
    },
})

