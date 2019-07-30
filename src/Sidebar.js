import React from 'react';

import home from './assets/images/home-52.svg';
import music from './assets/images/ic_library_music_48px.svg';
import archive from './assets/images/archive-2.svg';
import zoom from './assets/images/zoom-2.svg';
import setting from './assets/images/settings-gear-63.svg';

import './_Sidebar.scss';

export default function Sidebar() {

  return (
    <>
      <div className="musicContainer__sidebar__picture">

      </div>
      <img
        className="musicContainer__sidebar__home"
        src={home}
        alt="home" />
      <img
        className="musicContainer__sidebar__music"
        src={music}
        alt="music" />
      <img
        className="musicContainer__sidebar__archive"
        src={archive}
        alt="archive" />
      <img
        className="musicContainer__sidebar__search"
        src={zoom}
        alt="search" />
      <img
        className="musicContainer__sidebar__setting"
        src={setting}
        alt="setting" />
    </>
  )
}