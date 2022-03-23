import React from "react";
import styles from "./progress-bar.module.css";

interface Props {
  progress: number;
}

export default function ProgressBar({ progress: _progress }: Props) {
  const progress = Math.min(Math.max(_progress, 0), 100);

  return (
    <div role="progressbar" className={styles.container}>
      <div className={styles["progress-bar"]} style={{ width: `${progress}%` }}>
        {progress}%
      </div>
    </div>
  );
}
