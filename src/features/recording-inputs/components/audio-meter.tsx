import { VariantProps } from "tailwind-variants";

import { tv } from "../../../../tailwind-merge.config";

const decibelToPercentage = (decibels: number) => {
  if (decibels <= -99) return 0;
  if (decibels <= -30) return ((decibels + 99) / 69) * 20;
  if (decibels <= -10) return 20 + ((decibels + 30) / 20) * 55;
  if (decibels <= 0) return 75 + ((decibels + 10) / 10) * 25;
  return 100;
};

const decibelsToLabel = (decibels: number) => {
  if (decibels > 0) return "0";
  if (decibels < -99) return "-∞";
  return (Math.round(decibels * 10) / 10).toString();
};

const audioMeterVariants = tv({
  defaultVariants: {
    orientation: "vertical",
  },
  slots: {
    base: "flex items-center",
    label: "text-xxs font-semibold",
    meter: "bg-content-fg rounded-sm transition-all",
    meterContainer:
      "flex items-end bg-neutral rounded-sm overflow-hidden relative",
  },
  variants: {
    orientation: {
      horizontal: {
        base: "flex-row-reverse gap-2 w-full",
        label: "w-7 text-right",
      },
      vertical: {
        base: "flex-col gap-0.5",
      },
    },
  },
});

type AudioMeterProps = VariantProps<typeof audioMeterVariants> & {
  decibels: number;
  height?: number | string;
  width?: number | string;
};

const AudioMeter = ({
  decibels,
  height = 40,
  orientation = "vertical",
  width = 40,
}: AudioMeterProps) => {
  const { base, label, meter, meterContainer } = audioMeterVariants({
    orientation,
  });

  const color =
    decibels < -20
      ? "var(--color-success)"
      : decibels < -8
      ? "var(--color-warning)"
      : "var(--color-error)";

  const fillPercentage = decibelToPercentage(decibels).toString() + "%";

  return (
    <div className={base()}>
      <div className={meterContainer()} style={{ height, width }}>
        <div
          className={meter()}
          style={{
            background: color,
            height: orientation === "vertical" ? fillPercentage : "100%",
            width: orientation === "horizontal" ? fillPercentage : "100%",
          }}
        />
      </div>

      <span
        className={label()}
        style={{
          color,
        }}
      >
        {decibelsToLabel(decibels)}
      </span>
    </div>
  );
};

export default AudioMeter;
