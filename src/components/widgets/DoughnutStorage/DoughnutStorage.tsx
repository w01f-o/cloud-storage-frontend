"use client";

import { FC, useEffect } from "react";
import { Storage } from "@/types/storage.type";
import styles from "./doughnutStorage.module.scss";
import Chart from "chart.js/auto";

interface DoughnutStorageProps {
  storage: Storage;
}

const DoughnutStorage: FC<DoughnutStorageProps> = ({ storage }) => {
  useEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>(
      `.${styles.canvas}`,
    ) as HTMLCanvasElement;

    const data = Array.from(
      new Set(storage.files.map((file) => file.type)),
    ).map((type) => {
      return storage.files.reduce((acc, current) => {
        if (current.type === type) {
          return acc + current.size;
        }

        return acc;
      }, 0);
    });

    new Chart(canvas, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data,
            backgroundColor: ["#4caf50", "#f44336"],
          },
        ],
      },
    });
  }, [storage.files, storage.freeSpace, storage.usedSpace]);

  return <canvas className={styles.canvas}></canvas>;
};

export default DoughnutStorage;
