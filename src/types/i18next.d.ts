// i18next-resources.d.ts
import "react-i18next";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: {
        // Navigation
        home: string;
        relics: string;
        demoNav: string;

        // Home page
        welcomeTitle: string;
        welcomeSubtitle: string;
        uploadSaveFile: string;
        tryDemo: string;
        demo: string;
        demoDescription: string;
        features: string;

        // Relic browser
        searchPlaceholder: string;
        allSlots: string;
        noRelicsFound: string;

        // Relic details
        level: string;
        effect: string;

        // Common
        loading: string;
        error: string;
        cancel: string;
        close: string;

        // File upload
        uploadDescription: string;
        dragAndDrop: string;
        fileSelected: string;

        // Footer
        madeWith: string;
        supportProject: string;
      };
    };
  }
}
