import React, {Component} from 'react';
import News from '../components/news/News';
import axios from 'axios';
import StaticNews from '../util/StaticNews';

class newsfeed extends Component {
    constructor(props) {
        super(props);
        this.state = {news: []}
    }

    //do not uncomment this until required. 
    componentDidMount() {
        //uncomment the below 4 lines (axios part) before hosting.

        // axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=6c7ffa4ca7c343929691ae092e280890').then((res) => {
        //     const data = res.data.articles;
        //     this.setState({news: data});
        // });

        //comment out the below line before hosting
        this.setState({news: StaticNews.articles});
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