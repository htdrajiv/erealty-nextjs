import axios from 'axios';

export default async (req, res) => {
    let url = process.env.SERVICE_API;
    switch (req.method) {
        case "GET":
            url = url + "/api/user/" + req.query.userId
            console.log(url)
            axios.get(url)
                .then(function (response) { res.status(200).json(response.data) })
                .catch(function () {
                    console.log(err.response.data)
                    res.status(400).json(err.response.data)
                })
                .then(function () { })
            break;
        case "POST":
            const headers = {
                'Content-Type': 'application/json'
            }
            url = url + "/api/user";
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
        case "PUT":
            break;
        case "DELETE":
            break;
    }

}