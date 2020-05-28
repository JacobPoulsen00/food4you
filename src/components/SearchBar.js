import React from 'react';
import '../styles/SearchBar.css';
import glass from '../res/magnifying-glass.svg';
import goal from '../res/goal.svg';
import star from '../res/star.svg';
import review from '../res/testimonial.svg';
import walk from '../res/walk.svg';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match',
      alertText: ''
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);

    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count',
      'Distance From': 'distance'
    };
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    }
    return '';
  }

  handleSortByChange(sortByOption) {
    this.setState({sortBy: sortByOption});

    if(this.state.term && this.state.location){
      this.setState({alertText:''});
      this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    } else {
      this.setState({alertText:"Fill out both fields!"});
    }
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }

  handleSearch(event) {
    this.setState({alertText:''});
    if(this.state.term.length < 1 || this.state.location.length < 1){
      this.setState({alertText: "Please fill out both fields."})  
    } else if(event.key === 'Enter' || event.type === 'click') {
      this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
      event.preventDefault();
      console.log("Clicked&term:"+ this.state.term +"&loca:"+ this.state.location);
    }
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (<li className={this.state.sortBy === sortByOptionValue ? "active" : null }
                  key={sortByOptionValue}
                  onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
                  >
                <img src={sortByOptionValue === 'best_match' ? goal : sortByOptionValue === 'rating' ? star: sortByOptionValue === 'distance' ? walk: review} alt={sortByOptionValue}/>
                {sortByOption}
             </li>);
    });
  }


  
  render() {
    return (
      <div>
        <p className="alert">{this.state.alertText}</p>
        <div className="SearchBar">
          <label className="SearchLabel" htmlFor="name">
            Find
          </label>
          <input placeholder="Pizza, sushi, burgers..." onChange={this.handleTermChange} onKeyPress={this.handleSearch} name="name" id="name"/>
          <label className="SearchLabel" htmlFor="location">
            Near     
          </label>
          <input placeholder="Copenhagen" onChange={this.handleLocationChange} onKeyPress={this.handleSearch} name="location" id="location"/>
          <a className="SearchBar-submit" onClick={this.handleSearch} href='#items' type="submit" value=" ">
            <img className="glass" src={glass} alt="submit"></img>
          </a> 
        </div>
        <div className="SearchBar-sort-options">
            <ul>
              {this.renderSortByOptions()}
            </ul>
          </div> 
      </div>
    );
  }
}

export default SearchBar;