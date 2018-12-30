/* @flow */

import chalk from 'chalk'
import prettyjson from 'prettyjson'
import pkg from '../package.json'

export const err = (msg: string) => {
    console.log(chalk.red(`[${pkg.name.toUpperCase()}/ERROR]:`), msg)
}

export const warn = (msg: string) => {
    console.log(chalk.yellow(`[${pkg.name.toUpperCase()}/WARN]:`), msg)
}

export const success = (msg: string) => {
    console.log(chalk.green(`[${pkg.name.toUpperCase()}/SUCCESS]:`), msg)
}

export const info = (msg: string, ...rest: string[]) => {
    console.log(chalk.blue(`[${pkg.name.toUpperCase()}/INFO]:`), msg, ...rest)
}

export const assertString = (v: any, msg: string = 'valid string required') => {
    if (!v || typeof v !== 'string') {
        err(msg)
        process.exit(1)
    }
}

export const assertNotNull = (v: any, msg: string = 'Not null or undefined') => {
    if (!v) {
        err(msg)
        process.exit(1)
    }
}

export const render = (data: JSON) => console.log(prettyjson.render(data))
