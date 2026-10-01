export const shellConfig = {
  appName: "PWA Shell Demo",
  supportEmail: "support@example.com",
  nav: [
    { label: "Support", route: "support" },
    { label: "About", route: "about" },
    { label: "Policies", route: "policies" }
  ],
  overview: {
    eyebrow: "PWA Shell",
    title: "Reusable app shell, engine-specific logic.",
    intro:
      "A locked presentation layer for small business PWAs where future work should focus on the engine, not rebuilding the wrapper.",
    featureTitle: "One shell, many apps.",
    featureCopy: "Keep layout, public pages, policies, and screenshots consistent across products.",
    features: [
      ["Engine adapter", "Plug in domain logic without touching shell components."],
      ["Public pages", "Support, about, and combined policies are already wired."],
      ["Screenshots", "Seven standard capture routes are included."]
    ]
  },
  health: {
    eyebrow: "Engine health",
    title: "Show the data problems before users feel them.",
    intro: "Safe demo data illustrates validation status, issue counts, and maintenance actions.",
    maintenanceTitle: "Simple maintenance loop",
    maintenanceCopy: "Review issues, fix source data, rerun the engine, and keep the output trustworthy."
  },
  diagnostic: {
    eyebrow: "Test result",
    title: "Prove an engine rule before it goes live.",
    intro: "Run deterministic checks against safe fixture data without exposing real customer data."
  },
  analytics: {
    eyebrow: "One-year view",
    title: "See where the engine is creating value.",
    intro: "Fictitious trailing-year data highlights recovered work, fallbacks, and open opportunities."
  },
  publicPages: {
    support: {
      eyebrow: "Help",
      title: "Get help with setup and diagnostics.",
      body: [
        "For setup, app configuration, imports, diagnostics, or engine behaviour, use the contact details below."
      ],
      sections: [
        {
          title: "Contact",
          body:
            "Email {{supportEmail}}. Include the app name, the screen you tested, and what you expected to happen."
        },
        {
          title: "Before you write",
          body:
            "Confirm that the latest engine has run, the app is using the expected fixture or production data, and the issue can be reproduced."
        }
      ]
    },
    about: {
      eyebrow: "Product",
      title: "A focused PWA wrapper for engine-first apps.",
      body: [
        "This shell is built for small business apps where the value sits in domain logic, validation, data checks, and clear outputs."
      ],
      sections: [
        {
          title: "What it does",
          body:
            "It provides the repeatable PWA wrapper: navigation, public pages, preview layouts, status cards, analytics screens, and screenshot capture."
        },
        {
          title: "What it avoids",
          body:
            "It does not contain app-specific rules, paid API assumptions, legal advice, customer data, pricing logic, or marketplace-specific listing copy."
        }
      ]
    },
    policies: {
      eyebrow: "Policies",
      title: "Privacy and terms for this PWA.",
      body: ["Effective date: replace before release."],
      sections: [
        {
          title: "Data the app uses",
          body:
            "Replace this with the specific app data categories. Keep it factual and consistent with the engine and app permissions."
        },
        {
          title: "Data the app does not use",
          body:
            "State excluded data categories clearly. For local-first apps, say when data stays on the user's device or chosen storage provider."
        },
        {
          title: "Service terms",
          body:
            "Describe the app as a workflow and record-keeping tool. Do not imply professional legal, tax, audit, medical, or financial advice unless that has been separately reviewed."
        },
        {
          title: "Contact",
          body: "Questions about these policies can be sent to {{supportEmail}}."
        }
      ]
    }
  }
};

