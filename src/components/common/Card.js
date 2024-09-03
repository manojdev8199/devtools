import React from 'react';
import { Link } from 'react-router-dom';
const Card = ({ title, description, icon, link }) => {

    return (
     
        <div className="card">
         <Link to={link} className="card-link">
          <div className="card-header">
            <div className="card-icon">
              {icon}
            </div>
            <div className="card-title-description">
              <h2 className="card-title">{title}</h2>
              <p className="card-description">{description}</p>
            </div>
          </div>
          </Link>
        </div>
      
    );
  }
  
  export default Card;
