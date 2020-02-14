import React, {useState, useEffect} from 'react';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux';


const { Meta } = Card;

function ScreenArticlesBySource(props) {

  const [articleList, setArticleList] = useState([])

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    const findArticles = async() => {
      const data = await fetch(`https://newsapi.org/v2/top-headlines?sources=${props.match.params.id}&apiKey=843c12d7562d4d8892f4de1e48c8a422`)
      const body = await data.json()
      console.log(body)
      setArticleList(body.articles) 
    }
    findArticles()    
  },[])

  useEffect(() => {
    const addToWishlistBDD = async() => {
      console.log('props.myArticle :', props.myArticle);
      var stringWhishlist = JSON.stringify(props.myArticle)
      var dataWhishlist = await fetch('/add-article', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${props.storeToken}&article=${stringWhishlist}`
      })
      const body = await dataWhishlist.json()
      console.log('body :', body);
    }
    addToWishlistBDD()    
  },[props.myArticle])

  var showModal = (title, content) => {
    setVisible(true)
    setTitle(title)
    setContent(content)

  }

  var handleOk = e => {
    console.log(e)
    setVisible(false)
  }

  var handleCancel = e => {
    console.log(e)
    setVisible(false)
  }
  

  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">

              {articleList.map((article,i) => {
                
                return (

                  <div key={i} style={{display:'flex',justifyContent:'center'}}>

                <Card
                  
                  style={{ 
                  width: 300, 
                  margin:'15px', 
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent:'space-between' }}
                  cover={
                  <img
                      alt="example"
                      src={article.urlToImage}
                  />
                  }
                  actions={[
                      <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title,article.content)} />,
                      <Icon 
                      type="like" 
                      key="ellipsis" 
                      onClick={() => props.addToWishlist(article) }
                    
                      style={{color:'green'}}
                      />
                  ]}
                  >

                  <Meta
                    title={article.title}
                    description={article.description}
                  />

                </Card>
                <Modal
                  title={title}
                  visible={visible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>{content}</p>
                </Modal>

              </div>

                )

                })}
              
           </div>       
      </div>
  );
}


function mapDispatchToProps(dispatch) {

  return {
    addToWishlist: function(article) { 

        dispatch( {type: 'addtowishlist', article: article} )

        console.log('PUSH ARTICLE : ' + article);

    }
  }
}

function mapStateToProps(state) {
  return { myArticle: state.wishlist, storeToken: state.token }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ScreenArticlesBySource);