/* @flow */

import info from './info'
import headBlockHeaderState from './headBlockHeaderState'
import domain from './domain'
import nft from './nft'

type Command = {
    [key: TCommand]: TCommandRunable,
}

const commands: Command = {
    getInfo: info,
    getHeadBlockHeaderState: headBlockHeaderState,
    domain,
    nft,
}

export default commands
