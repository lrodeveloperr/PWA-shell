export const demoEngine = {
  async getOverview() {
    return {
      preview: {
        title: "Engine preview",
        tones: ["green", "blue", "muted"],
        heading: "Lookup",
        query: "DEMO-204",
        cta: "Check",
        results: [
          { title: "Primary record", meta: "Direct engine match", tone: "green" },
          { title: "Related record", meta: "Secondary eligible route", tone: "blue" },
          { title: "Fallback record", meta: "Handled by default flow", tone: "muted" }
        ]
      },
      metrics: [
        { label: "Processed", value: "24,618", note: "safe fixture rows", tone: "blue" },
        { label: "Recovered", value: "4,286", note: "last 12 months", tone: "green" },
        { label: "Open", value: "738", note: "needs review", tone: "amber" }
      ]
    };
  },

  async getHealth() {
    return {
      windowTitle: "Engine health",
      tones: ["orange", "purple", "red"],
      heading: "Data health",
      subheading: "Fictitious demo workspace - trailing 12 months",
      metrics: [
        { label: "Processed", value: "24,618", note: "records", tone: "blue" },
        { label: "Passed", value: "7,942", note: "clean", tone: "green" },
        { label: "Issues", value: "177", note: "to fix", tone: "amber" }
      ],
      issues: [
        { label: "Duplicate values", value: "8", tone: "orange" },
        { label: "Ambiguous aliases", value: "5", tone: "purple" },
        { label: "Missing fields", value: "164", tone: "red" }
      ]
    };
  },

  async getDiagnostic() {
    return {
      tableTitle: "Recent engine tests",
      rows: [
        ["DEMO-204", "Primary record", "Pass"],
        ["FILTER 44", "Filter record", "Pass"],
        ["VALVE-9", "Alias route", "Review"],
        ["8801453", "Imported record", "Pass"],
        ["MOUNT BLACK", "Chooser flow", "Review"]
      ],
      result: {
        title: "Diagnostic result",
        tones: ["blue", "green", "amber"],
        label: "Input",
        query: "DEMO-204",
        badge: "Pass",
        detail: "Matched Primary record by deterministic engine rule."
      }
    };
  },

  async getAnalytics() {
    return {
      windowTitle: "Recovery analytics",
      tones: ["blue", "green", "amber"],
      heading: "Recovered work",
      subheading: "One year of safe fictitious data",
      metrics: [
        { label: "Recovered", value: "4,286", note: "engine wins", tone: "blue" },
        { label: "Direct", value: "3,874", note: "direct routes", tone: "green" },
        { label: "Chooser", value: "412", note: "review flows", tone: "amber" }
      ],
      bars: [47, 53, 58, 62, 59, 70, 75, 79, 84, 73, 92, 92],
      labels: ["Oct", "Dec", "Feb", "Apr", "Jun", "Aug"],
      footerMetrics: [
        { label: "Fallbacks", value: "9,814", tone: "blue" },
        { label: "Open", value: "738", tone: "amber" },
        { label: "Events", value: "19", tone: "red" }
      ]
    };
  }
};

