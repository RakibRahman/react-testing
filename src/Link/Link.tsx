import { useState, FC } from "react";

const STATUS = {
  HOVERED: "hovered",
  NORMAL: "normal",
};

interface Props {
  page: string;
  children: React.ReactNode;
}

export default function Link({ page, children }: Props) {
  const [status, setStatus] = useState(STATUS.NORMAL);

  const onMouseEnter = () => {
    setStatus(STATUS.HOVERED);
  };

  const onMouseLeave = () => {
    setStatus(STATUS.NORMAL);
  };

  return (
    <a
      data-testid="link"
      className={status}
      href={page || "#"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}
