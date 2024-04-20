import React from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import AddProperty from './AddProperty'
import PropertyList from './PropertyList'

function Property(props) {
    return (
        <div className="container-fluid">
            <div className="row top-margin-1">
                <div className="col-sm" >
                    <Tabs defaultActiveKey="properties" id="properties-tab">
                        <Tab eventKey="properties" title="Properties">
                            <PropertyList />
                        </Tab>
                        <Tab eventKey="addProperty" title="Add New Property">
                            <AddProperty />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Property;