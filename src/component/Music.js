import React from 'react';

class Music extends React.Component {
    constructor(props) {
        super(props)
        this.handlePlay = this.handlePlay.bind(this);
    }

    handlePlay() {
        const audio = document.getElementById("audio-container");
        audio.play();
    }

    render() {
        return (
            <div>
                <audio id="audio-container">
                    <source src="https://ia803101.us.archive.org/24/items/KahootLobbyMusic/Kahoot%20Lobby%20Music%20%28HD%29.mp3"></source>
                </audio>
            </div>
        )
    }
}

export default Music