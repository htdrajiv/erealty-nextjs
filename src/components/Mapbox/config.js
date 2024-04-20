import React from 'react';

export const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export let styles = {
    "light": "mapbox://styles/mapbox/light-v9",
    "dark": "mapbox://styles/mapbox/dark-v9",
    "basic": "mapbox://styles/mapbox/basic-v9",
    "outdoor": "mapbox://styles/htdrajiv/ckkaj0rm3049517n9govmec5p",
    "satellite": "mapbox://styles/mapbox/satellite-v9"
}

export const mapBoxPlacesApiUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
