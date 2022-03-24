import { Switch } from "@features/ui";
import Image from "next/image";
import { Dish } from "services/resourses";

// types
interface Props {
  available: Dish["available"];
  name: Dish["name"];
  image: Dish["image"];
  price: Dish["price"];
  onUpdate: (partialDish: Omit<Partial<Dish>, "id">) => void;
}

export default function DishItem({
  available,
  name,
  image,
  price,
  onUpdate,
}: Props) {
  return (
    <li
      className={`relative p-3 hover:-translate-y-0.5 hover:shadow-md transition-all shadow border rounded overflow-hidden ${
        available
          ? ""
          : "opacity-50 bg-slate-50 select-none shadow-none hover:shadow-none"
      }`}
    >
      <div className="absolute top-5 right-5 z-10 ">
        <Switch
          onChange={({ target: { checked } }) =>
            onUpdate({ available: checked })
          }
          checked={available}
        />
      </div>

      <figure className="relative aspect-[3/2] rounded overflow-hidden">
        <Image
          layout="fill"
          className="object-cover w-full"
          src={image}
          alt={name}
        />
      </figure>

      <div className="my-2">
        <h4 className="font-semibold text-sm text-teal-900 uppercase">
          {name}
        </h4>
        <p className="text-sm font-medium text-yellow-900">
          {price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
          })}
        </p>
      </div>
    </li>
  );
}
