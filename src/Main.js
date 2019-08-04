import React from 'react';

import ContentPicture from './ContentPicture';
import ContentAlbum from './ContentAlbum';
import ContentPlayer from './ContentPlayer';
import Sidebar from './Sidebar';
import useMusicData from './useMusicData';

import './_Main.scss';

export default function Main() {
  const [currentMusic, initialSong, playerDOM, soundsList] = useMusicData();

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
          <ContentAlbum data={soundsList} click={initialSong} />
        </div>
        <div className="musicContainer__content--player">
          <ContentPlayer
            data={currentMusic}
            playerDOM={playerDOM}
          />
        </div>
      </div>
      <div className="musicContainer__sidebar">
        <Sidebar />
      </div>
    </div>
  )
}