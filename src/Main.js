import React from 'react';

import ContentPicture from './ContentPicture';
import ContentAlbum from './ContentAlbum';
import ContentPlayer from './ContentPlayer';
import Sidebar from './Sidebar';

import albumPhoto from './assets/images/astist_photo.png';
import './_Main.scss';

export default function Main() {

  return (
    <div className="musicContainer">
      <div className="musicContainer__content">
        <div
          className="musicContainer__content--picture"
          style={{
            backgroundImage: `
            url(${require(`./assets/images/astist_photo.png`)})`
          }}
        >
          <ContentPicture />
        </div>
        <div className="musicContainer__content--album">
          <ContentAlbum />
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