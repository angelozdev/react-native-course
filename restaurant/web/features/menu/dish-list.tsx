import { Input } from "@features/ui";
import { Dish } from "services/resourses";

interface Props {
  dishes: Dish[];
}

export default function DishList({ dishes }: Props) {
  return (
    <ul className="my-4 gap-4 grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      {dishes.map(
        ({
          id,
          name,
          price,
          available,
          image = "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg",
        }) => (
          <li
            className={`px-3 hover:-translate-y-0.5 py-2 hover:shadow-md transition-all shadow border rounded overflow-hidden max-w-[200px] ${
              available
                ? ""
                : "hover:-translate-y-0 opacity-50 bg-slate-50 select-none shadow-none hover:shadow-none"
            }`}
            key={id}
          >
            <img
              className="min-h-[150px] object-cover w-full aspect-square"
              src={image}
              alt={name}
            />

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

              <input checked={available} type="checkbox" />
            </div>
          </li>
        )
      )}
    </ul>
  );
}
