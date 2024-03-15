import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(request: NextApiResponse, response: NextApiResponse) {
    response.status(200).json({ message: 'Ola mundo' })
}