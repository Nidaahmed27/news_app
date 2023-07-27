import React, { Component } from 'react'

export default class NewsItems extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <>
                <div>

                    <div className="card" style={{ width: "18rem" }}>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >{source.name}</span>
                        <img src={!imageUrl ? "https://cdn.ndtv.com/common/images/ogndtv.png" : imageUrl} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}...</p>
                            <p className="card-text">
                                <small className="text-muted">by {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small>
                            </p>
                            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer">Read More</a>

                        </div>
                    </div>

                </div>

            </>
        )
    }
}
