declare module "hubspot-api" {
    export type Options = {
        [k in string]: string | number | boolean | undefined | null
    }

    type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
        Pick<T, Exclude<keyof T, Keys>>
        & {
            [K in Keys]-?:
            Required<Pick<T, K>>
            & Partial<Record<Exclude<Keys, K>, undefined>>
        }[Keys]


    type CtorOptions = {
                           hapikey: string
                           accessToken: string
                       } & Options

    export type EntityCreator = (options: Options) => any

    export type ContactsApi = {
        getContacts: (options?: Options) => any
    }

    export class HubSpotClient {
        contacts: ContactsApi

        constructor(options: string | RequireOnlyOne<CtorOptions, "hapikey" | "accessToken">)
    }
}
