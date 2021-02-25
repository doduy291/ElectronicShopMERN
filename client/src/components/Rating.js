import React from 'react';

const Rating = ({ value, text, color }) => {
  //  Or use "const color = { color: '#f8e825' }" to set color => fix style={color}";
  return (
    <div className="rating">
      <span>
        <i
          className={value >= 1 ? 'fas fa-star' : value >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}
          style={{ color }}
        ></i>
      </span>
      <span>
        <i
          className={value >= 2 ? 'fas fa-star' : value >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}
          style={{ color }}
        ></i>
      </span>
      <span>
        <i
          className={value >= 3 ? 'fas fa-star' : value >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}
          style={{ color }}
        ></i>
      </span>
      <span>
        <i
          className={value >= 4 ? 'fas fa-star' : value >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}
          style={{ color }}
        ></i>
      </span>
      <span>
        <i
          className={value >= 5 ? 'fas fa-star' : value >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}
          style={{ color }}
        ></i>
      </span>
      <span> {text && text} </span>
    </div>
  );
};

// Set Color in Props
Rating.defaultProps = {
  color: '#f8e825',
};
export default Rating;
