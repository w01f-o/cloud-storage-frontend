"use client";

import { FC, memo } from "react";
import Link from "next/link";
import CellsModeIcon from "@/components/shared/Icons/CellsModeIcon";
import RowModeIcon from "@/components/shared/Icons/RowModeIcon";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./viewModeSwitcher.module.scss";
import { RootDictionary } from "@/types/dictionaries.type";

interface ViewModeSwitcherProps {
  dict: RootDictionary;
}

const ViewModeSwitcher: FC<ViewModeSwitcherProps> = ({ dict }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const href = (mode: "row" | "cells") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", mode);

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className={styles.wrapper}>
      <Link href={href("cells")} title={dict.folders.view.cells}>
        <CellsModeIcon
          isActive={
            searchParams.get("view") === "cells" || !searchParams.get("view")
          }
        />
      </Link>
      <Link href={href("row")} title={dict.folders.view.row}>
        <RowModeIcon isActive={searchParams.get("view") === "row"} />
      </Link>
    </div>
  );
};

export default memo(ViewModeSwitcher);
