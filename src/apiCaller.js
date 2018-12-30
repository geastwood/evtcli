/* @flow */

import evt from 'evtjs'
import * as nets from './net'

export const get = (net: TNetEnum = 'testnet', keyProvider: KeyProvider = []) =>
    evt({ endpoint: nets[net], keyProvider })
