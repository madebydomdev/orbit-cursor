import clsx from "clsx";
import { Lock } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import Overlay from "../../components/overlay/overlay";
import RecordingControls from "../../features/recording-controls/components/recording-controls";
import RecordingInputs from "../../features/recording-inputs/components/recording-inputs";
import { usePermissionsStore } from "../../stores/permissions.store";

const StartRecordingDock = () => {
  const [{ accessibility, screen }, canUnlock] = usePermissionsStore(
    useShallow((state) => [state.permissions, state.canUnlock])
  );

  const noPermissions =
    !accessibility?.hasAccess || !screen?.hasAccess || !canUnlock;

  return (
    <div
      className={clsx(
        "p-2 w-full flex flex-col gap-2 rounded-lg",
        noPermissions && "bg-content"
      )}
    >
      <Overlay blur="sm" className="rounded-lg" isOpen={noPermissions}>
        <div className="text-content-fg">
          <Lock />
        </div>
      </Overlay>

      <RecordingControls />
      <RecordingInputs />
    </div>
  );
};

export default StartRecordingDock;
