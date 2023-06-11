"use client";
import React, { useState } from "react";
import styles from "./<%= name  %>.module.scss";

export interface <%= name  %>Props {
  children: React.ReactNode
}

export function <%= name  %>({ children }: <%= name  %>Props) {
  const [isOpen, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <div className={styles.<%= name  %>}>
      {children}
    </div>
  );
}
