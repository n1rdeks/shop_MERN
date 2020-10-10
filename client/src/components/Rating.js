import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
    const content = [];

    // five stars, five...
    for (let i=1; i <= 5; i++) {
        content.push(
            <span key={i}>
                <i style={{color}} className={value >= i ? 'fas fa-star' :
                    value >= (i-0.5) ? 'fas fa-star-half-alt' : 'far fa-star'} />
            </span>
        )
    }

    return (
        <div className="rating">
            {content}
            <span>{text && text}</span>
        </div>
    );
};

Rating.defaultProps = {
    color: '#f8e825'
};

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
};

export default Rating;
