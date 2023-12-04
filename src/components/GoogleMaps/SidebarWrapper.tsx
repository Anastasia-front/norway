import React from "react";

interface Props {
  children: React.ReactNode;
  className: string;
  isOpened: boolean;
}

export const SidebarWrapper = ({
  children = null,
  className = "",
  isOpened = true,
}: Props) => {
  return (
    <div className={className} style={{ display: isOpened ? "flex" : "none" }}>
      {children}
    </div>
  );
};
