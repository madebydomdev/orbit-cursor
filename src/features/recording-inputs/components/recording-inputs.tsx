import { listen, UnlistenFn } from "@tauri-apps/api/event";
import { Mic, Volume2 } from "lucide-react";
import { useEffect } from "react";

import {
  PermissionType,
  usePermissionsStore,
} from "../../../stores/permissions.store";
import {
  updateStandaloneListBoxStore,
  useStandaloneListBoxStore,
} from "../../../stores/standalone-listbox.store";
import { Events } from "../../../types/events";

import AudioSelect from "./audio-select";

const ICON_SIZE = 14;

enum ListBoxes {
  SystemAudio = "system-audio",
  MicrophoneAudio = "microphone-audio",
}

const RecordingInputs = () => {
  const permissions = usePermissionsStore((state) => state.permissions);
  const { closeListBox } = useStandaloneListBoxStore((state) => state);

  useEffect(() => {
    let unlisten: UnlistenFn | undefined;
    const setupListener = async () => {
      unlisten = await listen(Events.ClosedStandaloneListBox, () => {
        closeListBox();
      });
    };

    void setupListener();

    window.addEventListener("storage", updateStandaloneListBoxStore);
    return () => {
      window.removeEventListener("storage", updateStandaloneListBoxStore);
      if (unlisten) unlisten();
    };
  }, []);

  return (
    <div className="flex flex-row gap-2 px-2.5">
      <AudioSelect
        decibels={-15}
        icon={<Volume2 size={ICON_SIZE} />}
        id={ListBoxes.SystemAudio}
        label="System audio"
        permission={permissions.screen}
        permissionType={PermissionType.Screen}
        placeholder="No system audio"
      />
      <AudioSelect
        decibels={-21}
        icon={<Mic size={ICON_SIZE} />}
        id={ListBoxes.MicrophoneAudio}
        label="Microphone audio"
        permission={permissions.microphone}
        permissionType={PermissionType.Microphone}
        placeholder="No microphone"
      />
    </div>
  );
};

export default RecordingInputs;
