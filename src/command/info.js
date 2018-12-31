/* @flow */
import { withLoading, info, render, err } from '../util'
import * as apiCaller from '../apiCaller'

const Info: TCommandRunable = {
    async run({ raw = false }) {
        await withLoading(
            'loading chain info',
            () => apiCaller.get().getInfo(),
            (e, rst) => {
                if (e) {
                    err(`Error occurred.`, e)
                    process.exit(1)
                }

                render(rst, raw)
            },
        )
    },
    help() {
        info('This command prints chain info.')
    },
}

module.exports = Info
