export class CreateOrderDto {
  userId: string;
  tableId: string;
  orders: [
    {
      id: string;
      price: number;
      dishes: [
        {
          id: string;
          name: string;
          price: number;
          quantity: number;
        },
      ];
    },
  ];
}
