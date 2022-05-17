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
    credit_card_gateaway:{
        stripe:{
            secret:string
        }
    }
    sendgrid_email:{
        api_key:string
        sender:string
        templates:{
          merchant:{
            payment_confirmation:string
            payment_proof:string
            order_cancelled:string
          }
          buyers:{
            payment_confirmation:string
            payment_proof:string
            payment_request:string
            order_cancelled:string
          }
        }
    }
}
type Order = {
    id: string
    fiat: {
        currency: string
        price: number
    }
    order_number: string
    merchant: string
    description: string
    status: string
    issued_at: number
    exchange_rates: number
    cryptocurrency: {
        token: BloomWeb3["cryptocurrencies"]
        price: number
    }
    consumer_info:{
        email:string
        name:string
    }
    items: Array<{
        id: string
        description: string
        amount: number
    }>
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

type EmailData={
    receiver:{
        email:string,
        name:string
    }
    merchant:{
        logo:string
        name:string
    }
    items:{
        description:string
        price:number
    }
}
