export type Address= {
    alias: string
    name: string
    address: string
    number: string
}

export type Payment = {
    alias: string
    name: string
    label: string
    expiry: string
}

export type Preset = {
    address: Address
    payment: Payment
}

export const addresses:Address[] = [
    {alias:"John’s House", name:"John Doe", address:"123 ALPHABET STR, CITY, ZC, 11111-1111, United States", number:"+12223334444"},
    {alias:"Jane’s apartment", name:"Jane Doe", address:"234 NUMBERS AVE, CITY, ZC, 11111-1111, United States", number:"+13334442222"},
    {alias:"Dohn’s house", name:"Dohn Joe", address:"345 LETTERS COURT, CITY, ZC, 11111-1111, United States", number:"+14443332222"}
]

export const payments:Payment[] = [
    {alias:"John (Visa)", name:"John Doe", label:"Visa ending in 1111", expiry:"MM/YYYY"},
    {alias:"Jane’s rewards card", name:"Jane Doe", label:"Mastercard ending in 2222", expiry:"MM/YYYY"},
    {alias:"Dohn’s Card", name:"Dohn Joe", label:"Amex ending in 3333", expiry:"MM/YYYY"}
]

export const presets:Preset[] = [
    {address: addresses[0], payment:payments[0]},
    {address: addresses[1], payment:payments[1]},
    {address: addresses[2], payment:payments[2]}
]