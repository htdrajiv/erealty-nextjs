import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import ReactMapGL, {
    FullscreenControl, GeolocateControl, Marker, NavigationControl,
    ScaleControl, FlyToInterpolator
} from 'react-map-gl';
const Geocoder = dynamic(() => import('react-map-gl-geocoder'), { ssr: false });
import { token, styles } from "./config"
import ImageLoader from "../Misc/ImageLoader";
import $ from 'jquery'

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const mapTypes = {
    satellite: "satellite",
    light: "light",
    basic: "basic"
}

const geolocateStyle = {
    position: 'absolute',
    top: 50,
    right: 10,
    padding: '5px'
};

const fullscreenControlStyle = {
    position: 'absolute',
    top: 5,
    left: 0,
    padding: '10px'
};

const navStyle = {
    position: 'absolute',
    top: 72,
    left: 0,
    padding: '10px'
};

const scaleControlStyle = {
    position: 'absolute',
    bottom: 36,
    left: 0,
    padding: '10px'
};

const customButtonsStyle = {
    position: 'absolute',
    top: 100,
    right: 5,
    padding: '5px'
}

function MyMapBox(props, query) {
    const router = useRouter();
    const [state, setState] = useState({
        viewport: {},
        userLocation: {},
        searchResultLayer: {},
        geocoderSearchCoordinates: {},
        mapStyle: styles.basic,
        searchLocation: "",
        autoGeolocateControl: false
    })

    const mapRef = useRef();

    useEffect(() => {
        if (router && router.query) {
            getDefaultViewPort();
        }
    }, [router])



    let onViewportChange = viewport => {
        setState({
            ...state,
            viewport: viewport
        });
    };

    let onGeocoderResult = (result) => {
        setState({
            ...state,
            geocoderSearchCoordinates: { lat: result.result.geometry.coordinates[1], long: result.result.geometry.coordinates[0] }
        })
    }

    let getGeocoderSearchMarker = () => {
        const { geocoderSearchCoordinates } = state;
        let marker = (
            <div />
        )
        if ((typeof geocoderSearchCoordinates.lat !== 'undefined' && geocoderSearchCoordinates.lat !== null)
            && (typeof geocoderSearchCoordinates.long !== 'undefined' && geocoderSearchCoordinates.long !== null)
        ) {
            marker = (<Marker
                latitude={geocoderSearchCoordinates.lat}
                longitude={geocoderSearchCoordinates.long}
            >
                <ImageLoader name={'searched-location-marker.png'} alt={'img'} />
            </Marker>)
        }
        return marker;
    }

    let onMapTypeChange = (key) => {
        setState({
            ...state,
            mapStyle: styles[key]
        })
    }

    let getDefaultViewPort = () => {
        const searchText = router.query.searchText
        if (typeof searchText !== 'undefined' && searchText !== null && searchText !== "") {
            $.ajax({
                url: "https://api.mapbox.com/geocoding/v5/mapbox.places/" + searchText + ".json?access_token=" + token,
                cache: false,
                success: function (data) {
                    let features = data.features[0];
                    if (typeof features !== 'undefined') {
                        let viewport = {
                            longitude: features["center"][0],
                            latitude: features["center"][1],
                            zoom: 15,
                            transitionDuration: 2000,
                            transitionInterpolator: new FlyToInterpolator(),
                        };
                        setState({
                            ...state,
                            viewport: viewport,
                            searchLocation: features["place_name"],
                            autoGeolocateControl: false,
                        })
                    } else {
                        toast.error("Not a valid address");
                        setState({
                            ...state,
                            autoGeolocateControl: true,
                        })
                    }
                },
                error: function (xhr, status, err) {
                    console.error(props.url, status, err.toString());
                }
            });
        } else {
            setUserLocation();
        }
        return viewport;

    }

    let setUserLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            let userLocation = {
                lat: position.coords.latitude,
                long: position.coords.longitude
            };
            let userViewport = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 10
            };
            setState({
                ...state,
                viewport: userViewport,
                userLocation: userLocation
            });
        });
    };

    const { viewport, mapStyle, autoGeolocateControl } = state;
    let satelliteActive = mapStyle === styles[mapTypes.satellite] ? `active` : '';
    let basicActive = mapStyle === styles[mapTypes.basic] ? `active` : '';
    let lightActive = mapStyle === styles[mapTypes.light] ? `active` : '';
    let GeocoderSearchMarker = getGeocoderSearchMarker();
    if (mapRef !== null && typeof mapRef !== undefined) {
        return (
            <div style={{ height: props.height, width: props.width }}>
                <ReactMapGL
                    ref={mapRef}
                    {...viewport}
                    width="100%"
                    height="100%"
                    mapStyle={mapStyle}
                    mapboxApiAccessToken={token}
                    onViewportChange={onViewportChange}
                >
                    <GeolocateControl
                        style={geolocateStyle}
                        positionOptions={{ enableHighAccuracy: true }}
                        trackUserLocation={true}
                        showUserLocation={false}
                        auto={autoGeolocateControl}
                    />
                    <Geocoder
                        mapRef={mapRef}
                        onResult={onGeocoderResult}
                        viewport={viewport}
                        hideOnSelect={true}
                        onViewportChange={onViewportChange}
                        mapboxApiAccessToken={token}
                        trackProximity={true}
                    />
                    {GeocoderSearchMarker}
                    <div style={fullscreenControlStyle}>
                        <FullscreenControl />
                    </div>
                    <div style={navStyle}>
                        <NavigationControl />
                    </div>
                    <div style={scaleControlStyle}>
                        <ScaleControl />
                    </div>
                    <div style={customButtonsStyle}>
                        <DropdownButton id="dropdown-basic-button" title="Map"
                            variant="secondary"
                            onSelect={onMapTypeChange}>
                            <Dropdown.Item eventKey={mapTypes.satellite} className={satelliteActive} >Satellite</Dropdown.Item>
                            <Dropdown.Item eventKey={mapTypes.light} className={lightActive} >Light</Dropdown.Item>
                            <Dropdown.Item eventKey={mapTypes.basic} className={basicActive} >Basic</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </ReactMapGL>
            </div>
        );
    }

    return (
        <div></div>
    )
}

export default MyMapBox;