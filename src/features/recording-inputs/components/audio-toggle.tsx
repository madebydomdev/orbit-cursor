import { useState } from "react";

import Switch from "../../../components/switch/switch";
import { cn } from "../../../lib/styling";

import AudioMeter from "./audio-meter";

type AudioToggleProps = {
  decibels: number | undefined;
  icon?: React.ReactNode;
};
const AudioToggle = ({ decibels, icon }: AudioToggleProps) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex flex-col gap-1 grow basis-0">
      <div className="flex flex-row gap-2">
        <Switch
          className="justify-between w-full pl-2 py-1"
          isSelected={isOn}
          onChange={setIsOn}
          size="xs"
        >
          <div
            className={cn(
              "flex flex-row gap-2 transition-colors",
              isOn ? "text-content-fg" : "text-muted/75"
            )}
          >
            {icon}
            System Audio
          </div>
        </Switch>
      </div>

      <AudioMeter
        decibels={decibels ?? -Infinity}
        disabled={!isOn}
        disabledIcon={null}
        height={5}
        orientation="horizontal"
        width="100%"
      />
    </div>
  );
};

export default AudioToggle;
