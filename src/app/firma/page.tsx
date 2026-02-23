import AssessmentOverview from "@/components/firma/AssessmentOverview";

export default function CompanyAssessmentOverviewPage() {
  return (
    <div style={{ background: "var(--color-breeze)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 24px",
        }}
      >
        <AssessmentOverview />
      </div>
    </div>
  );
}
