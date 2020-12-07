import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import Layout from '../Layout.jsx';

class MyMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: JSON.parse(JSON.stringify(Layout.scattermapbox.layout)),
            frames: JSON.parse(JSON.stringify(Layout.scattermapbox.frames)),
            config: JSON.parse(JSON.stringify(Layout.scattermapbox.config))
        };
        this.customizeLayout.bind(this);
        this.initializeDataPoints.bind(this);
        this.initializeCurrentPosition.bind(this);
        this.onRelayout.bind(this);
    }

    customizeLayout() {
        const { height, width } = this.props;
        const { layout } = this.state;
        layout.mapbox.center = {
            lat: this.props.currentPosition.latitude,
            lon: this.props.currentPosition.longitude
        };
    }

    initializeDataPoints() {
        const { propertyData } = this.props;
        var data = JSON.parse(JSON.stringify(Layout.scattermapbox.data));
        this.initializeCurrentPosition(data[0]);
        data[1].lat.push(...propertyData.scattermapbox.lat);
        data[1].lon.push(...propertyData.scattermapbox.lon);
        return data;
    }

    initializeCurrentPosition(currentPositionObj) {
        const { currentPosition } = this.props;
        currentPositionObj.lat.push(currentPosition.latitude);
        currentPositionObj.lon.push(currentPosition.longitude);
    }

    onPointsSelection() {

    }

    onPointsDeselection() {

    }

    onRelayout(obj) {

    }


    render() {
        const { frames, config, layout } = this.state;
        this.customizeLayout();
        var data = this.initializeDataPoints();
        return (
            <div id="mySearchMapBox">
                <Plot
                    id="MyMap"
                    useResizeHandler={true}
                    data={data}
                    layout={layout}
                    frames={frames}
                    config={config}
                    style={{ height: '100%', width: '100%' }}
                    onInitialized={(figure) => this.setState(figure)}
                    onSelected={(selectedPoints) => {
                        this.onPointsSelection(selectedPoints)
                    }}
                    onDeselect={() => {
                        this.onPointsDeselection();
                    }}
                    onRelayout={(obj) => {
                        this.onRelayout(obj)
                    }}
                //onUpdate={(figure) => this.setState(figure)}
                />
            </div>
        );
    }
}

export default MyMap;