export interface IMagaluProductService {
  show: (externalProductId: string) => Promise<any>
}
