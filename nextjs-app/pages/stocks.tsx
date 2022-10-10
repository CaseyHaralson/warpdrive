import Layout, { siteTitle } from "./components/layout";
import Head from 'next/head'
import layoutStyles from '../styles/layout.module.css';
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useState, useRef, useEffect } from "react";
import stocksStyles from '../styles/stocks.module.css';

// exported as default
function StocksPage({ stockData }) {
    const pageTitle = `Stock Closing Values - ${siteTitle}`;

    const [stockFilterText, setStocksFilterText] = useState('');
    const stocksFilterTextChanged = (e) => {
        setStocksFilterText(e.target.value);
    };
    const clearFilterText = () => {
        setStocksFilterText('');
    }

    const [stocks, setStocks] = useState(stockData);
    const filterStocksEvent = async () => {
        const data = await getStockData(stockFilterText);
        setStocks(data);
    };

    return (
        <Layout>
            <Head>
                <title>{pageTitle}</title>
            </Head>

            <div className="container">
                <div className={layoutStyles.header}>
                    <h1>Stock Closing Values</h1>
                </div>

                <SymbolFilter filterText={stockFilterText} onFilterTextChange={stocksFilterTextChanged} onFilter={filterStocksEvent}></SymbolFilter>

                <StockGrid stockData={stocks}></StockGrid>

                <LoadStock clearFilterText={clearFilterText} reloadPageStockData={filterStocksEvent}></LoadStock>

            </div>
        </Layout>
    );
}

function SymbolFilter({ filterText, onFilterTextChange, onFilter }) {
    const inputKeyDown = (e) => {
        if (e.key == 'Enter') onFilter();
    }

    return (
        <div className={stocksStyles.symbolFilter}>
            <div className="row align-items-center">
                <div className="col-auto">
                    <label htmlFor='symbolFilterInput' className="form-label">Symbol Filter</label>
                </div>
                <div className="col-auto">
                    <input id="symbolFilterInput" type='text' className='form-control' onInput={onFilterTextChange} onKeyDown={inputKeyDown} value={filterText}></input>
                </div>
                <div className="col-auto">
                    <button type="button" className="btn btn-outline-primary" onClick={onFilter}>Filter</button>
                </div>
            </div>
        </div>
    );
}

function StockGrid({ stockData }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Date</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {stockData.stocks.map(stock => {
                    return (
                        <StockRows key={stock.symbol} stock={stock}></StockRows>
                    );
                })}
            </tbody>
        </table>
    );
}

function StockRows({ stock }) {
    return (
        <>
            {stock.values.map((value, index) => {
                return (
                    <tr key={index}>
                        <th>{stock.symbol}</th>
                        <th>{value.date}</th>
                        <th>{value.value}</th>
                    </tr>
                );
            })}
        </>
    );
}

function LoadStock({ clearFilterText, reloadPageStockData }) {
    const [symbol, setSymbol] = useState();
    const symbolTextChanged = (e) => {
        setSymbol(e.target.value);
        clearFilterText();
    };
    const inputKeyDown = (e) => {
        if (e.key == 'Enter') loadStockData();
    }

    const[errors, setErrors] = useState('');

    const loadStockData = async () => {
        const result = await fetch(`/api/stocks/${symbol}`, { method: 'POST'});

        if (result.ok) {
            const resultBody = JSON.parse(await result.text());
            if (resultBody.success) {
                setErrors('');
                reloadPageStockData();
            }
            else {
                setErrors(resultBody.errorMessage);
            }
        }
        else {
            setErrors(`There was a problem with the server. Error code: ${result.status}`);
        }
    }

    return (
        <>
            <div className={stocksStyles.loadStock}>
                <button type="button" className="btn btn-outline-secondary btn-sm" data-bs-toggle='modal' data-bs-target='#loadStockModal'>Load Stock</button>
            </div>

            <div className="modal fade" id="loadStockModal" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Load Stock</h1>
                            <button type="button" className="btn-close" data-bs-dismiss='modal'></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <p className={stocksStyles.loadStockModalDescription}>
                                    Loading a stock requires the python server to be running as well.
                                    Using this functionality will add the stock&apos;s last close value to the stock data.
                                    This means that you can end up with duplicate data because the python server isn&apos;t trying to be too smart.
                                    This is just a demo app and the duplication can actually help show that activity is happening. 
                                </p>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <label htmlFor='symbolLoadInput' className="form-label">Symbol</label>
                                </div>
                                <div className="col-auto">
                                    <input id="symbolLoadInput" type='text' className='form-control' onInput={symbolTextChanged} onKeyDown={inputKeyDown}></input>
                                </div>
                                <div className="col-auto">
                                    <button type="button" className="btn btn-outline-primary" onClick={loadStockData}>Load</button>
                                </div>
                            </div>
                            <div className={stocksStyles.loadStockModalErrors}>{errors}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

async function getStockData(symbol?: String) {
    const client = new ApolloClient({
        uri: 'http://localhost:3000/api/graphql',   // TODO: this should be moved to an environment variable or something
        cache: new InMemoryCache()
    });

    let symbolQuery = '';
    if (symbol) symbolQuery = `(symbol: "${symbol}")`;

    const {data} = await client.query({
        query: gql`
            query Stocks {
                stocks ${symbol ? symbolQuery : ''} {
                    symbol
                    values {
                        value
                        date
                    }
                }
            }
        `
    });

    return data;
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            stockData: await getStockData()
        }
    };
}

export default StocksPage;