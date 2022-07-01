export interface TextFieldInterface {
  common: {
    add: string;
    save: string;
    cancel: string;
    noData: string;
  },
  errors: {
    serverErrorTitle: string;
    inputErrors: {
      required: string;
      email: string;
      maxLength: string;
    },
  },
  todo: {
    logo: string;
    inputPlaceholder: string;
    addToDo: string;
    noDataInTable: string;
    tableDate: string;
    tableDescription: string;
    tableAction: string;
  },
  card: {
    cardHeaderText: string;
    noCardText: string;
    createdAt: string;
    surname: string;
    name: string;
    patronymic: string;
    city: string;
    phone: string;
    zipCode: string;
    email: string;
    address: string;
    notes: string;
  },
}
