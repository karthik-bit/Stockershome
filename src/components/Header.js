import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

    render() {
        return(
            <div>
                <div className="header">
                    <div className="w3ls_header_middle">
                        <div className="container">
                            <div className="agileits_logo">
                                <h1><Link to="/" ><span>Stock</span> Exchange<i>Anytime anywhere</i></Link></h1>
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                    </div>
                </div>
                <div className="trade_navigation">
                    <div className="container">
                        <nav>
                            <ul className="nav navbar-nav nav_1">
                                <li className="act"><Link to="/">Home</Link></li>
                                <li><Link to="/stock">Stocks</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header;

