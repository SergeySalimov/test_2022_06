export interface TodoListItem {
  createdAt: Date;
  description: string;
  id?: string;
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