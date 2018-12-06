import { html, Component, render } from 'https://unpkg.com/htm/preact/standalone.mjs';

class Search extends Component {
    constructor(props) {
        super(props)

        this.state = { input: '', loading: false, results: [] }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChoose = this.handleChoose.bind(this)
    }

    handleChange(evt) {        
        this.setState({ input: evt.target.value })    
    }

    async handleSubmit() {
        let { input } = this.state
        this.setState({ loading: true })
        let { results } = await fetch(`/pool/search?q=${encodeURIComponent(input)}`).then(r => r.json())
        this.setState({ results, loading: false })
    }

    handleChoose(song) {
        document.querySelector('#id').value = song.id
        document.querySelector('#title').value = song.title
        document.querySelector('#form').submit()
    }

    render(_, { loading, input, results }) {
        return html`
            <div class="app">
                <input type="text" value=${input} onChange=${this.handleChange} />
                <button onClick=${this.handleSubmit}>Search</button>
                <br>
                ${loading ? html`<img src="/loading.gif">` : null }
                <${ResultsList} results=${results} chooseSong=${this.handleChoose}>
            </div>
        `;
    }
}

const ResultsList = ({ results, chooseSong }) => html`
    <ul>
        ${results.map(result => html`
            <li
                onClick=${() => chooseSong(result)}
                style=${{ cursor: 'pointer' }}
            >
                <img src=${result.image} />
                <span>${result.title}</span>
            </li>
        `)}
    </ul>
`

render(html`<${Search} />`, document.querySelector('main'));