"use client";

import { FC } from "react";
import ReactPortal from "@/components/features/ReactPortal/ReactPortal";
import styles from "./uploadProgress.module.scss";
import { useUploadedFiles } from "@/hooks/useUploadedFiles";
import UploadProgressItem from "@/components/widgets/Files/UploadProgress/UploadProgressItem";
import { animated, useTransition } from "@react-spring/web";

const UploadProgress: FC = () => {
  const { files } = useUploadedFiles();

  const transition = useTransition(files.length, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 },
  });

  return transition(
    (props, item) =>
      !!item && (
        <ReactPortal>
          <animated.div className={styles.wrapper} style={props}>
            {files.map((file) => (
              <UploadProgressItem file={file} key={file.id} />
            ))}
          </animated.div>
        </ReactPortal>
      ),
  );
};

export default UploadProgress;
