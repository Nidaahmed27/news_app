import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import proptypes from 'prop-types'

export default class News extends Component {
    articles = []
    static defaultProps = {
        country: 'in',
        pageSize: '5',
        category: 'general'
    }
    static propTypes = {
        country: proptypes.string,
        pageSize: proptypes.number,
        category: proptypes.string,
    }



    constructor() {
        super();
        console.log("this is constructor from news");
        this.state = {
            articles: [],
            loading: false,
            page: 1

        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c00c664d48eb4d0387af267c48f9d9af&page=1&pageSize=${this.props.pageSize}`
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseddata = await data.json()
        console.log(parseddata)
        this.setState({
            articles: parseddata.articles,
            totalResults: parseddata.totalResults,
            loading: false
        })
    }
    handlePrevClick = async () => {
        console.log("prev");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c00c664d48eb4d0387af267c48f9d9af&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseddata = await data.json()
        console.log(parseddata)
        this.setState({
            page: this.state.page - 1,
            articles: parseddata.articles,
            loading: false
        })
    }
    handleNextClick = async () => {
        console.log("next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c00c664d48eb4d0387af267c48f9d9af&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            this.setState({ loading: true });
            let data = await fetch(url);
            let parseddata = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parseddata.articles,
                loading: false
            })
        }

    }

    render() {
        return (
            <div>
                <div className="container my-3">

                    <h1 className='text-center'>News Monkey-Top Headlines</h1>
                    {this.state.loading && < Spinner />}
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                            </div>

                        })}
                    </div>
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div >
        )
    }

}