import React from 'react';

import Sidebar from './Sidebar';
import ContentPlayer from './ContentPlayer';

import albumPhoto from './assets/images/astist_photo.png';
import './_Main.scss';

export default function Main() {

  return (
    <div className="musicContainer">
      <div className="musicContainer__content">
        <div
          className="musicContainer__content--album"
          style={{
            backgroundImage: `
            url(${require(`./assets/images/astist_photo.png`)})`
          }}
        >

        </div>
        <div className="musicContainer__content--musicList">

        </div>
        <div className="musicContainer__content--player">
          <ContentPlayer />
        </div>
      </div>
      <div className="musicContainer__sidebar">
        <Sidebar />
      </div>
    </div >
  )
}