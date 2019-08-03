import React from 'react';

import heart from './assets/images/heart-2.svg';

export default function CoverMusic() {

  const musicDOM =
    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((music, index) =>
      <div
        key={index}
        className="musicContainer__content--album--list--content--items">
        <span
          className="musicContainer__content--album--list--content--items--number"
        >
          {index + 1}
        </span>
        <span
          className="musicContainer__content--album--list--content--items--title"
        >
          title
        </span>
        <span
          className="musicContainer__content--album--list--content--items--length"
        >
          length
        </span>
        <span
          className="musicContainer__content--album--list--content--items--lover"
        >
          {Math.floor(Math.random() * 100000)}
          <img
            src={heart}
            alt="heart" />
        </span>
      </div>
    )

  return musicDOM;
}