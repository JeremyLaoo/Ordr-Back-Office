export default function(wishlist = [], action) {
    if(action.type === 'addtowishlist') {

        var wishlistCopy = [...wishlist];

        var result = wishlistCopy.filter(article => article.title === action.title);

        if(result.length === 0) {
            wishlistCopy.push({
                title: action.title,
                description: action.description,
                content: action.content,
                img: action.img
            });

            console.log('REDUCER ADD = ' + wishlistCopy);
        } else {
            console.log('Article déjà en wishlist');
        }        
       
        return wishlistCopy;

    } else if(action.type === 'removefromwishlist') {

        var wishlistCopy = wishlist.filter(article => article.title !== action.title);

        console.log('REDUCER REMOVE = ' + wishlistCopy);

        return wishlistCopy;

    } else {
        return wishlist;
    }
  }