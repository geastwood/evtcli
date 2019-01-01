/* @flow */
import evt from 'evtjs'
import { resHandler, withLoading } from '../util'
import * as apiCaller from '../apiCaller'

// eslint-disable-next-line
const issueToken = async (api, domain, names, key) =>
    api.pushTransaction(
        { maxCharge: 10000, payer: key },
        new evt.EvtAction('issuetoken', {
            domain,
            names,
            owner: [key],
        }),
    )

// eslint-disable-next-line
const transferToken = async (api, domain, name, keys, memo) =>
    api.pushTransaction(
        { maxCharge: 10000 },
        new evt.EvtAction('transfer', {
            domain,
            name,
            to: [keys],
            memo,
        }),
    )

type CommandArgs = {
    issue?: boolean,
    transfer?: boolean,
    list?: boolean,
    privateKey?: string,
    publicKey?: string,
    tokenName?: string,
    transferTo?: string,
    domain?: string,
    raw?: boolean,
}

const NFT: TCommandRunable = {
    async run({
        issue,
        transfer,
        list,
        privateKey,
        publicKey = '',
        tokenName = '',
        domain = '',
        transferTo = '',
        raw = false,
    }: CommandArgs) {
        if (issue) {
            if (tokenName.length === 0) {
                throw new Error('Token name must be valid')
            }
            if (domain.length === 0) {
                throw new Error('Domain must be valid.')
            }

            await withLoading(
                `Issuing token "${tokenName}" under domain "${domain}"`,
                () => issueToken(apiCaller.get('testnet', privateKey), domain, [tokenName], publicKey),
                resHandler(raw),
            )
        }

        if (list) {
            // TODO add parameter checking
            await withLoading(
                `Getting tokens belongs to publicKey "${publicKey}"`,
                () => apiCaller.get('testnet').getOwnedTokens([publicKey]),
                resHandler(raw),
            )
        }

        if (transfer) {
            // TODO add parameter checking
            await withLoading(
                `Transferring token to "${transferTo}"`,
                () => transferToken(apiCaller.get('testnet', privateKey), domain, tokenName, transferTo, ''),
                resHandler(raw),
            )
        }
    },
    help() {
        console.log(`
NFT specific commands
    Examples: 

    * Issue nft ttt1 under domain testdomainfei1
        $ ./yarn dcli nft --issue --tokenName=ttt1 --domain=testdomainfei1 --publicKey=EVT8aNw4NTvjBL1XR6hgy4zcA9jzh1JLjMuAw85mSbW68vYzw2f9H --privateKey=5JswhuLDEq7BENcNsu41Eg7dZCiv4TG8WffTNvbexbC1tyCN9EU

    * List all tokens belongs to a public key
        $ ./yarn dcli nft --list --publicKey=EVT8aNw4NTvjBL1XR6hgy4zcA9jzh1JLjMuAw85mSbW68vYzw2f9H 

    * Transfer nft to another public key
        $ ./yarn dcli nft --transfer --tokenName=ttt --domain=testdomainfei1 --privateKey=5JswhuLDEq7BENcNsu41Eg7dZCiv4TG8WffTNvbexbC1tyCN9EU --transferTo=EVT6VNFZ4KhWgTKxKJKekvyb5Z3sqvqmxViMehPRPXaqyKavbCR7U

        `)
    },
}

module.exports = NFT
