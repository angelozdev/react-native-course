import { Button, Input, ProgressBar, Select, Textarea } from "@features/ui";
import React, { ChangeEvent, FormEvent } from "react";

// utils
import { selectOptions } from "./add-dish-form.fixtures";
import { validateDish } from "./add-dish-form.utils";

// types
import type { StructError } from "superstruct";
import { dishesService } from "services";
import { useRouter } from "next/router";
import { Routes } from "@constants";
import { uploadImage } from "services/dishes";
import { Unsubscribe } from "firebase/firestore";
type Values = {
  name: string;
  price: number;
  description: string;
  category: string;
  image: File | null;
};

type Event = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

const defaultValues: Values = {
  category: "",
  description: "",
  image: null,
  name: "",
  price: 0,
};

export default function AddDishForm() {
  const [values, setValues] = React.useState<Values>(defaultValues);
  const [error, setError] = React.useState<StructError>();
  const router = useRouter();
  const [isLoading, setIsloading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const unsubscribe = React.useRef<Unsubscribe>(null);

  const handleChange = ({ target }: Event) => {
    const { value, name } = target;
    const { files = [] } = target as HTMLInputElement;
    setError(undefined);
    setValues((prevValues) => {
      const newValues = { ...prevValues, [name]: value };
      if (name === "price") newValues.price = Number(newValues.price);
      if (name === "image") newValues.image = files[0];
      return newValues;
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const [error] = validateDish(values);
    if (error) return setError(error);

    setIsloading(true);

    unsubscribe.current = uploadImage(values.image, {
      onSuccess: async (url) => {
        await dishesService.addOne({ ...values, image: url, available: true });
        setIsloading(false);
        setProgress(100);
        router.replace(Routes.MENU);
      },
      onProgress: (progress) => setProgress(progress - 10),
    });
  };

  React.useEffect(() => {
    return () => unsubscribe.current?.();
  }, []);

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold uppercase">Create Dish</h1>
      <Input
        value={values.name}
        label="Name"
        onChange={handleChange}
        name="name"
        type="text"
        placeholder="Waffles"
        error={error?.key === "name" && error.message}
      />
      <Input
        value={values.price}
        min={0}
        name="price"
        onChange={handleChange}
        label="Price"
        type="number"
        placeholder="$5.000"
        error={error?.key === "price" && error.message}
      />

      <Select
        value={values.category}
        name="category"
        onChange={handleChange}
        label="Category"
        options={selectOptions}
        error={error?.key === "category" && error.message}
      />
      <Input
        onChange={handleChange}
        name="image"
        label="Image"
        type="file"
        accept="image/*"
        error={error?.path[0] === "image" && error.message}
      />

      {!!progress && <ProgressBar progress={progress} />}

      <Textarea
        onChange={handleChange}
        value={values.description}
        name="description"
        placeholder="Waffles..."
        label="Description"
        error={error?.key === "description" && error.message}
      />

      <Button
        disabled={isLoading}
        type="submit"
        className="w-full"
        color="info"
      >
        {isLoading ? "Loading..." : "Create"}
      </Button>
    </form>
  );
}
