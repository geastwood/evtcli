/* @flow */
import { resHandler, withLoading, info } from '../util'
import * as apiCaller from '../apiCaller'

const Info: TCommandRunable = {
    async run({ raw = false }) {
        await withLoading('loading node info', () => apiCaller.get().getInfo(), resHandler(raw))
    },
    help() {
        info('This command prints chain info.')
    },
}

module.exports = Info
