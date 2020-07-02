import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

class Dashboard extends Component {
    render() {
        return(
            <div className="container-fluid">
                <Carousel>
                    <div>
                        <img src="public/images/2.jpg" />
                        <h2 className="custom-msg">Trade Over World's Leading 
                        <br />Stock Exchanges</h2>
                    </div>
                    <div>
                        <img src="public/images/5.jpg" />
                        <p className="legend">Enjoy Unique Benefits</p>
                    </div>
                    <div>
                        <img src="public/images/6.jpg" />
                        <p className="legend">Grow Your Money With Trade Market</p>
                    </div>
                </Carousel>
                <div className="col-sm-12">
                    <div className="col-sm-6 stock-img-div">
                    <img className="stock-img" src="public/images/stock.jpg" />
                    </div>
                    <div className="col-sm-6 stock-exchange-info">
                        <div className="stock-exchange-header">
                            <h2>What Is an Exchange?</h2>
                        </div>
                        <div>First, what is an exchange? Put simply, an exchange is a locale where things are traded—where producers and consumers, or buyers and sellers, meet, and things are bought and sold. For financial products, these things that are traded include stocks, bonds, commodities, currencies, derivatives, and so on.
                        Modern financial exchanges have evolved from open-outcry auctions literally on the curbside of the streets of New York or London to highly regulated and respected institutions, today dominated by electronic trading.
                        If a stock does not trade on a listed exchange, it can still trade in the over-the-counter (OTC) market, which is a less formal and less regulated venue. These OTC-traded shares typically will involve smaller (and riskier) companies, such as penny stocks, since they may not meet the listing requirements for established stock exchanges.</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Dashboard;