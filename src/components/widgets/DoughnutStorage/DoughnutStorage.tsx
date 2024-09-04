"use client";

import { FC, useEffect } from "react";
import { Storage } from "@/types/storage.type";
import styles from "./doughnutStorage.module.scss";
import { Chart, registerables } from "chart.js";
import { Utils } from "@/services/utils";

Chart.register(...registerables);

interface DoughnutStorageProps {
  storage: Storage;
}

const DoughnutStorage: FC<DoughnutStorageProps> = ({ storage }) => {
  useEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>(
      `#doughnut-canvas`,
    ) as HTMLCanvasElement;
    const data = storage.category.map((item) => item.size);
    const labels = storage.category.map((item) => item.type);
    const colors = labels.map((label) => Utils.getInfoStyles(label).color);

    const chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            enabled: false,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [storage.category]);

  return (
    <div className={styles.wrapper}>
      <canvas id="doughnut-canvas"></canvas>
    </div>
  );
};

export default DoughnutStorage;
