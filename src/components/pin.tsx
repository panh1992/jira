import { Rate } from "antd";
import React from "react";

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckChange?: (checked: boolean) => void;
}

export const Pin = (props: PinProps) => {
  const { checked, onCheckChange, ...restProps } = props;

  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckChange?.(!!num)}
      {...restProps}
    />
  );
};
