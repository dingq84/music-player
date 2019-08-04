import React from 'react';

import heart from './assets/images/heart-2.svg';
import album from './assets/images/Ed_Sheeran_-_No._6_Collaborations_Project.png';
import './_ContentAlbum.scss';

export default function ContentAlbum({ data, click }) {

  return (
    <>
      <div className="musicContainer__content--album--title">
        <div className="musicContainer__content--album--title--image">
          <img src={album} alt='album' />
        </div>
        <div className="musicContainer__content--album--title--text">
          <h6>2019</h6>
          <h1>No.6 Collaborations Project</h1>
          <button onClick={click}>play</button>
        </div>
        <img
          src={heart}
          alt="heart" />
      </div>
      <div className="musicContainer__content--album--list">
        <div className="musicContainer__content--album--list--name">
          <span className="musicContainer__content--album--list--name--title"
          >
            TITLE
          </span>
          <span
            className="musicContainer__content--album--list--name--length"
          >
            LENGTH
          </span>
          <span
            className="musicContainer__content--album--list--name--heart"
          >
            <img
              src={heart}
              alt="heart" />
          </span>
        </div>
        <div className="musicContainer__content--album--list--content">
          {data}
        </div>
      </div>
    </>
  )
}