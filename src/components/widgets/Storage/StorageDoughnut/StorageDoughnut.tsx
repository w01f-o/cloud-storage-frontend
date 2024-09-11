"use client";

import { FC, useEffect } from "react";
import { Storage } from "@/types/entities/storage.type";
import styles from "./storageDoughnut.module.scss";
import { Chart, registerables } from "chart.js";
import { Utils } from "@/services/utils";
import { useTheme } from "@/hooks/useTheme";

Chart.register(...registerables);

interface StorageDoughnutProps {
  storage: Storage;
}

const StorageDoughnut: FC<StorageDoughnutProps> = ({ storage }) => {
  const theme = useTheme();

  useEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>(
      `#doughnut-canvas`,
    ) as HTMLCanvasElement;

    const data = storage.category.map((item) => item.size);
    const labels = storage.category.map((item) => item.type);
    const colors = labels.map(
      (label) =>
        Utils.getFileStyles(label, theme.current === "light" ? 0.5 : 0.7).color,
    );

    const chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: data.length > 0 ? data : [1],
            backgroundColor: data.length > 0 ? colors : `rgba(161,64,255,0.5)`,
            hoverOffset: 5,
            borderRadius: 5,
            borderColor: "#f1f3f6",
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            enabled: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      chart.destroy();
    };
  }, [storage.category, theme]);

  return (
    <div className={styles.wrapper}>
      <canvas id="doughnut-canvas"></canvas>
    </div>
  );
};

export default StorageDoughnut;
