export default function(token = "", action) {
    if(action.type === 'saveToken') {

        var newToken = action.token;      
       
        return newToken;

    } else {
        return token;
    }
  }