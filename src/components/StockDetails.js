import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Charty from "react-charty";
import "react-datepicker/dist/react-datepicker.css";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class StockDetails extends Component {
  constructor() {
    super();

    this.state = {
      baseURL: 'http://localhost:3005',
      columnDefs: [
        {headerName: "Timestamp", field: "timestamp", filter: 'agTextColumnFilter'},
        {headerName: "Symbol", field: "symbol", filter: 'agTextColumnFilter'},
				{headerName: "Name", field: "name", filter: 'agTextColumnFilter', cellRenderer: (params) => {
          var link = document.createElement('a');
          link.onclick = ()=>{
            console.log(params.rowIndex);
            this.showGraph(params.rowIndex);
          },
          link.innerText = params.value;
          return link;
      }},
        {headerName: "Industry", field: "industry", filter: 'agTextColumnFilter'},
        {headerName: "Open", field: "open", filter: 'agTextColumnFilter'},
				{headerName: "High", field: "high", filter: 'agTextColumnFilter'},
				{headerName: "Low", field: "low", filter: 'agTextColumnFilter'},
				{headerName: "Close", field: "close", filter: 'agTextColumnFilter'},
				{headerName: "Volumes", field: "volumes", filter: 'agTextColumnFilter'}
      ],
      symbolData: [],
      chartData: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
    this.onGridReady = this.onGridReady.bind(this);
    this.showGraph = this.showGraph.bind(this);
  }

  showGraph(pos) {
    console.log("POSITION",pos);
    const chartData = {
      names: {
        y0: "Day",
      },
      colors: {
        y0: "#000000",
      },
      data: {
        x: [
          ...new Set(
            companystockdata.map((item) =>
              new Date(item.timestamp).getTime()
            )
          ),
        ],
        y0: [...new Set(companystockdata.map((item) => item.close))],
      },
      startX: new Date(companystockdata[0].timestamp).getTime(),
      endX: new Date('2020-05-11').getTime(),
      yAxisType: "number",
      xAxisType: "longDate",
      type: "line",
      showPreview: false,
      showRangeText: false,
    };
    this.setState(
      {
        chartData: chartData,
      },
      () => {
        console.log(this.state);
      }
    );
  }

  componentDidMount() {
    fetch(this.state.baseURL+'/history?symbol='+this.props.match.params.id)
      .then(response => response.json())
      .then(resData => {
        console.log(resData);

        this.setState({
          symbolData: resData
        })

        this.sizeToFit();
      });
  }

  sizeToFit(){
    this.gridApi.sizeColumnsToFit();
  };

  handleChange(date) {
    this.setState({
      from_date: date,
    });
  }

  submitHandle(event) {
    event.preventDefault();
    let companystockdata = [
        {
          timestamp: "2020-03-23T14:00:00.000Z",
          symbol: "AAPL",
          name: "Apple Inc.",
          industry: "Information Technology",
          open: 228.08,
          high: 228.5,
          low: 212.61,
          close: 224.37,
          volumes: 83134900,
        },
        {
          timestamp: "2020-03-22T14:00:00.000Z",
          symbol: "AAPL",
          name: "Apple Inc.",
          industry: "Information Technology",
          open: 247.18,
          high: 251.83,
          low: 228,
          close: 229.24,
          volumes: 100423000,
        },
        {
          timestamp: "2020-03-19T14:00:00.000Z",
          symbol: "AAPL",
          name: "Apple Inc.",
          industry: "Information Technology",
          open: 247.385,
          high: 252.84,
          low: 242.61,
          close: 244.78,
          volumes: 67964300,
        },
      ];
    fetch(
      "/all?symbol=" +
        this.state.stockSearch +
        "&&industry=" +
        this.state.industrySearch
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            stockData: stockdata,
            stockOptions: [...new Set(stockdata.map((item) => item.symbol))],
            industryOptions: [
              ...new Set(stockdata.map((item) => item.industry)),
            ],
          });
        },
        (error) => {
          const chartData = {
            names: {
              y0: "Day",
            },
            colors: {
              y0: "#000000",
            },
            data: {
              x: [
                ...new Set(
                  companystockdata.map((item) =>
                    new Date(item.timestamp).getTime()
                  )
                ),
              ],
              y0: [...new Set(companystockdata.map((item) => item.close))],
            },
            startX: new Date(companystockdata[0].timestamp).getTime(),
            endX: new Date(
              companystockdata[companystockdata.length - 1].timestamp
            ).getTime(),
            yAxisType: "number",
            xAxisType: "longDate",
            type: "line",
            showPreview: false,
            showRangeText: false,
          };
          this.setState(
            {
              companystockData: companystockdata,
              chartData: chartData,
            },
            () => {
              console.log(this.state);
            }
          );
        }
      );
  }

  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  render() {
    return (
      <div>
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
            rowData={this.state.symbolData}
            pagination={true}
            paginationPageSize='10'
            onGridReady={this.onGridReady}>
          </AgGridReact>
        </div>
        <div style={{flex: 1}}></div>
      </div>
        <div className="agileits_search col-sm-12">
          {Object.keys(this.state.chartData).length > 0 ? (
            <Charty title="Closing" {...this.state.chartData} />
          ) : null}
        </div>
      </div>
    );
  }
}
export default StockDetails;
