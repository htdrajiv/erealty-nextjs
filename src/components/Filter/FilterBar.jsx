import React, { useState } from 'react';
import { Button, Form, } from 'react-bootstrap'

const FILTER_TYPES = { "PRICE": "PRICE" }
const FILTER = { [FILTER_TYPES.PRICE]: { minPrice: "", maxPrice: "" } }

function PriceFilter(props) {
    const [state, setState] = useState({
        reload: false, validated: false
    })

    let handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    let setValidated = (flag) => {
        setState({
            ...state,
            validated: flag
        })
    }

    let reload = (fieldKey, event) => {
        FILTER["PRICE"][fieldKey] = event.target.value;
        setState({
            ...state,
            reload: true
        })
    }

    const { validated } = state;
    return (
        <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group md="4" controlId="priceFilterFormGrp">
                    <Form.Label className="">Min Price</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        step="1"
                        placeholder="Min Price"
                        max={FILTER[FILTER_TYPES.PRICE]["maxPrice"]}
                        value={FILTER[FILTER_TYPES.PRICE]["minPrice"]}
                        onChange={reload.bind('minPrice')}
                    />
                    <Form.Control.Feedback type="invalid">
                        Only Numbers, Less Than Max
                        </Form.Control.Feedback>
                </Form.Group>
                <Form.Group md="4" controlId="validationCustom02">
                    <Form.Label className="">Max Price</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        step="1"
                        placeholder="Max Price"
                        min={FILTER[FILTER_TYPES.PRICE]["minPrice"]}
                        value={FILTER[FILTER_TYPES.PRICE]["maxPrice"]}
                        onChange={reload.bind('maxPrice')}
                    />
                    <Form.Control.Feedback type="invalid">
                        Only Numbers, Greater Than Min
                        </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="bg-success">Apply</Button>
            </Form>

        </div>
    )
}

function TypeFilter() {
    return (
        <div>
            <Form>
                <Form.Group md="4" controlId="propertyTypeFormGrp">
                    <Form.Label className="">Property Type</Form.Label>
                    <Form.Control as="select" multiple>
                        <option>For Rent</option>
                        <option>For Sell</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" className="bg-success">Apply</Button>
            </Form>
        </div>
    )
}

function MoreFilter() {
    return (
        <div>
            <Form>
                <Form.Group md="4" controlId="carParkingSpaceFormGrp">
                    <Form.Label className="">Car Parking Space:</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group md="4" controlId="bikeParkingSpaceFormGrp">
                    <Form.Label className="">Bike Parking Space:</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group md="4" controlId="yearBuiltFormGrp">
                    <Form.Label className="">Year Built:</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" className="bg-success">Apply</Button>
            </Form>
        </div>
    )

}

function FilterBar(props) {
    const [state, setState] = useState({
        priceSection: false, validated: false, saveFilter: false,
        filterSections: ['priceSection', 'typeSection', 'moreSection']
    })

    let toggleSection = (name, e) => {
        for (var section of state.filterSections) {
            if (name !== section)
                state[section] = false;
        }
        setState({
            ...state,
            [name]: !state[name]
        })
    }

    let openModal = (name, e) => {
        setState({
            ...state,
            [name]: true
        })
    }

    let closeModal = (name, e) => {
        setState({
            ...state,
            [name]: false
        })
    }

    let handleSaveFilter = (event) => {
        setState({
            ...state,
            saveFilter: event.target.checked
        })

    }

    let getFilterSection = (filter, filterSection) => {
        return (
            state[filterSection] && (
                <div className="filter_section_expanded">
                    {filter}
                </div>
            )
        )
    }

    return (
        <div className='filter-bar'>
            <ul className="filter-list list-group list-group-horizontal">
                <li className="filter-list-item">
                    <button className="btn btn-outline-secondary btn-wrap-text" onClick={toggleSection.bind(this, 'priceSection')}>
                        Price
                    </button>
                    {getFilterSection(<PriceFilter />, 'priceSection')}
                </li>

                <li className="filter-list-item">
                    <button className="btn btn-outline-secondary btn-wrap-text" onClick={toggleSection.bind(this, 'typeSection')}>
                        Property Type
                    </button>
                    {getFilterSection(<TypeFilter />, 'typeSection')}
                </li>

                <li className="filter-list-item">
                    <button className="btn btn-outline-secondary btn-wrap-text" onClick={toggleSection.bind(this, 'moreSection')}>
                        More Options
                    </button>
                    {getFilterSection(<MoreFilter />, 'moreSection')}
                </li>
            </ul>
        </div >
    )
}

export default FilterBar;