import React, {Component} from 'react';
import News from '../components/news/News';
import axios from 'axios';

class newsfeed extends Component {
    constructor(props) {
        super(props);
        this.state = {news: []}
    }

    //do not uncomment this until required. 
    componentDidMount() {
        // axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=6c7ffa4ca7c343929691ae092e280890').then((res) => {
        //     const data = res.data.articles;
        //     this.setState({news: data});
        // });
        console.log("axios part");
    }

    render() {
        return(
            <div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    textAlign: 'center',
                    margin: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <h2>NewsFeed</h2>
                </div>
                {this.state.news.length === 0 ? <h3 style={{textAlign: 'center'}}>News will appear here</h3> : this.state.news.map(single => (
                    <News single={single} key={single.url}/>
                ))}
            </div>
        )
    }
}

export default newsfeed;