import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import './App.css';
import { Card, Icon, Modal } from 'antd';
import Nav from './Nav'

const { Meta } = Card;

function ScreenMyArticles(props) {

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    const findArticles = async() => {
      const data = await fetch(`/get-whishlist/${props.storeToken}`)
      const myArticles = await data.json()
      setWishlist(myArticles)
      console.log('myArticles :', myArticles.length);
    }
    findArticles()    
  },[])

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

  if (wishlist.length === 0) {

    return (
      <div>

        <Nav/>

        <div className="Banner"/>

        <div className="Card">
          <p>Il n'y a pas d'article dans ta wishlist</p>
        </div>
      </div>
    )

  } else {

  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">

            
    
            {wishlist.map((article,i) => (

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
                          <Icon type="delete" key="ellipsis" 
                      onClick={() => props.removeFromWishlist(article.title,article.description, article.urlToImage) }/>
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

              ))}

             </div>

      </div>
  );
  }
}

function mapStateToProps(state) {
  return { storeToken: state.token }
}


function mapDispatchToProps(dispatch) {

  return {
    removeFromWishlist: function(title, description, img) { 

        dispatch( {type: 'removefromwishlist', title: title, description : description, img: img} )

        console.log('REMOVE ARTICLE : ' + title + '*****' + description + '*****' + img);

    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ScreenMyArticles);