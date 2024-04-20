import React, { Fragment, useState, useEffect } from 'react';
// import MyMap from '../plotly/mapbox/MyMap.jsx'
import MyMap from '../Mapbox/MyMapBox.jsx'
import PropertyList from './PropertyList'
import axios from 'axios';

// function PropertyCarousel() {
//     return (
//         <Carousel>
//             <Carousel.Item>
//                 <img
//                     className="d-block w-100"
//                     src="holder.js/800x400?text=First slide&bg=373940"
//                     alt="First slide"
//                 />
//                 <Carousel.Caption>
//                     <h3>First slide label</h3>
//                     <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//                 </Carousel.Caption>
//             </Carousel.Item>
//             <Carousel.Item>
//                 <img
//                     className="d-block w-100"
//                     src="holder.js/800x400?text=Second slide&bg=282c34"
//                     alt="Third slide"
//                 />

//                 <Carousel.Caption>
//                     <h3>Second slide label</h3>
//                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                 </Carousel.Caption>
//             </Carousel.Item>
//         </Carousel>
//     )
// }

function Search(props) {
    const [properties, setProperties] = useState({})
    const [state, setState] = useState({
        reloadPage: "JustToReload",
        currentPosition: {
            latitude: 0.0, longitude: 0.0,
        },
        sortBy: ""
    })

    useEffect(() => {
        setCurrentLocation();
        watchUserMovement();
        axios.get('/api/property')
            .then(function (response) {
                // handle success
                setProperties(response.data.data.response)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

    }, [])

    let setCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setState({
                    ...state,
                    currentPosition: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                })
            },
            function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }
        );
    }

    let watchUserMovement = () => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                setState({
                    ...state,
                    currentPosition: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                })
            });
        }
    }

    let reload = () => {
        setState({
            ...state,
            reload: "JustToReload"
        })
    }

    let handleViewPortChange = (filteredProperties) => {
        setProperties(filteredProperties)
    }

    let { currentPosition } = state;
    let propertyData = { scattermapbox: { lat: [], lon: [] } }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6" >
                    <MyMap
                        properties={properties}
                        currentPosition={currentPosition}
                        height={"45rem"}
                        width={"100%"}
                        onViewportChange={handleViewPortChange}
                    />
                </div>
                <div className="col-sm-6" style={{ padding: "0 2% 1% 1%" }}>
                    <PropertyList {...props} properties={properties} />
                </div>
            </div>
        </div>
    )
}

export default Search;