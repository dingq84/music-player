import React from 'react';

import CoverMusic from './CoverMusic';

import heart from './assets/images/heart-2.svg';

import './_Album.scss';

export default function ContentAlbum() {

  return (
    <>
      <div className="musicContainer__content--album--title">
        <div className="musicContainer__content--album--title--image">
          this is picture
        </div>
        <div className="musicContainer__content--album--title--text">
          <h6>2019</h6>
          <h1>No.6 Collaborations Project</h1>
          <button>play</button>
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
          <CoverMusic />
        </div>
      </div>
    </>
  )
}