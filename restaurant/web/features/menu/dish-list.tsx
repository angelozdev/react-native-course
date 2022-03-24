import React from "react";
import { dishesService } from "services";
import { Dish } from "services/resourses";
import DishItem from "./dish-item";

interface Props {
  dishes: Dish[];
}

export default function DishList({ dishes }: Props) {
  const handleUpdate = React.useCallback(
    async (id: Dish["id"], data: Omit<Partial<Dish>, "id">) => {
      dishesService.updateById(id, data);
    },
    []
  );

  return (
    <ul className="my-4 gap-4 grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
      {dishes.map((dish) => {
        const {
          id,
          name,
          price,
          available,
          image = "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg",
        } = dish;
        return (
          <DishItem
            key={id}
            available={available}
            image={image}
            name={name}
            price={price}
            onUpdate={(data: Omit<Partial<Dish>, "id">) =>
              handleUpdate(id, data)
            }
          />
        );
      })}
    </ul>
  );
}
