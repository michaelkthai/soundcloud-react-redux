import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CLIENT_ID } from '../../constants/auth';

class Stream extends Component {

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if (!audioElement) { return; }

    const { activeTrack } = this.props;

    if (activeTrack) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  render () {

    var streamStyle = {
      minHeight: 650,
      backgroundColor: 'mintcream',
      fontFamily: 'Helvetica',
      width: '60%',
      margin: '4rem auto',
      padding: '5rem',
      border: '1px solid sandybrown',
    };
    var loginButton = {
      fontSize: '2rem',
      color: 'turquoise',
      backgroundColor: 'white'
    };
    var centered = {
      width: 'auto',
      textAlign: 'center',
      margin: 'auto'
    };
    var trackListing = {
      width: '70%',
      textAlign: 'left',
      margin: '5% auto',
    };
    var playButton = {
      // width: '8rem',
      fontSize: '1.5rem',
      color: 'turquoise',
      backgroundColor: 'white',
      // marginTop: '.5rem',
      marginLeft: '100%'

    };
    var listingRow = {
      height: '3rem',
      textAlign: 'right'
    };


    const { user, tracks = [], activeTrack, onAuth, onPlay } = this.props;

    return (
      <div style={streamStyle}>
        <div style={centered}>
          {
            user ?
              <div><h1>{user.username}'s Stream:</h1></div> :
              <div><button style={loginButton}onClick={onAuth} type="button">Login</button></div >

          }
        </div>
        <br/>
        <div style={trackListing}>
          {
            tracks.map((track, key) => {
              return (
                <tr style={listingRow}>
                  <td>
                    <div className="track" key={key}>
                    {track.origin.title}</div>
                  </td>
                  <td>
                    <div>
                      <button style={playButton} type="button" onClick={() => onPlay(track)}>Play</button>
                    </div>
                  </td>
                </tr>
              );
            })
          }
        </div>
        {
          activeTrack ?
          <audio id="audio" ref="audio" src={`${activeTrack.origin.stream_url}?client_id=${CLIENT_ID}`}></audio> :
          null
        }
      </div>
    );
  }
}

export default Stream;
