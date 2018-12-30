/* @flow */

import info from './info'
import help from './help'
import headBlockHeaderState from './headBlockHeaderState'

const commands = {
    getInfo: info,
    getHeadBlockHeaderState: headBlockHeaderState,
    help,
}

export default commands
