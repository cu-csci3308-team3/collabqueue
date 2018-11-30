import { html, Component, render } from 'https://unpkg.com/htm/preact/standalone.mjs';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { title: 'foo' }

        this.player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'dQw4w9WgXcQ',
            events: {
                'onReady': evt => evt.target.playVideo(),
                'onStateChange': evt => this.handleStateChange(evt)
            }
        })
    }

    handleStateChange(evt) {        
        let playerState = this.player.getPlayerState()

        console.log(`playerState = ${playerState}`)

        if (playerState == PLAYER_STATE.ENDED) {
            this.playNext()
        }
    }

    async playNext() {
        await new Promise(res => setTimeout(res, 1000))
        let { title, url } = { title: 'Never gonna hit those notes', url: 'http://www.youtube.com/v/lXMskKTw3Bc?version=3' } // await fetch('/next-song').then(r => r.json());
        this.setState({ title });
        this.player.loadVideoByUrl(url);
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