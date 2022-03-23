import { Routes } from "@constants";
import { DishList } from "@features/menu";
import { Anchor } from "@features/ui";
import Link from "next/link";
import React from "react";
import { dishesService } from "services";

// types
import { Dish } from "services/resourses";

export default function Menu() {
  const [dishes, setDishes] = React.useState<Dish[]>([]);
  const unsubscribe = React.useRef(null);

  React.useEffect(() => {
    (async () => {
      unsubscribe.current = await dishesService.getAllRT({
        onSuccess: setDishes,
      });
    })();

    return () => {
      unsubscribe.current && unsubscribe.current();
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold uppercase">Menu</h1>

      <Link href={Routes.NEW_DISH} passHref>
        <Anchor color="info">New Dish</Anchor>
      </Link>

      <DishList dishes={dishes} />
    </div>
  );
}
