import React, { useState, useEffect, useRef } from 'react';

import heart from './assets/images/heart-2.svg';
import repeatSvg from './assets/images/ic_repeat_24px.svg';
import shuffleSvg from './assets/images/ic_shuffle_24px.svg';
import playSvg from './assets/images/Component.svg';
import pauseSvg from './assets/images/pause.svg';
import nextSvg from './assets/images/Component 1.svg';
import volumeSvg from './assets/images/ic_volume_up_24px.svg';

export default function useMusicData() {
  const [currentMusic, setCurrentMusic] = useState({ name: '', path: '' });
  const [isPlay, setIsPlay] = useState(false);
  const [cycle, setCycle] = useState('none');
  const [isShuffle, setIsShuffle] = useState(false);
  const [volume, setVolume] = useState(50);
  const audio = useRef();
  useEffect(() => {
    if (currentMusic.path !== '') {
      const playPromise = audio.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => { console.log(error) });
      }
      setIsPlay(true);
    }
  }, [currentMusic]);

  useEffect(() => {
    const updateVolume = e => {
      setVolume(e.offsetX);
      audio.current.volume = e.offsetX / 100;
    }
    const span = document.querySelector('.musicContainer__content--player--volume--length');

    span.addEventListener('mousedown', updateVolume, false);

    return () => {
      span.removeEventListener('mousedown', updateVolume, false);
    }
  }, []);

  const importAll = r => {
    let sounds = {};
    const soundsKey = r.keys().map((item, index) => {
      const newKey = item.replace('./', '').replace('.mp3');
      sounds[newKey] = r(item);
      return newKey;
    });
    return [sounds, soundsKey];
  }

  const [sounds, soundsKey] =
    importAll(require.context('./assets/sounds', false, /\.mp3/));

  const changeSong = key => {
    setCurrentMusic({
      name: key,
      path: sounds[key]
    })
  }

  const preSong = () => {
    const index = soundsKey.findIndex(key => key === currentMusic.name);
    if (index === 0)
      setCurrentMusic({
        name: soundsKey[soundsKey.length - 1],
        path: sounds[soundsKey[soundsKey.length - 1]]
      })
    else
      setCurrentMusic({
        name: soundsKey[index - 1],
        path: sounds[soundsKey[index - 1]]
      })
  }

  const nextSong = () => {
    const index = soundsKey.findIndex(key => key === currentMusic.name);
    if (index + 1 === soundsKey.length)
      setCurrentMusic({
        name: soundsKey[0],
        path: sounds[soundsKey[0]]
      })
    else
      setCurrentMusic({
        name: soundsKey[index + 1],
        path: sounds[soundsKey[index + 1]]
      })
  }

  const handlePlayOrPause = () => {
    if (currentMusic.path === '')
      return;

    if (isPlay)
      audio.current.pause()
    else
      audio.current.play();

    setIsPlay(!isPlay);
  }

  const shuffle = arr => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr
  }

  const ended = () => {
    if (cycle === 'album') {
      if (isShuffle) {
        const newSoundsKey = shuffle(soundsKey);
        if (newSoundsKey[0] !== currentMusic.name)
          setCurrentMusic({
            name: newSoundsKey[0],
            path: sounds[newSoundsKey[0]]
          })
        else
          setCurrentMusic({
            name: newSoundsKey[1],
            path: sounds[newSoundsKey[1]]
          });
      } else
        nextSong();
    } else if (cycle === 'song')
      setCurrentMusic({
        ...currentMusic
      });

    setIsPlay(false);
  }

  const repeat = () => {
    if (cycle === 'none')
      setCycle('album')
    else if (cycle === 'album')
      setCycle('song')
    else
      setCycle('none');
  }

  const initialSong = () => {
    setCurrentMusic({
      name: soundsKey[0],
      path: sounds[soundsKey[0]]
    })
  }

  const playerDOM =
    <>
      <audio
        key={currentMusic.name}
        src={currentMusic.path}
        ref={audio}
        onEnded={ended}
      ></audio>
      <img
        className="musicContainer__content--player--shuffle"
        src={shuffleSvg}
        alt="shuffle"
        style={{
          filter: (isShuffle) ?
            'invert(0.5) sepia(1) saturate(5) hue-rotate(75deg)' : ''
        }}
        onClick={() => setIsShuffle(!isShuffle)}
      />
      <img
        className="musicContainer__content--player--pre"
        src={nextSvg}
        alt="next"
        onClick={preSong} />
      {
        !isPlay ?
          <img
            className="musicContainer__content--player--control"
            src={playSvg}
            alt="play"
            onClick={handlePlayOrPause} /> :
          <img
            className="musicContainer__content--player--control"
            src={pauseSvg}
            alt="pause"
            onClick={handlePlayOrPause} />
      }
      <img
        className="musicContainer__content--player--next"
        src={nextSvg}
        alt="next"
        onClick={nextSong} />
      <div className="musicContainer__content--player--repeat">
        <span
          style={{
            display: (cycle === 'song') ? 'block' : 'none'
          }}
        >1</span>
        <img
          style={{
            filter: (cycle !== 'none') ?
              'invert(0.5) sepia(1) saturate(5) hue-rotate(75deg)' : ''
          }}
          src={repeatSvg}
          alt="repeat"
          onClick={repeat} />
      </div>
      <div
        className="musicContainer__content--player--volume"
      >
        <img
          src={volumeSvg}
          alt="volume" />
        <span
          className="musicContainer__content--player--volume--length"
        >
          <span
            style={{
              width: `${volume + 3}px`
            }}
          >
          </span>
        </span>
      </div>
    </>

  const musicDOM =
    soundsKey.map((key, index) =>
      <div
        key={index}
        className="musicContainer__content--album--list--content--items"
      >
        <span
          className="musicContainer__content--album--list--content--items--number"
        >
          {index + 1}
        </span>
        <span
          className="musicContainer__content--album--list--content--items--title"
          onClick={() => changeSong(key)}
        >
          {key}
        </span>
        <span
          className="musicContainer__content--album--list--content--items--length"
        >
          length
        </span>
        <span
          className="musicContainer__content--album--list--content--items--lover"
        >
          {Math.pow(126 * (index + 1), 2)}
          <img
            src={heart}
            alt="heart" />
        </span>
      </div>
    )

  return [currentMusic, initialSong, playerDOM, musicDOM];
}