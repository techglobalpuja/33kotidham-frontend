interface Window {
  googleTranslateElementInit?: () => void;
  google?: {
    translate: {
      TranslateElement: new (
        options: { pageLanguage: string; includedLanguages: string; layout: any },
        element: string
      ) => void;
    };
  };
}
