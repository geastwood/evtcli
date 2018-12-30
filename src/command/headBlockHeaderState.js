/* @flow */
import { info, err, render } from '../util'
import * as apiCaller from '../apiCaller'

const Info: TCommandRunable = {
    async run() {
        try {
            const rst = await apiCaller.get().getHeadBlockHeaderState()
            render(rst)
        } catch (e) {
            err(`Error occurred, ${e}`)
            process.exit(1)
        }
    },
    help() {
        info('This command get the head block header.')
    },
}

module.exports = Info
