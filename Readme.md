# Evtjs command line wrapper

This is only used for testing purposes.

## Usage

### Install dependencies

`./yarn`

### Introduction

* All the api calls by default use *testnet*.

* global flags
    * --raw forces to print raw json, otherwise will pretty print json


### Commands

`./yarn dcli getInfo`


`./yarn dcli getHeadBlockHeaderState`


```
// Create a domain

./yarn dcli domain --create --domain=testdomainfei1 --publicKey=EVT8aNw4NTvjBL1XR6hgy4zcA9jzh1JLjMuAw85mSbW68vYzw2f9H --privateKey=5JswhuLDEq7BENcNsu41Eg7dZCiv4TG8WffTNvbexbC1tyCN9EU
```

```
// List all domains

./yarn dcli domain --list --created --publicKey=EVT8aNw4NTvjBL1XR6hgy4zcA9jzh1JLjMuAw85mSbW68vYzw2f9H
```
   
```
// List domain detail by name

./yarn dcli domain --list --domain=testdomainfei1 --raw
```

## Fixture data

private key: `5JswhuLDEq7BENcNsu41Eg7dZCiv4TG8WffTNvbexbC1tyCN9EU`

public key: `EVT8aNw4NTvjBL1XR6hgy4zcA9jzh1JLjMuAw85mSbW68vYzw2f9H`

private key 1: `5JuCCq8aw8p6MNXzCwar1SiNwkvf8quffwFVx1WxHrSwMe5RdKQ`

public key 1: `EVT6VNFZ4KhWgTKxKJKekvyb5Z3sqvqmxViMehPRPXaqyKavbCR7U`
