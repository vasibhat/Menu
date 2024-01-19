const order = [
  {
    table: "1",
    menuItems: [
      {
        name: "Chicken Alfredo Pasta",
        qty: 1,
        price: 18.99,
      },
      {
        name: "Caesar Salad",
        qty: 2,
        price: 9.99,
      },
    ],
    foodPrice: 38.97,
    taxPrice: 3.5,
    totalPrice: 42.47,
    isPaid: true,
    paidAt: {
      txn_id: "txn_1F3x2Y2eZvKYlo2C0mPjzsu0",
      status: "completed",
      update_time: "2023-01-20T10:00:00Z",
      email_address: "customer@example.com",
      phone_number: "123-456-7890",
    },
    isDelivered: true,
    deliveredAt: "2023-01-20T12:00:00Z",
  },
];

export default order;
