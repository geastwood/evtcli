/* @flow */

import chalk from 'chalk'
import prettyjson from 'prettyjson'
import pkg from '../package.json'
import ora from 'ora'

const spinner = ora()
export const err = (msg: string, e?: Error) => {
    console.log(chalk.red(`[${pkg.name.toUpperCase()}/ERROR]:`), msg)
    if (e) {
        console.error(e)
    }
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

export const assertString = (v: mixed, msg: string = 'valid string required') => {
    if (v === null || v === undefined || typeof v !== 'string') {
        throw new Error(msg)
    }
}

export const assertNotNull = (v: any, msg: string = 'Not null or undefined') => {
    if (!v) {
        err(msg)
        process.exit(1)
    }
}

export const render = (data: JSON, raw: boolean = false) => {
    if (raw) {
        console.log(JSON.stringify(data, null, 4))
        return
    }
    console.log(prettyjson.render(data))
}

export const loading = (msg: string) => {
    spinner.text = msg
    spinner.start()
}

export const loadingStop = () => {
    spinner.stop()
}

export const withLoading = async (msg: string, fn: Function, cb: (err: null | Error, rst: any) => any) => {
    let rst = {}
    let error = null

    // init spinner
    spinner.color = 'blue'
    spinner.text = `${msg}...`
    spinner.start()

    try {
        rst = await fn()
        spinner.succeed(`${msg} ${chalk.green('[Succeed]')}`)
    } catch (e) {
        error = e
        spinner.fail(`${msg} ${chalk.red('[Failed]')}`)
    } finally {
        spinner.stop()
    }

    cb(error, rst)
}

export const handleError = (error: ?Error) => {
    if (error) {
        err('', error)
        process.exit(1)
    }
}

export const resHandler = (raw: boolean) => (e: null | Error, data: any) => {
    handleError(e)
    render(data, raw)
    process.exit(0)
}
