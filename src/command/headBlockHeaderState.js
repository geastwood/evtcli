/* @flow */
import { resHandler, withLoading, info } from '../util'
import * as apiCaller from '../apiCaller'

const Info: TCommandRunable = {
    async run({ raw }) {
        await withLoading(
            'loading head block header state',
            () => apiCaller.get().getHeadBlockHeaderState(),
            resHandler(raw),
        )
    },
    help() {
        info('This command get the head block header.')
    },
}

module.exports = Info
