/* @flow */

import { info, err } from '../util'
const Info: TCommandRunable = {
    run() {
        try {
            info(`info from getInfo is called`)
        } catch (e) {
            err(`Error occurred`)
            process.exit(1)
        }
    },
    help() {
        console.log(`help section`)
    },
}

module.exports = Info
