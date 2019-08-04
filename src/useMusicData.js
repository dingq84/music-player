import React, { useState, useEffect, useRef } from 'react';

import musicTag from './assets/images/ic_music_note_24px.svg';
import heart from './assets/images/heart-2.svg';
import heartPink from './assets/images/heart-2-pink.svg';
import repeatSvg from './assets/images/ic_repeat_24px.svg';
import shuffleSvg from './assets/images/ic_shuffle_24px.svg';
import playSvg from './assets/images/Component.svg';
import pauseSvg from './assets/images/pause.svg';
import nextSvg from './assets/images/Component-1.svg';
import volumeSvg from './assets/images/ic_volume_up_24px.svg';

let int;

export default function useMusicData() {
  const [currentMusic, setCurrentMusic] = useState({ name: '', path: '', duration: '' });
  const [currentTime, setCurrentTime] = useState(0);
  const [musicSpec, setMusicSpec] = useState([]);
  const [hearts, setHearts] = useState({});
  const [isPlay, setIsPlay] = useState(false);
  const [cycle, setCycle] = useState('none');
  const [isShuffle, setIsShuffle] = useState(false);
  const [volume, setVolume] = useState(50);
  const audio = useRef();
  useEffect(() => {
    if (int)
      clearTimeout(int);

    if (currentMusic.path !== '') {
      const playPromise = audio.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => { console.log(error) });
      }
      setIsPlay(true);
      // setCurrentTime(Math.floor(audio.current.currentTime));
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

  useEffect(() => {
    int = setTimeout(() => {
      setCurrentTime(Math.ceil(audio.current.currentTime));
    }, 1000);
  }, [currentMusic, currentTime]);

  const importAll = r => {
    let sounds = {};
    const soundsKey = r.keys().map(item => {
      const newKey = item.replace('./', '').replace('.mp3');
      sounds[newKey] = r(item);
      return newKey;
    });
    return [sounds, soundsKey];
  }

  const [sounds, soundsKey] =
    importAll(require.context('./assets/sounds', false, /\.mp3/));

  const changeSong = key => {
    const index = soundsKey.findIndex(k => k === key);
    setCurrentMusic({
      name: musicSpec[index].name,
      path: musicSpec[index].path,
      duration: musicSpec[index].duration
    })
  }

  const preSong = () => {
    const index = soundsKey.findIndex(key => key === currentMusic.name);
    console.log(index);
    if (index === 0)
      setCurrentMusic({
        name: musicSpec[soundsKey.length - 1].name,
        path: musicSpec[soundsKey.length - 1].path,
        duration: musicSpec[soundsKey.length - 1].duration
      })
    else
      setCurrentMusic({
        name: musicSpec[index - 1].name,
        path: musicSpec[index - 1].path,
        duration: musicSpec[index - 1].duration
      })
  }

  const nextSong = () => {
    const index = soundsKey.findIndex(key => key === currentMusic.name);
    console.log(index);
    if (index + 1 === soundsKey.length)
      setCurrentMusic({
        name: musicSpec[0].name,
        path: musicSpec[0].path,
        duration: musicSpec[0].duration
      })
    else
      setCurrentMusic({
        name: musicSpec[index + 1].name,
        path: musicSpec[index + 1].path,
        duration: musicSpec[index + 1].duration
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
            name: musicSpec[0].name,
            path: musicSpec[0].path,
            duration: musicSpec[0].duration
          })
        else
          setCurrentMusic({
            name: musicSpec[1].name,
            path: musicSpec[1].path,
            duration: musicSpec[1].duration
          })
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

  const handleJumpProgress = e => {
    const percent = e.clientX / e.target.offsetWidth;
    const newCurrentTime = currentMusic.duration * percent;
    audio.current.currentTime = newCurrentTime;
    setCurrentTime(newCurrentTime);
  }

  const playerDOM =
    <>
      <audio
        key={currentMusic.name}
        src={currentMusic.path}
        ref={audio}
        onEnded={ended}
      ></audio>
      <span className="musicContainer__content--player--currentTime">
        {
          (currentMusic.name !== '') ?
            `${Math.floor(currentTime / 60)} :
          ${(Math.round(currentTime % 60)).toString().length === 1 ?
              '0' + Math.round(currentTime % 60) :
              Math.round(currentTime % 60)}` : ''
        }
      </span>
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
      <span
        className="musicContainer__content--player--duration"
      >
        {
          (currentMusic.duration) ?
            `${Math.floor(currentMusic.duration / 60)} :
            ${(Math.round(currentMusic.duration % 60)).toString().length === 1 ?
              '0' + Math.round(currentMusic.duration % 60) :
              Math.round(currentMusic.duration % 60)}` : ''
        }
      </span>
    </>

  const musicDOM =
    soundsKey.map((key, index) =>
      <div
        key={index}
        className="musicContainer__content--album--list--content--items"
      >
        <div
          className="musicContainer__content--album--list--content--items--number"
        >
          {
            (currentMusic.name === key) ?
              <img src={musicTag} alt="music" /> : ''
          }
          <span>{index + 1}</span>
        </div>
        <span
          className="musicContainer__content--album--list--content--items--title"
          onClick={() => changeSong(key)}
        >
          {key}
        </span>
        <span
          className="musicContainer__content--album--list--content--items--length"
        >
          <audio
            src={sounds[key]}
            key={key}
            onLoadedMetadata={(e) => {
              setMusicSpec([
                ...musicSpec,
                { name: key, path: sounds[key], duration: e.target.duration }
              ])
            }}
          >
          </audio>
          {!musicSpec[index] ||
            `${Math.floor(musicSpec[index].duration / 60)} :
             ${(Math.round(musicSpec[index].duration % 60)).toString().length === 1 ?
              '0' + Math.round(musicSpec[index].duration % 60) :
              Math.round(musicSpec[index].duration % 60)}`}
        </span>
        <span
          className="musicContainer__content--album--list--content--items--lover"
          onClick={() => setHearts({
            ...hearts,
            [key]: !hearts[key]
          })}
        >
          {Math.pow(126 * (index + 1), 2)}
          {
            (!hearts[key]) ?
              <img
                src={heart}
                alt="heart" /> :
              <img
                src={heartPink}
                alt="heartPink" />
          }
        </span>
      </div>
    )

  return [
    currentMusic,
    initialSong,
    currentTime,
    handleJumpProgress,
    playerDOM,
    musicDOM
  ];
}