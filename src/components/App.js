import React from 'react';

import Loader from './Loader';
import BusinessList from './BusinessList';
import SearchBar from './SearchBar';
import Yelp from '../util/Yelp';

//CSS & styling
import GlobalStyle from '../styles/GlobalStyle';
import title from '../res/logo.png';
import logo from '../res/fd.svg';
import '../styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      businesses: [],
      error: '',
      info: '',
      loader: false
    };
    
    this.scrollRef = React.createRef()
    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    this.setState({error: '', info: '', loader: true});
    Yelp.searchYelp(term, location, sortBy).then(businesses => {
      if(businesses.length < 1){
        this.setState({businesses: [], info: 'no results', loader: false});
      } else {
        this.setState({businesses: businesses, loader: false});  
        this.scrollRef.current.scrollIntoView();
        window.scrollBy(0, -50);
      }
    }).catch(error => this.setState({ error: "Error", loader: false }))
  }

  render() {
    return (
      <div>
        <GlobalStyle/>
        <main className="App">
          <div>
            <img className="LogoText" src={title} alt="ravenous"/>
            <img className="LogoImg" src={logo} alt="ravenous"/>
          </div>
          <p className="alert">{this.state.error}</p>
          <SearchBar searchYelp={this.searchYelp}/>
          {this.state.loader ? <Loader /> : null}
        </main>
        <div className="content" ref={this.scrollRef}>
          <p className="alert">{this.state.info}</p>
         <BusinessList businesses={this.state.businesses} />
        </div>
        <footer className="footer">Made by Jacob</footer>
      </div>
    );
  }
}

export default App;