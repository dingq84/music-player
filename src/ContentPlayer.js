import React from 'react';

import heart from './assets/images/heart-2.svg';
import album from './assets/images/Ed_Sheeran_-_No._6_Collaborations_Project.png';

import './_ContentPlayer.scss';

export default function ContentPlayer(props) {

  return (
    <>
      <div
        className="musicContainer__content--player--picture"
      >
        <img src={album} alt="album" />
      </div>
      <span
        className="musicContainer__content--player--name"
      >{props.data.name}</span>
      <span
        className="musicContainer__content--player--singer"
      >ED sheeran</span>
      {props.playerDOM}
      <img
        className="musicContainer__content--player--heart"
        src={heart}
        alt="heart" />
    </>
  )
}