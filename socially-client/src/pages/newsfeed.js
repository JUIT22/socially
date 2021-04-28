import React, {Component} from 'react';
import News from '../components/news/News';
import axios from 'axios';

class newsfeed extends Component {
    constructor(props) {
        super(props);
        this.state = {news: []}
    }

    componentDidMount() {
        axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=6c7ffa4ca7c343929691ae092e280890').then((res) => {
            const data = res.data.articles;
            this.setState({news: data});
        });
    }

    render() {
        return(
            <div>
                {this.state.news.map(single => (
                    <News single={single} key={single.url}/>
                ))}
            </div>
        )
    }
}

export default newsfeed;