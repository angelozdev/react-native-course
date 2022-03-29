import { OrderItem } from "@features/orders";
import React from "react";
import { ordersService } from "services";

// types
import type { Order } from "services/resourses";

export default function Home() {
  const [orders, setOrders] = React.useState<Order[]>([]);

  React.useEffect(() => {
    const unsubscribe = ordersService.getAllRT({
      onNext: setOrders,
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateOrder = React.useCallback(
    async (id: Order["id"], data: Partial<Order>) => {
      await ordersService.updateById(id, data);
    },
    []
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Orders</h1>
      <ul className="grid gap-2 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {orders.map((order, index) => (
          <OrderItem
            key={order.id}
            onUpdate={handleUpdateOrder}
            index={index + 1}
            {...order}
          />
        ))}
      </ul>
    </div>
  );
}
