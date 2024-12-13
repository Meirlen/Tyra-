import React from 'react';
import '../assets/css/components/card.css';

const Card = ({ title, count, update }) => (
  <div className="card">
    <div className="circle">{count}</div>
    <div className="content">
      <div className='title'>{title}</div>
      <div className='sub-heading'>
        <span><svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20.2776" y="17.0002" width="20.2791" height="16.1308" rx="8.0654" transform="rotate(-180 20.2776 17.0002)" fill="#2ED6A3" fill-opacity="0.15" />
          <g clip-path="url(#clip0_638_746)">
            <path d="M7.6288 8.79591C7.74065 8.88485 7.89233 8.93482 8.05048 8.93482C8.20864 8.93482 8.36032 8.88485 8.47217 8.79591L9.54159 7.94525L9.54159 11.0699C9.54159 11.1957 9.60443 11.3164 9.71628 11.4054C9.82814 11.4943 9.97985 11.5443 10.138 11.5443C10.2962 11.5443 10.4479 11.4943 10.5598 11.4054C10.6716 11.3164 10.7345 11.1957 10.7345 11.0699L10.7345 7.94525L11.8039 8.79591C11.9164 8.88233 12.0671 8.93015 12.2234 8.92907C12.3798 8.92799 12.5294 8.87809 12.64 8.79013C12.7506 8.70217 12.8133 8.58317 12.8147 8.45878C12.816 8.33438 12.7559 8.21454 12.6473 8.12506L10.5597 6.46454C10.4479 6.37559 10.2962 6.32563 10.138 6.32563C9.97988 6.32563 9.8282 6.37559 9.71635 6.46454L7.6288 8.12506C7.51698 8.21403 7.45417 8.33468 7.45417 8.46048C7.45417 8.58629 7.51698 8.70694 7.6288 8.79591Z" fill="#007BFC" />
          </g>
          <defs>
            <clipPath id="clip0_638_746">
              <rect width="7.15732" height="5.69322" fill="white" transform="translate(13.7168 11.7815) rotate(-180)" />
            </clipPath>
          </defs>
        </svg>
        </span>
        {update}</div>
    </div>
  </div>
);

export default Card;
