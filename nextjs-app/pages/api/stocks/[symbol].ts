import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { symbol } = req.query;
    if (req.method === 'POST') {
        const result = await fetch(`http://127.0.0.1:5000/api/stocks/scrape/${symbol}`, { method: 'POST'});
        
        if (result.ok) {
            const resultBody = JSON.parse(await result.text());
            return res.status(200).json(resultBody);
        }
        else {
            return res.status(result.status);
        }
        
    } else return res.status(405).send({ message: 'Only POST requests allowed'});
}