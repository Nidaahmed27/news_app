import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import proptypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

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



    constructor(props) {
        super(props);
        console.log("this is constructor from news");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0

        }
        document.title = ` ${this.props.category}-NEWS`;
    }
    async updateNews(pageNo) {
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseddata = await data.json()
        this.props.setProgress(70);

        console.log(parseddata)
        this.setState({
            articles: parseddata.articles,
            totalResults: parseddata.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updateNews()
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parseddata = await data.json()
        // console.log(parseddata)
        // this.setState({
        //     articles: parseddata.articles,
        //     totalResults: parseddata.totalResults,
        //     loading: false
        // })
    }
    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
        // console.log("prev");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parseddata = await data.json()
        // console.log(parseddata)
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parseddata.articles,
        //     loading: false
        // })
    }
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews()
        // console.log("next");
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        //     this.setState({ loading: true });
        //     let data = await fetch(url);
        //     let parseddata = await data.json()
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parseddata.articles,
        //         loading: false

        //     })
        // }

    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseddata = await data.json()
        console.log(parseddata)
        this.setState({
            articles: this.state.articles.concat(parseddata.articles),
            totalResults: parseddata.totalResults,
            loading: false
        })
    }

    render() {
        return (
            <div>
                <div className="container my-3" >

                    <h1 className='text-center'>{`News Monkey-Top ${this.props.category} Headlines`}</h1>
                    {this.state.loading && < Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container">
                            <div className="row">
                                {this.state.articles.map((element) => {
                                    return <div className="col-md-4 my-3" key={element.url}>
                                        <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source} />
                                    </div>


                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
                {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </div >
        )
    }

}