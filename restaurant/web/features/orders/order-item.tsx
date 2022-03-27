// types
import Image from "next/image";
import type { Order, CartItem } from "services/resourses";
import { currencyUtils } from "utils";
interface Props extends Order {
  index: number;
}

export default function OrderItem({ index, count, items, total }: Props) {
  return (
    <li className="border shadow-sm">
      <div className="p-4 pb-0">
        <div className="flex justify-between">
          <h3 className="font-semibold">Order #{index}</h3>
          <span className="text-gray-600">{count} items</span>
        </div>
        <span>Total: {currencyUtils.formatPrice(total)}</span>
      </div>

      <details open>
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
