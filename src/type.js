/* @flow */
/* eslint-disable */

declare type TCommand = 'getInfo'

declare type TCommandRunable = {|
    run: (args: any) => mixed,
    help: (args: any) => void,
|}
