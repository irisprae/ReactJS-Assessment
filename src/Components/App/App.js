import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Track from '../Track/Track';
import Spotify from '../../utils/Spotify';
// import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack (track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTracks => savedTracks.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack (track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName (name) {
    this.setState({playlistName: name});
  }

  savePlaylist () {
    alert("Your playlist is saved.")
    const trackIds = this.state.playlistTracks.map(track => track.id);
    Spotify.savePlaylist(this.state.playlistName, trackIds).then (() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search (term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  componentDidMount() {
    Spotify.getAccessToken();
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          < SearchBar onSearch={this.search} />
          <div className="App-playlist">
            < SearchResults searchResults={this.state.searchResults}
                            onAdd={this.addTrack} />
                            

            < Playlist playlistName={this.state.playlistName}
                       playlistTracks={this.state.playlistTracks}
                       onRemove={this.removeTrack}
                       onNameChange={this.updatePlaylistName}
                       onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}
export default App;