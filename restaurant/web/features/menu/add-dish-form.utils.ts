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
  pattern,
  partial,
} from "superstruct";

const MAX_IMAGE_SIZE = 5_242_880; // 5MB

export function validateDish(dish: object) {
  const DishStruct = object({
    name: nonempty(string()),
    price: size(number(), 1, 100_000_000),
    category: nonempty(string()),
    image: nullable(
      object({
        type: pattern(string(), /^image\/(jpeg|png)$/),
        size: size(number(), 1, MAX_IMAGE_SIZE),
      })
    ),
    description: optional(string()),
  });

  return validate(dish, DishStruct);
}

// five mb in bytes
