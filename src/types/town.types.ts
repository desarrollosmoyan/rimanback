export interface TownSchemaInterface {
  name: string;
  clients: [];
}

export interface TownDocumentInterface extends TownSchemaInterface, Document {}
