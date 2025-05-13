import { useRef } from "react";
import { AriaOverlayProps, useOverlay } from "react-aria";
import { VariantProps } from "tailwind-variants";

import { tv } from "../../../tailwind-merge.config";

const overlayVariants = tv({
  base: "fixed inset-0 flex items-center justify-center z-50 backdrop-filter bg-content/30",
  defaultVariants: {
    blur: "sm",
  },
  variants: {
    blur: {
      lg: "backdrop-blur-lg",
      md: "backdrop-blur-md",
      sm: "backdrop-blur-sm",
      xs: "backdrop-blur-xs",
    },
    contained: {
      true: "absolute",
    },
  },
});

type OverlayProps = AriaOverlayProps &
  VariantProps<typeof overlayVariants> & {
    children?: React.ReactNode;
    className?: string;
  };

const Overlay = ({
  blur,
  children,
  className,
  contained,
  isOpen,
  ...props
}: OverlayProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { overlayProps } = useOverlay(
    {
      isDismissable: false,
      isOpen: isOpen ?? false,
    },
    ref
  );

  if (!isOpen) return null;

  return (
    <div
      {...overlayProps}
      {...props}
      ref={ref}
      className={overlayVariants({ blur, className, contained })}
    >
      {children}
    </div>
  );
};

export default Overlay;
