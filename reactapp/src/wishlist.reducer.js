export default function(wishlist = {}, action) {
    if(action.type === 'addtowishlist') {
        var newArticle = action.article;
        console.log('newArticle :', newArticle);
        return newArticle;
    }
    else
        return wishlist;
  }