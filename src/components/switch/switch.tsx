import { motion, MotionProps, useMotionValue, Variants } from "motion/react";
import { useState } from "react";
import {
  Switch as AriaSwitch,
  SwitchProps as AriaSwitchProps,
} from "react-aria-components";
import { VariantProps } from "tailwind-variants";

import { tv } from "../../../tailwind-merge.config";
import { focusStyles } from "../../lib/styling";

const switchVariants = tv({
  defaultVariants: {
    color: "success",
    size: "md",
  },
  slots: {
    base: "group flex gap-2 items-center text-content-fg font-semibold",
    container: [
      "relative flex cursor-default rounded-full shadow-inner bg-neutral transition-colors items-center border-1 border-content/10",
      focusStyles,
    ],
    innerLabel:
      "absolute text-xxs left-0.75 text-black opacity-0 group-data-[selected]:opacity-20 transition-all",
    thumb: "rounded-full bg-white shadow-sm shadow-inner z-1",
  },
  variants: {
    color: {
      success: {
        container: "group-data-[selected]:bg-success",
      },
    },
    size: {
      md: {
        base: "text-sm",
        container: "h-[26px] w-[46px] p-[3px]",
        thumb: "h-[20px]",
      },
    },
  },
});

type SwitchProps = AriaSwitchProps &
  MotionProps &
  VariantProps<typeof switchVariants> & {
    children?: React.ReactNode;
    className?: string;
  };

const sizeToWidth = (
  size: SwitchProps["size"]
): { animate: number; rest: number } => {
  if (size === "md") return { animate: 22, rest: 20 };
  return { animate: 25, rest: 20 };
};

const MotionAriaSwitch = motion.create(AriaSwitch);

const Switch = ({ children, className, size, ...props }: SwitchProps) => {
  const { base, container, innerLabel, thumb } = switchVariants({ size });
  // Track if animating, otherwise initial render and tap cancel cause animate to run
  const [isAnimating, setIsAnimating] = useState(false);

  const { animate, rest } = sizeToWidth(size);
  const thumbAnimations: Variants = {
    rest: { width: rest },
    tapped: { width: animate },
  };

  // Allows smooth start for animation
  const width = useMotionValue(rest);

  return (
    <MotionAriaSwitch
      {...props}
      className={base({ className })}
      whileTap="tapped"
    >
      {({ isSelected }) => (
        <>
          {children}
          <motion.div
            className={container()}
            style={{ justifyContent: isSelected ? "flex-end" : "flex-start" }}
            layout
          >
            <span className={innerLabel()}>ON</span>
            <motion.div
              className={thumb()}
              style={{ width }}
              transition={{ duration: 0.2 }}
              variants={thumbAnimations}
              animate={
                isAnimating && {
                  width: [width.get(), animate, rest],
                }
              }
              onLayoutAnimationComplete={() => {
                setIsAnimating(false);
              }}
              onLayoutAnimationStart={() => {
                setIsAnimating(true);
              }}
              layout
            />
          </motion.div>
        </>
      )}
    </MotionAriaSwitch>
  );
};

export default Switch;
