export default function(lang = 'fr', action) {
    if(action.type === 'changelanguage') {

        var newLanguage = action.lang;      

        return newLanguage;


    } else {
        return lang;
    }
  }