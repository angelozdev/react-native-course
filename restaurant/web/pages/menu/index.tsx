import { Routes } from "@constants";
import { Anchor } from "@features/ui";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="p-4">
      <h1>Menu</h1>
      <Link href={Routes.NEW_DISH} passHref>
        <Anchor color="info">New Dish</Anchor>
      </Link>
    </div>
  );
}
