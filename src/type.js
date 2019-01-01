/* @flow */
/* eslint-disable */

declare type TCommand = 'getInfo' | 'getHeadBlockHeaderState' | 'domain' | 'type' | 'nft'

declare type TCommandRunable = {|
    run: (args: any) => mixed,
    help: (args: any) => void,
|}

declare type TNetEnum = 'testnet'

declare type PublicKey = string

declare type KeyProvider = PublicKey | Array<PublicKey>
