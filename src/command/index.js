/* @flow */

import info from './info'
import headBlockHeaderState from './headBlockHeaderState'
import domain from './domain'

type Command = {
    [key: TCommand]: TCommandRunable,
}

const commands: Command = {
    getInfo: info,
    getHeadBlockHeaderState: headBlockHeaderState,
    domain,
}

export default commands
