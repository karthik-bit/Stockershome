import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, browserHistory } from 'react-router-dom';
import Header from './src/components/Header'
import Footer from './src/components/Footer'
import Stock from './src/components/Stock'
import Home from './src/components/Home'
import stockCompany from './src/components/StockDetails'

class App extends Component {
    render() {
        return(
            <div>
                <Router history={browserHistory}>
                    <div>
                    <Header />
                        <Switch>
                            <Route exact path = '/' component = {Home} />
                            <Route exact path = '/stock' component = {Stock} />
                            <Route exact path = '/stock/:id' component = {stockCompany} />
                        </Switch>
                    <Footer />
                    </div>
                </Router>
            </div>
        );
    }
}
export default App;