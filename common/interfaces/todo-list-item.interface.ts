export interface TodoListItemDto {
    createdAt: Date;
    description: string;
    pollStatus?: number;
    id: string;
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
