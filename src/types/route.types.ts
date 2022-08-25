export interface RouteSchemaInterface {
  name: string;
  towns: [];
}
export interface RouteDocumentInterface
  extends RouteSchemaInterface,
    Document {}
