export interface IFilter {
    dateFrom: Date|null,
    dateTill: Date|null,
    description: string|null,
    status: number|null|'null',
}

export interface StatusEnumDto {
    value: number,
    key: string,
}
