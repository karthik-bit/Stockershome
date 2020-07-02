import React, { Component } from "react";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class Stock extends Component {
  constructor() {
    super();

    this.state = {
      baseURL: 'http://localhost:3005',
      stockSearch:'',
      industrySearch:'',
      industryOptions: [],
      stockOptions: [],
      stockData: [],
      columnDefs: [
				{headerName: "Symbol", field: "symbol", filter: 'agTextColumnFilter', cellRenderer: (params) => {
          var link = document.createElement('a');
          link.href = 'stock/'+params.value;
          link.innerText = params.value;
          return link;
      }},
				{headerName: "Name", field: "name", filter: 'agTextColumnFilter'},
				{headerName: "Industry", field: "industry", filter: 'agTextColumnFilter'}
			],
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
    this.onGridReady = this.onGridReady.bind(this);
    this.sizeToFit = this.sizeToFit.bind(this);
  }

  componentDidMount() {
    fetch(this.state.baseURL+'/all')
      .then(response => response.json())
      .then(resData => {
        console.log(resData);
        
        var industryList = [];
        var stockList = [];

        resData.forEach((item, index) => {
          if(!industryList.includes(item.industry)){
            industryList.push(item.industry);
          }

          if(!stockList.includes(item.symbol)){
            stockList.push(item.symbol);
          }
        });

        this.setState({
          stockData: resData,
          industryOptions: industryList,
          stockOptions: stockList
        })

        this.sizeToFit();
      });
  }

  sizeToFit(){
    this.gridApi.sizeColumnsToFit();
  };


  handleChange(event, item) {
    this.setState({
      [event.target.name]: event.target.value
    });

    if(item === 1){
      this.setState({
        stockSearch: event.target.value
      })
    } else if(item === 2){
      this.setState({
        industrySearch: event.target.value
      })
    }
  }

  submitHandle(event) {
    event.preventDefault();
    var lastPart = null;
    if(this.state.stockSearch !== ""){
      lastPart = this.state.stockSearch;
    }

    if(this.state.industrySearch !== ""){
      if(lastPart!=null){
        lastPart = '&'+this.state.industrySearch;
      } else {
        lastPart = this.state.industrySearch;
      }
    }

    fetch(this.state.baseURL+'/all')
      .then(response => response.json())
      .then(resData => {
        console.log(resData);
        this.setState({
          stockData: resData
        })
      });
  }

  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  
  render() {
    return (
      <div style={{display: 'flex', height: '50vh', width: '100%', marginTop: '10vh', marginBottom: '10vh'}}>
        <div style={{flex: 1}}></div>
        <div className="ag-theme-balham"
          style={{
            height: '100%',
            width: '100%',
            flex: 3
          }}>
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.stockData}
            pagination={true}
            paginationPageSize='10'
            onGridReady={this.onGridReady}>
          </AgGridReact>
        </div>
        <div style={{flex: 1}}></div>
      </div>
    );
  }
}

export default Stock;
