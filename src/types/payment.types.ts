export interface PaymentSchemaInterface {
  name: string;
  cellphone: string;
  nit: string;
  email: string;
  orders: [];
}

export interface PaymentDocumentInterface
  extends PaymentSchemaInterface,
    Document {}
