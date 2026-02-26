import CommunicationSettings from "@/components/settings/CommunicationSettings";

export default function NotificationSettingsPage() {
  return (
    <div
      style={{
        background: "var(--color-breeze)",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <CommunicationSettings />
    </div>
  );
}
