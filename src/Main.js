import React, { useState, useEffect } from 'react';

import ContentPicture from './ContentPicture';
import ContentAlbum from './ContentAlbum';
import ContentPlayer from './ContentPlayer';
import Sidebar from './Sidebar';
import useMusicData from './useMusicData';

import './_Main.scss';

export default function Main() {
  const [
    currentMusic,
    initialSong,
    currentTime,
    handleJumpProgress,
    playerDOM,
    soundsList] = useMusicData();
  const [width, setWidth] = useState();
  useEffect(() => {
    if (currentTime) {
      const newWidth = Math.floor(currentTime / currentMusic.duration * 100);
      setWidth(`${newWidth}%`)
    } else
      setWidth('0%');
  }, [currentTime]);

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
        <div
          className="musicContainer__content--progress"
          onMouseDown={(e) => handleJumpProgress(e)}
        >
          <div style={{ width: width }}
          ></div>
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