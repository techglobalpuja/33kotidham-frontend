function googleTranslateElementInit() {
  if (!window.__GOOGLE_TRANSLATION_CONFIG__) {
    return;
  }
  new google.translate.TranslateElement({
    pageLanguage: window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage,
  }, 'google_translate_element');

  
}