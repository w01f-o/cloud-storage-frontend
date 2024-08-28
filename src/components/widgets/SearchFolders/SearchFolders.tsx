"use client";

import { ChangeEvent, FC } from "react";
import { SearchIcon } from "lucide-react";
import Field from "@/components/shared/UI/Field/Field";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";

const SearchFoldersForm: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const debouncedChangeHandler = useDebounceCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e;
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", value);

      if (value === "") {
        router.push(`${pathname}`);
      } else {
        router.push(`${pathname}?${params.toString()}`);
      }
    },
    500,
  );

  return (
    <Field
      placeholder="Поиск папок"
      icon={{ element: <SearchIcon />, position: "left" }}
      onChange={debouncedChangeHandler}
    />
  );
};

export default SearchFoldersForm;
