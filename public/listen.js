import { html, Component, render } from 'https://unpkg.com/htm/preact/standalone.mjs';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { title: 'Never Gonna Give You Up' }

        this.player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'dQw4w9WgXcQ',
            events: {
                'onReady': evt => evt.target.playVideo(),
                'onStateChange': evt => this.handleStateChange(evt)
            }
        })

        setTimeout(() => this.playNext(), 1000);
    }

    handleStateChange(evt) {        
        let playerState = this.player.getPlayerState()

        console.log(`playerState = ${playerState}`)

        if (playerState == PLAYER_STATE.ENDED) {
            this.playNext()
        }
    }

    async playNext() {
        let { description, ytlink } = await fetch('/pool/next-song').then(r => r.json())
        let [ videoID ] = ytlink.match(/[A-Za-z0-9-_]{11}/)
        this.player.loadVideoById(videoID)
        this.setState({ title: description })
    }

    render() {
        return html`
            <div class="app">
                <h2>${this.state.title}</h2>
            </div>
        `;
    }
}

window.onYouTubeIframeAPIReady = () => {
    console.log('onYouTubeIframeAPIReady')
    render(html`<${App} />`, document.querySelector('main'));
}

const PLAYER_STATE = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5,
}