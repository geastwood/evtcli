/* @flow */
import evt from 'evtjs'
import { resHandler, withLoading, assertString } from '../util'
import * as apiCaller from '../apiCaller'

// eslint-disable-next-line
const createDomain = async (api: any, domain: string, key: string) =>
    api.pushTransaction(
        { maxCharge: 10000, payer: key },
        new evt.EvtAction('newdomain', {
            name: domain,
            creator: key,
            issue: {
                name: 'issue',
                threshold: 1,
                authorizers: [
                    {
                        ref: `[A] ${key}`,
                        weight: 1,
                    },
                ],
            },
            transfer: {
                name: 'transfer',
                threshold: 1,
                authorizers: [
                    {
                        ref: '[G] .OWNER',
                        weight: 1,
                    },
                ],
            },
            manage: {
                name: 'manage',
                threshold: 1,
                authorizers: [
                    {
                        ref: `[A] ${key}`,
                        weight: 1,
                    },
                ],
            },
        }),
    )

type CommandArgs = {
    create?: boolean,
    list?: boolean,
    created?: boolean,
    domain?: string,
    publicKey?: string,
    privateKey?: string,
    raw?: boolean,
}

const Domain: TCommandRunable = {
    async run({ domain, publicKey, privateKey, create, created, list, raw = false }: CommandArgs) {
        if (create) {
            assertString(domain)
            assertString(publicKey)
            assertString(privateKey)

            await withLoading(
                // $FlowFixMe
                `Creating domain "${domain}"`,
                // $FlowFixMe
                () => createDomain(apiCaller.get('testnet', privateKey), domain, publicKey),
                resHandler(raw),
            )
        }

        if (list && domain) {
            assertString(domain)

            await withLoading(
                `Fetch detail of domain "${domain}"`,
                () => apiCaller.get().getDomainDetail(domain),
                resHandler(raw),
            )
        }

        if (list && created) {
            assertString(publicKey)

            await withLoading(
                `Fetching created domains`,
                () => apiCaller.get().getCreatedDomains(publicKey),
                resHandler(raw),
            )
        }
    },
    help() {
        console.log(`
Domain specific commands
    Examples: 

    * Create a domain
        $ ./yarn dcli domain --create --domain=testdomainfei1 --publicKey=EVT8aNw4NTvjBL1XR6hgy4zcA9jzh1JLjMuAw85mSbW68vYzw2f9H --privateKey=5JswhuLDEq7BENcNsu41Eg7dZCiv4TG8WffTNvbexbC1tyCN9EU

    * List all domains
        $ ./yarn dcli domain --list --created --publicKey=EVT8aNw4NTvjBL1XR6hgy4zcA9jzh1JLjMuAw85mSbW68vYzw2f9H 
       
    * List domain detail by name
        $ ./yarn dcli domain --list --domain=testdomainfei1 --raw
        `)
    },
}

module.exports = Domain
