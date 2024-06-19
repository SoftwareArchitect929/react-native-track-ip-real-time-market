export type IPDetails = {
    ip: string;
    city?: string;
    country_code?: string;
    postal?: string;
    timezone: {
        abbr: string;
        utc: string;
    }
    connection: {
        isp?: string;
    }
}

export type TiingoData = {
    messageType: string;
    service: string;
    data: (string | number)[]
}
