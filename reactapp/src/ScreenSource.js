import React,{useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux';


function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([])


  useEffect(() => {
    let userLang = async() => {
      const lang = await fetch('/lang', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${props.storeToken}&lang=${props.storeLang}`
      })
    }
    userLang()


    let APIResultsLoading = async() => {
      const data = await fetch(`https://newsapi.org/v2/sources?language=${props.storeLang}&apiKey=843c12d7562d4d8892f4de1e48c8a422`)
      const body = await data.json()
      setSourceList(body.sources)
    }

    APIResultsLoading()
  }, [props.storeLang])


  console.log('token in store : ' + props.storeToken)
  console.log('lang in store : ' + props.storeLang)



    return (
      <div>
          <Nav/>
        
        <div className="Banner">
          <a onClick={() => props.saveLang('fr')}>
            <img
            className="flagImg"
            src="images/flag-fr.png"
            alt="drapeau français"
            />
          </a>
          <a onClick={() => props.saveLang('en')}>
            <img
            className="flagImg"
            src="images/flag-en.png"
            height="50px"
            alt="drapeau royaume uni"
            />
          </a>
        </div>

        <div className="HomeThemes">
            
                <List
                    itemLayout="horizontal"
                    dataSource={sourceList}
                    renderItem={source => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={`/images/${source.category}.png`} />}
                          title={<Link to={`/screenarticlesbysource/${source.id}`}>{source.name}</Link>}
                          description={source.description}
                        />
                      </List.Item>
                    )}
                  />


            </div>
                  
        </div>
    );

  
}

function mapDispatchToProps(dispatch) {

  return {
    saveLang: function(lang) { 

        dispatch( {type: 'saveLang', lang:lang} )

        console.log('CHANGED LANG : ' + lang);

    }
  }
}


function mapStateToProps(state) {
  return { storeToken: state.token, storeLang: state.lang }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ScreenSource);
