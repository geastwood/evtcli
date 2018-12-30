#!/usr/bin/env node
/* @flow */

import commands from './command'
import minimist from 'minimist'
import { err } from './util'
import R from 'ramda'

const args = minimist(process.argv.slice(2))
// $FlowFixMe
const command: TCommand = R.head(args._)
// $FlowFixMe
const commandWhiteList: TCommandSupported = ['getInfo']

// Checking top level commands
if (!commandWhiteList.includes(command)) {
    err(`only commands in list "[${commandWhiteList.join(', ')}]" are supported`)
    process.exit(1)
}

const run = async () => {
    const passDownArgs = R.omit(['_'], args)

    if (passDownArgs.help) {
        commands[command].help()
        process.exit(0)
    }

    await commands[command].run(R.omit(['help'], passDownArgs))
    process.exit(0)
}

run()
