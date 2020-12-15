// this json file is generated with random values using https://www.json-generator.com/
import properties from '../../seeders/properties.json'

export default (req, res) => {
    switch (req.method) {
        case "GET":
            res.statusCode = 200;
            res.json({ properties: properties })
            break;
        case "POST":
            break;
        case "PUT":
            break;
        case "DELETE":
            break;
    }

}