import {
  instance,
  nonempty,
  nullable,
  number,
  object,
  optional,
  size,
  string,
  validate,
} from "superstruct";

export function validateDish(dish: object) {
  const DishStruct = object({
    name: nonempty(string()),
    price: size(number(), 1, 100_000_000),
    category: nonempty(string()),
    image: nullable(instance(File)),
    description: optional(string()),
  });

  return validate(dish, DishStruct);
}
