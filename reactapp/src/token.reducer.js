export default function(token = {}, action) {
    if(action.type === 'saveToken') {

        var newToken = {token: action.token, tokenToCheck: action.tokenToCheck};      
       
        return newToken;

    } else {
        return token;
    }
  }