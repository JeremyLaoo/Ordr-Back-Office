export default function(lang = 'fr', action) {
    if(action.type === 'saveLang') {

        var newLanguage = action.lang;      

        return newLanguage;


    } else {
        return lang;
    }
  }