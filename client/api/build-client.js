import axios from 'axios'

export default ({ req }) => {
    if (typeof window === 'undefined') {
        //server
        return axios.create({
            baseURL: process.env.SERVER_URL_BASE,
            headers: req.headers
        })
    } else {
        return axios.create({
            baseURL: '/'
        })
    }
}