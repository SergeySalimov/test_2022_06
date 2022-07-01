export type SortFieldType = 'date' | 'description';
export type SortDirectionType = 'asc' | 'desc' | null;
export type ISort = Record<SortFieldType, SortDirectionType>;