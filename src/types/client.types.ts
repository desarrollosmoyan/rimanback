export interface ClientSchemaInterface {
  name: string;
  cellphone: string;
  nit: string;
  email: string;
  bill: string;
  orders: [] | null;
}

export interface ClientDocumentInterface
  extends ClientSchemaInterface,
    Document {}
