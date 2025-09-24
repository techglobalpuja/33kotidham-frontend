function googleTranslateElementInit() {
  if (!window.__GOOGLE_TRANSLATION_CONFIG__) {
    return;
  }
  new google.translate.TranslateElement({
    pageLanguage: window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage,
    autoDisplay: false,
    includedLanguages: 'en,hi,gu',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    gaTrack: false,
    gaId: '',
  }, 'google_translate_element');

  
}