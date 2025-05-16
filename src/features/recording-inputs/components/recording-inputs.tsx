import { listen, UnlistenFn } from "@tauri-apps/api/event";
import { Mic, Volume2 } from "lucide-react";
import { useEffect } from "react";

import Separator from "../../../components/separator/separator";
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
import AudioToggle from "./audio-toggle";
import GrantAccess from "./grant-access";

const ICON_SIZE = 14;

enum ListBoxes {
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
    <div className="flex flex-row px-2">
      {permissions.microphone?.hasAccess ? (
        <AudioToggle decibels={-98.9} icon={<Volume2 size={ICON_SIZE} />} />
      ) : (
        <GrantAccess
          permission={permissions.microphone}
          type={PermissionType.Microphone}
        />
      )}

      <Separator className="h-[30px] ml-6" orientation="vertical" spacing="md" />

      {permissions.microphone?.hasAccess ? (
        <AudioSelect
          decibels={-21}
          icon={<Mic size={ICON_SIZE} />}
          id={ListBoxes.MicrophoneAudio}
          label="Microphone audio"
          placeholder="No microphone"
        />
      ) : (
        <GrantAccess
          permission={permissions.microphone}
          type={PermissionType.Microphone}
        />
      )}
    </div>
  );
};

export default RecordingInputs;
