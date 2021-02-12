export class CreateOrderDto {
  userId: string;
  tableId: string;
  orders: [
    {
      id: string;
      name: string;
    },
  ];
}
