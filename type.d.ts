type Topics = 'orderNew' | 'orderPayed' | 'orderCancelled'
type BloomWeb3 = {
    chains: string
    cryptocurrencies: 'DAI' | 'ETH' | 'USDT'
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
        chain: BloomWeb3['chains']
        contract: BloomWeb3['contractAddresses']
        name: string
    }
    credit_card_gateaway: {
        stripe: {
            secret: string
        }
    }
    bank_accounts?: Array<{
        account_number: string
        bank: string
        beneficiary: string
    }>
    sendgrid_email: {
        api_key: string
        sender: string
        templates: {
            merchant: {
                payment_confirmation: string
                payment_proof: string
                order_cancelled: string
            }
            buyers: {
                payment_confirmation: string
                payment_proof: string
                payment_request: string
                order_cancelled: string
            }
        }
    }
    quickbook: {
        refresh_token: string
        realmId: string
        credentials: {
            client_id: string
            client_secret: string
        }
    }
    name: string
}

type Order = {
    id: string
    isPreOrder?: boolean
    bloom_code: string
    callback_url?: string
    fiat?: {
        currency: string
        price: number
    }
    url_invoice?: string
    order_number: string
    merchant: string | Merchant
    consumer_info: {
        email?: string
        name: string
    }
    status: 'PENDING' | 'IN PROCESS' | 'PAYED' | 'CANCELLED' | 'IN REVIEW' | 'FAILED'
    issued_at: number
    exchange_rates?: number
    cryptocurrency?: {
        token: BloomWeb3['cryptocurrencies']
        price: number
    }
    items: Array<{
        id: string
        description: string
        amount: number
    }>
    payment_info?: {
        issued_at: number
        payment_id: string
    }
}

type Payment = {
    id: string
    date: number
    order_id: string
    pay_with: {
        stripe?: any
        crypto?: any
        bank_transfer: any
        payment_type: string
    }
    status: 'CONFIRMED' | 'IN REVIEW'
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

type EmailData = {
    receiver: {
        email: string
        name: string
    }
    merchant: {
        logo: string
        name: string
    }
    items: {
        description: string
        price: number
    }
}
type CloudFunctions = 'quickbookConnect' | 'quickbookCallback' | 'quickbookRefresh' | 'quickbookGetCustomers' | 'quickbookGetItems' | 'getOrderByBloomCode'
/// intuit o-auth
declare module 'intuit-oauth' {
    import * as csrf from 'csrf'

    interface TokenData {
        realmId?: string
        token_type?: string
        access_token?: string
        refresh_token?: string
        expires_in: number
        x_refresh_token_expires_in: number
        id_token?: string
        latency: number
        createdAt: string
    }

    class Token implements TokenData {
        latency: number

        realmId: string

        token_type: string

        access_token: string

        refresh_token: string

        expires_in: number

        x_refresh_token_expires_in: number

        id_token: string

        createdAt: string

        accessToken(): string

        refreshToken(): string

        tokenType(): string

        getToken(): TokenData

        setToken(tokenData: TokenData): Token

        clearToken(): Token

        isAccessTokenValid(): boolean

        isRefreshTokenValid(): boolean
    }

    class AuthResponse {
        constructor(params: AuthResponse.AuthResponseParams)

        processResponse(response: Record<string, unknown>): void

        getToken(): Token

        text(): string

        status(): number

        headers(): Record<string, unknown>

        valid(): boolean

        getJson(): Record<string, unknown>

        get_intuit_tid(): string

        isContentType(): boolean

        getContentType(): string

        isJson(): boolean
    }

    namespace AuthResponse {
        interface AuthResponseParams {
            token?: Token
            response?: Response
            body?: string
            json?: Record<string, unknown>
            intuit_tid?: string
        }
    }

    class OAuthClient {
        constructor(config: OAuthClient.OAuthClientConfig)

        token: Token

        authHeader(): string

        authorizeUri(params: OAuthClient.AuthorizeParams): string

        createError(e: Error, authResponse?: AuthResponse): OAuthClient.OAuthClientError

        createToken(uri: string): Promise<AuthResponse>

        getKeyFromJWKsURI(id_token: string, kid: string, request: Request): Promise<Record<string, unknown> | string>

        getTokenRequest(request: Request): Promise<AuthResponse>

        getUserInfo(): Promise<AuthResponse>

        isAccessTokenValid(): boolean

        loadResponse(request: Request): Promise<Response>

        loadResponseFromJWKsURI(request: Request): Promise<Response>

        log(level: string, message: string, messageData: unknown): void

        makeApiCall(params?: OAuthClient.MakeApiCallParams): Promise<AuthResponse>

        refresh(): Promise<AuthResponse>

        refreshUsingToken(refresh_token: string): Promise<AuthResponse>

        revoke(params?: OAuthClient.RevokeParams): Promise<AuthResponse>

        setToken(params: TokenData): Token

        validateIdToken(params?: OAuthClient.ValidateIdTokenParams): Promise<Response>

        validateToken(): void
    }

    namespace OAuthClient {
        interface OAuthClientConfig {
            clientId: string
            clientSecret: string
            redirectUri?: string
            environment?: string
            token?: Token
            logging?: boolean
        }

        enum environment {
            sandbox = 'https://sandbox-quickbooks.api.intuit.com/',
            production = 'https://quickbooks.api.intuit.com/'
        }

        enum scopes {
            Accounting = 'com.intuit.quickbooks.accounting',
            Payment = 'com.intuit.quickbooks.payment',
            Payroll = 'com.intuit.quickbooks.payroll',
            TimeTracking = 'com.intuit.quickbooks.payroll.timetracking',
            Benefits = 'com.intuit.quickbooks.payroll.benefits',
            Profile = 'profile',
            Email = 'email',
            Phone = 'phone',
            Address = 'address',
            OpenId = 'openid',
            Intuit_name = 'intuit_name'
        }

        interface AuthorizeParams {
            scope: scopes | scopes[] | string
            state?: csrf
        }

        interface RevokeParams {
            access_token?: string
            refresh_token?: string
        }

        interface MakeApiCallParams {
            url: string
            method: string
            headers?: Record<string, unknown>
            body?: string
        }

        interface ValidateIdTokenParams {
            id_token?: string
        }

        interface OAuthClientError extends Error {
            intuit_tid: string
            authResponse: AuthResponse
            originalMessage: string
            error_description: string
        }
    }
    export = OAuthClient
}

type GasPrice = {
    timestamp: string
    lasstBlok: number
    avgTime: number
    avgTx: number
    avgGas: number
    speeds: Array<{
        acceptance: number
        gasPrice: number
        estimatedFee: number
    }>
}
