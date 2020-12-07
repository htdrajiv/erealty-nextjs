import React from 'react'
import { Spinner } from 'react-bootstrap';
import Icons from './Icons.js'
import ImageLoader from '../ImageLoader.jsx'

const plot_types = { scattermapbox: "scattermapbox" };
const plot_modes = { markers: "markers", text: "text" };
const trace_types = { available: "AVAILABLE", occupied: "OCCUPIED", currentLocation: "CURRENT_LOCATION" };
const color_configs = {
    [trace_types.available]: 'red',
    [trace_types.occupied]: 'rgb(0, 159, 134)',
    [trace_types.currentLocation]: 'blue'
};

var mapCustomButtons = [
    {
        buttons: [
            {
                args: [{ 'mapbox.bearing': 0 }],
                label: `<b>N</b>`,
                method: 'relayout'
            },
            {
                args: [{ 'mapbox.pitch': 0 }],
                label: `<b>0</b>`,
                method: 'relayout'
            }

        ],
        direction: 'left',
        pad: { 'r': 1, 't': 1 },
        showactive: true,
        type: 'buttons',
        x: 0.99,
        xanchor: 'right',
        y: 0.89,
        yanchor: 'top',
    },
    {
        buttons: [
            {
                args: [{ dragmode: 'zoom' }],
                label: 'Pan',
                method: 'relayout'
            },
            {
                args: [{ dragmode: 'lasso' }],
                label: 'Free Select',
                method: 'relayout'
            },
            {
                args: [{ dragmode: 'select' }],
                label: 'Box Select',
                method: 'relayout'
            },

        ],
        direction: 'left',
        pad: { 'r': 1, 't': 1 },
        showactive: true,
        type: 'dropdown',
        x: 0.99,
        xanchor: 'right',
        y: 0.99,
        yanchor: 'top',
    },
    {
        buttons: [
            {
                args: ['mapbox.style', 'streets'],
                label: 'Street',
                method: 'relayout'
            },
            {
                args: ['mapbox.style', 'satellite-streets'],
                label: 'Satellite',
                method: 'relayout'
            }
        ],
        direction: 'right',
        pad: { 'r': 10, 't': 10 },
        showactive: true,
        type: 'dropdown',
        x: 0,
        xanchor: 'left',
        y: 1.01,
        yanchor: 'top',
        className: "btn-sm",
    }
];


let layout = {
    scattermapbox: {
        revision: "1",
        data: [
            {
                name: trace_types.currentLocation,
                type: plot_types.scattermapbox,
                mode: plot_modes.markers,
                lat: [],
                lon: [],
                hovertext: ['Home'],
                hoverinfo: 'text',
                marker: { color: color_configs[trace_types.currentLocation], size: 15, symbol: "castle" },
            },
            {
                name: trace_types.available,
                type: plot_types.scattermapbox,
                mode: plot_modes.markers,
                lat: [],
                lon: [],
                marker: { color: color_configs[trace_types.available], size: 10 },
                unselected: {
                    marker: {
                        opacity: 0.2
                    },
                },
                selected: {
                    marker: {
                        opacity: 1
                    }
                }
            }
        ],
        layout: {
            modebar: {
                bgcolor: 'yellow',
                orientation: 'v'
            },
            dragmode: 'zoom',
            autosize: true,
            hovermode: 'closest',
            updatemenus: mapCustomButtons,
            //height:'500',
            //width:'600',
            mapbox: {
                bearing: 0,
                pitch: 0,
                domain: {
                    x: [0, 1],
                    y: [0, 1]
                },
                style: 'streets',
                zoom: 8,

            },
            margin: {
                r: 0,
                t: 30,
                b: 0,
                l: 0,
                pad: 0
            },
            plot_bgcolor: '#efe6e6',
            //showlegend: true,
            //title: 'Search',
            legend: {
                x: 0,
                y: 1.1,
                orientation: 'h',
                traceorder: 'normal',
                font: {
                    family: 'sans-serif',
                    size: 15,
                    color: '#000'
                },
                bgcolor: 'white'
            },
        },
        frames: [],
        config: {
            mapboxAccessToken: "pk.eyJ1IjoiaHRkcmFqaXYiLCJhIjoiY2thY3NsY2JkMDFqZTJzbWhjeGp6MjIybSJ9.FxrmiakBiGApMzQjzCphmg",
            editable: false,
            displaylogo: false,
            responsive: true,
            displayModeBar: false,
            modeBarButtonsToAdd: [],
            modeBarButtonsToRemove: ['sendDataToCloud', 'hoverCompareCartesian', 'resetViewMapbox']
        }
    }
}

export default layout;