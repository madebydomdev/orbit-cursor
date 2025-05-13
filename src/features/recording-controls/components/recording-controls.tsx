import { invoke } from "@tauri-apps/api/core";
import {
  AppWindowMac,
  Circle,
  CircleX,
  Monitor,
  SquareDashed,
} from "lucide-react";

import Button from "../../../components/button/button";
import Keyboard from "../../../components/keyboard/keyboard";
import RadioGroup from "../../../components/radio-group/radio-group";
import Separator from "../../../components/separator/separator";
import { Commands } from "../../../types/api";

import IconRadio from "./icon-radio";

const RecordingControls = () => {
  return (
    <div className="flex items-center justify-center">
      <Button
        className="self-stretch"
        onPress={() => void invoke(Commands.HideStartRecordingDock)}
        variant="ghost"
      >
        <div className="flex flex-col gap-1 items-center">
          <CircleX />
          <Keyboard size="xs">Esc</Keyboard>
        </div>
      </Button>

      <Separator className="h-[60px]" orientation="vertical" spacing="sm" />

      <RadioGroup
        aria-label="Recording type"
        className="grow"
        defaultValue="region"
        orientation="horizontal"
      >
        <IconRadio
          aria-label="Region"
          icon={<SquareDashed size={30} />}
          shortcut={<Keyboard size="xs">1</Keyboard>}
          subtext="Region"
          value="region"
        />

        <IconRadio
          aria-label="Window"
          icon={<AppWindowMac size={30} />}
          shortcut={<Keyboard size="xs">2</Keyboard>}
          subtext="Window"
          value="window"
        />

        <IconRadio
          aria-label="Screen"
          icon={<Monitor size={30} />}
          shortcut={<Keyboard size="xs">3</Keyboard>}
          subtext="Screen"
          value="screen"
        />
      </RadioGroup>

      <Separator className="h-[60px]" orientation="vertical" spacing="sm" />

      <Button className="self-stretch" variant="ghost">
        <div className="flex flex-col gap-1 items-center">
          <Circle size={40} />
          <Keyboard size="xs">Enter</Keyboard>
        </div>
      </Button>
    </div>
  );
};

export default RecordingControls;
