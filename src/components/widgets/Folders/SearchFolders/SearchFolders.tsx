"use client";

import { ChangeEvent, FC, memo } from "react";
import { SearchIcon } from "lucide-react";
import Field from "@/components/shared/UI/Field/Field";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useDebounceCallback } from "usehooks-ts";
import { RootDictionary } from "@/types/dictionaries.type";

interface SearchFoldersProps {
  dict: RootDictionary;
}

const SearchFolders: FC<SearchFoldersProps> = ({ dict }) => {
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
        params.delete("search");
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    200,
  );

  return (
    <Field
      placeholder={dict.folders.search}
      icon={{ element: <SearchIcon />, position: "left" }}
      onChange={debouncedChangeHandler}
      defaultValue={searchParams.get("search") || ""}
      autoFocus={!!searchParams.get("search")}
    />
  );
};

export default memo(SearchFolders);
