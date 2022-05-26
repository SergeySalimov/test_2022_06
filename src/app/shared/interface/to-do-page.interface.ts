export interface TodoListItem {
  id: string;
  createdAt: Date;
  description: string;
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
