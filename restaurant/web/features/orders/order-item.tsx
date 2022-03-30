// types
import { Button } from "@features/ui";
import Image from "next/image";
import { ChangeEvent } from "react";
import type { Order, CartItem } from "services/resourses";
import { currencyUtils } from "utils";
import { colorsByStatus } from "./utils";
interface Props extends Order {
  index: number;
  onUpdate: (id: Order["id"], data: Partial<Order>) => void;
  onDelete?: (id: Order["id"]) => void;
}

export default function OrderItem(props: Props) {
  const { index, count, items, total, status, id, onUpdate, onDelete } = props;

  const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as any;
    onUpdate(id, { status });
  };

  return (
    <li className={`border shadow-sm`}>
      <div className="p-4 pb-0">
        <div className="flex justify-between">
          <h3 className="font-semibold">Order #{index}</h3>
          <span className="text-gray-600">{count} items</span>
        </div>
        <div className="flex justify-between w-full mt-2">
          <span>Total: {currencyUtils.formatPrice(total)}</span>

          <select
            onChange={handleChangeStatus}
            className={`p-1 rounded-md cursor-pointer bg-white border ${colorsByStatus[status]}`}
            value={status}
            name="status"
          >
            <option className="text-black" value="pending">
              Pending
            </option>
            <option className="text-black" value="delivered">
              Delivered
            </option>
            <option className="text-black" value="cancelled">
              Cancelled
            </option>
          </select>
        </div>
        {onDelete && (
          <Button onClick={() => onDelete(id)} color="danger">
            Delete
          </Button>
        )}
      </div>

      <details>
        <summary className="cursor-pointer p-4">Items</summary>
        <ul>
          {items.map((item) => (
            <ProductItem key={item.id} {...item} />
          ))}
        </ul>
      </details>
    </li>
  );
}

function ProductItem(props: CartItem) {
  const { name, description, image, quantity } = props;
  return (
    <li className="border-t p-4 border-gray-200">
      <div className="flex gap-2 items-center">
        <figure className="basis-20 h-20 w-20 relative rounded-md overflow-hidden">
          <Image layout="fill" objectFit="cover" alt={name} src={image} />
        </figure>

        <div className="flex-1">
          <p className="font-semibold">
            {name} (x{quantity})
          </p>
          <p className="text-sm leading-tight line-clamp-2">{description}</p>
        </div>
      </div>
    </li>
  );
}
