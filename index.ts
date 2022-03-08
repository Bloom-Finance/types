type BloomWeb3 = {
    chains: "string"
    cryptocurrencies: "DAI" | "ETH" | "USDT"
    contractAddresses: string
}
type User = {
    wallet_id: string
    merchants?: Array<{
        merchant: Merchant
        role: string
    }>
}
type Merchant = {
    id?: string
    company: string
    bussiness_currency: string
    company_logo: string
    withdrawalAddress: {
        chain: BloomWeb3["chains"]
        contract: BloomWeb3["contractAddresses"]
        name: string
    }
}
type Order = {
    id: string
    fiat: {
        currency: string
        price: number
    }
    order_number: string
    merchant: Merchant
    description: string
    status: string
    issued_at: number
    exchange_rates: number
    cryptocurrency: {
        token: BloomWeb3["cryptocurrencies"]
        price: number
    }
}

type SessionUser = {
    wallet_id: string
    merchants: Array<{
        merchant: string
        role: string
    }>
}

type MerchantCredential = {
    id: string
    merchantId: string
}
