// this json file is generated with random values using https://www.json-generator.com/
import axios from 'axios';

export default async (req, res) => {
    let url = "http://localhost:8080/api";
    let headers = {
        'Content-Type': 'application/json'
    }
    switch (req.method) {
        case "GET":
            if (req.url.indexOf('/api/property?email') > -1) {
                url = url + "/property/user/email?email=" + req.query.email + "&page=0&size=200&orderBy=id&order=asc"
                await axios
                    .get(url)
                    .then((response) => {
                        if (!response.data.success) {
                            res.status(500).json({ err: response.data.errorMsg })
                        } else {
                            let data = response.data;
                            res.status(200).json({ data })
                        }
                    })
                    .catch(({ err }) => {
                        res.status(400).json({ err })
                    })
            } else if (req.url.indexOf('/api/property') > -1) {
                url = url + "/property/all?page=0&size=200&orderBy=id&order=asc"
                await axios
                    .get(url)
                    .then((response) => {
                        if (!response.data.success) {
                            res.status(500).json({ err: response.data.errorMsg })
                        } else {
                            let data = response.data;
                            res.status(200).json({ data })
                        }
                    })
                    .catch(({ err }) => {
                        res.status(400).json({ err })
                    })
            }
            res.end();


            // res.statusCode = 200;
            // res.json({ properties: properties })
            break;
        case "POST":
            url = url + "/property";
            await axios
                .post(url, req.body, headers)
                .then((response) => {
                    if (!response.data.success) {
                        res.status(500).json({ err: response.data.errorMsg })
                    } else {
                        let data = response.data;
                        res.status(200).json(data)
                    }
                })
                .catch((err) => {
                    console.log(err.response.data)
                    res.status(400).json(err.response.data)
                }).then(function () {
                    // always executed
                })

            break;
        case "PATCH":
            url = url + "/property";
            await axios
                .patch(url, req.body, headers)
                .then((response) => {
                    if (!response.data.success) {
                        res.status(500).json({ err: response.data.errorMsg })
                    } else {
                        let data = response.data;
                        res.status(200).json(data)
                    }
                })
                .catch((err) => {
                    console.log(err.response.data)
                    res.status(400).json(err.response.data)
                }).then(function () {
                    // always executed
                })

            break;
        case "PUT":
            break;
        case "DELETE":
            url = url + "/property/" + req.query.id;
            await axios
                .delete(url, {}, headers)
                .then((response) => {
                    if (!response.data.success) {
                        res.status(500).json({ err: response.data.errorMsg })
                    } else {
                        let data = response.data;
                        res.status(200).json(data)
                    }
                })
                .catch((err) => {
                    console.log(err.response.data)
                    res.status(400).json(err.response.data)
                }).then(function () {
                    // always executed
                })

            break;
    }

}