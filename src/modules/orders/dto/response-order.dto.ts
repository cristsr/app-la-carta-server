export class ResponseOrderDto {
  _id: string;
  table: string;
  order: {
    name: string;
    price: number;
    quantity: number;
  }[];
  isCompleted: boolean;
  totalPrice: number;
}
