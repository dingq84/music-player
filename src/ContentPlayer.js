import React from 'react';

import volume from './assets/images/ic_volume_up_24px.svg';
import heart from './assets/images/heart-2.svg';

import './_ContentPlayer.scss';

export default function ContentPlayer() {

  return (
    <>
      <img
        className="musicContainer__content--player--volume"
        src={volume}
        alt="volume" />
      <img
        className="musicContainer__content--player--heart"
        src={heart}
        alt="heart" />
    </>
  )
}