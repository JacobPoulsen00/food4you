import React from 'react';
import '../styles/Business.css';
import PropTypes from 'prop-types';
import backupPic from '../res/backup-img.png';
import flag from '../res/flag.svg';
import rate from '../res/rating.svg';



class Business extends React.Component {
  render() {
    return (
      <div className="Business">
        <div className="image-container">
          <a href={this.props.business.url} target='_blank' rel="noopener noreferrer"><img src={this.props.business.imageSrc ? this.props.business.imageSrc : backupPic } alt=''/></a>
        </div>
        <div className="container">
          <h2>{this.props.business.name}</h2>
          <div className="Business-information">
            <div className="Business-address">
              <a href={`https://maps.google.com/?q=${this.props.business.name},${this.props.business.address}&sll=${this.props.business.lat},${this.props.business.long}`} target = "_blank" rel="noopener noreferrer">
                <p>{this.props.business.address}</p>
                <p>{this.props.business.city}</p>
                <p>{`${this.props.business.state} ${this.props.business.zipCode}`}</p>
              </a>
              <a href={`https://maps.google.com/?q=${this.props.business.name},${this.props.business.address}&sll=${this.props.business.lat},${this.props.business.long}`} target = "_blank" rel="noopener noreferrer">
                <img src={flag} alt='Show on map' />
              </a>
            </div>
            <div className="Business-reviews">
              <h3>{this.props.business.category}</h3>
              <div>
                <h3 className="rating">{this.props.business.rating}<img src={rate} alt='Rating'/></h3>
                <p>{this.props.business.reviewCount} reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Business.propTypes = {
  imageSrc: PropTypes.string,
  url: PropTypes.string,
  reviewCount: PropTypes.number,
  name: PropTypes.string,
  lat: PropTypes.number,
  long: PropTypes.number,
  city: PropTypes.string,
  category: PropTypes.string,
  rating: PropTypes.number,
}

Business.defaultProps = {
  imageSrc: backupPic,
  name: 'Restaurant'
}


export default Business;