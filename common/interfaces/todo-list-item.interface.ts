export interface TodoListItemDto {
    description: string;
    createdAt: Date;
    id: string;
    pollStatus: number;
    name?: string;
    surname?: string;
    patronymic?: string;
    email?: string;
    phone?: string;
    zipCode?: number;
    city?: string;
    address?: string;
    notes?: string;
}
