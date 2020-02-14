import React,{useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux';


function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([])


  useEffect(() => {
    var APIResultsLoading = async() => {
      const data = await fetch(`https://newsapi.org/v2/sources?language=${props.storeLanguage}&apiKey=843c12d7562d4d8892f4de1e48c8a422`)
      const body = await data.json()
      setSourceList(body.sources)
    }

    APIResultsLoading()
  }, [props.storeLanguage])


  console.log('token in store : ' + props.storeToken)


    return (
      <div>
          <Nav/>
        
        <div className="Banner">
          <a onClick={() => props.changeLanguage('fr')}>
            <img
            className="flagImg"
            src="images/flag-fr.png"
            alt="drapeau français"
            />
          </a>
          <a onClick={() => props.changeLanguage('en')}>
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
    changeLanguage: function(lang) { 

        dispatch( {type: 'changelanguage', lang:lang} )

        console.log('CHANGE LANG : ' + lang);

    }
  }
}


function mapStateToProps(state) {
  return { storeToken: state.token, storeLanguage: state.lang }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ScreenSource);
