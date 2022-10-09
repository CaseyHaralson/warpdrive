import { readdir, readFile } from "fs/promises";

const directory = '../fakedb';

export async function findStocks(symbol: String) {
    let stocks = [];

    try {
        const files = await readdir(directory);
        for (const file of files) {
            const fileStockSymbol = file.replace('.txt', '');
            if (!symbol || symbol.trim().length == 0 || fileStockSymbol == symbol) {
                let stock = { symbol: fileStockSymbol, values: []};

                const contents = (await readFile(directory + '/' + file, { encoding: 'utf8'}))
                    .replace('\r\n', '\n')
                    .replace('\r', '\n')
                    .split('\n');

                for (const dataRow of contents) {
                    if (dataRow.length > 0) {
                        const data = dataRow.split(' ');
                        const value = {
                            date: data[0],
                            value: data[1]
                        };
                        stock.values.push(value);
                    }
                }

                stocks.push(stock);
            }
        }
    } catch (err) {
        console.error(err, err.stack);
    }

    return stocks;
};