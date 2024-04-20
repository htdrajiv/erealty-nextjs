import React, { Fragment, useState, useEffect } from 'react';
import { Card, Form, Button, Col, Modal } from 'react-bootstrap'
import { Formik, ErrorMessage, Field, getIn } from 'formik';
import { propertySchema, userSchema, floorsSchema, featuresSchema } from './Schemas';
import { featureCodes } from '../constants';
import axios from 'axios';
import { toast } from "react-toastify";
import Router from 'next/router'
import { useSession } from 'next-auth/client'
import DefaultErrorPage from 'next/error'
import FileSelector from '../Misc/FileSelector'
import { uploadImages } from '../Misc/UploadImage'
import AddressForm from './AddressForm'
import ContactForm from './ContactForm'
import GeneralDescriptionForm from './GeneralDescriptionForm'
import FeaturesForm from './FeaturesForm'
import FloorsForm from './FloorsForm'
import { token, styles, mapBoxPlacesApiUrl } from "../Mapbox/config"

const forms = { "PROPERTY": "PROPERTY", "UPLOADIMAGES": "UPLOADIMAGES" }

function FileUploadForm(props) {
    const { onImageSelection, images } = props;
    return (
        <Form.Group>
            <Form.Row>
                <Form.Group as={Col} sm="6">
                    <Form.Label>Select Thumbnail Image</Form.Label>
                    <FileSelector
                        selectedFiles={[images.thumbnailImg.name]}
                        required={true} id="thumbnail-image" multiple={false} handleChange={onImageSelection('thumbnailImg')} types={"image/png, image/jpeg"} />
                </Form.Group>

                <Form.Group as={Col} sm="6">
                    <Form.Label>Select Image(s)</Form.Label>
                    <FileSelector
                        selectedFiles={images.imageNames}
                        required={true} id="other-images" multiple={true} handleChange={onImageSelection("images")} types={"image/png, image/jpeg"} />
                </Form.Group>
            </Form.Row>

        </Form.Group>
    )
}

function AddPropertyForm(props) {
    const [nextForm, setNextForm] = useState(forms.PROPERTY)
    const [session, loading] = useSession()
    if (loading) return (<div> Loading </div>)
    if (!loading && !session) return (<DefaultErrorPage statusCode={404} />)

    const [errors, setErrors] = useState({});
    const [images, setImages] = useState({
        thumbnailImg: "",
        otherImages: [],
        imageNames: [],
        files: []
    });
    const [user, setUser] = useState({
        userId: session.user.email,
        name: session.user.name,
        email: session.user.email
    })

    const [propertyFormValidated, setPropertyFormValidated] = useState(false);
    const [uploadImageFormValidated, setUploadImageFormValidated] = useState(false);

    const [address, setAddress] = useState({
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        state: "",
        country: "Nepal",
        zip: "",
        zipExtension: "",
        latitude: "",
        longitude: ""
    })

    const [propertyCoordinates, setPropertyCoordinates] = useState({
        latitude: 0,
        longitude: 0
    })

    const [contact, setContact] = useState({
        personalNumber: "",
        officeNumber: "",
        homeNumber: "",
        emailAddress: ""
    })

    const [features, setFeatures] = useState([])

    const [floors, setFloors] = useState([])

    const [property, setProperty] = useState({
        id: "",
        title: "",
        description: "",
        landArea: "",
        builtYear: "",
        thumbnailImg: "",
        address: address,
        contact: {},
        price: "",
        features: features,
        floors: floors,
        user: user,
        images: []
    })

    let onPropertyFormFieldsChange = (e) => {
        setProperty({
            ...property,
            [e.target.name]: e.target.value
        })
    }

    let onAddressFormFieldsChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    let setAddressCoordinates = () => {
        let addressForCoordinate = address.streetAddress1 + ", " + address.city + ", " + address.zip + ", " + address.country;
        console.log(addressForCoordinate);
        axios.get(mapBoxPlacesApiUrl + addressForCoordinate + ".json?access_token=" + token)
            .then(function (response) {
                console.log(response.data)
                let features = response.data.features[0];
                if (typeof features !== 'undefined') {
                    setPropertyCoordinates({
                        ...propertyCoordinates,
                        latitude: features["center"][1],
                        longitude: features["center"][0],
                    })
                }
            })
            .catch(function (error) { })
            .then(function () { })
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => setAddressCoordinates(), 2000);
        return () => clearTimeout(timeOutId);
    }, [address]);

    let onContactFormFieldsChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
    }

    let onImageSelection = (type) => (files) => {
        if (typeof type !== "undefined" && type === 'thumbnailImg') {
            setImages({
                ...images,
                thumbnailImg: files[0]
            });
        } else {
            let imageObjs = [];
            let imageNames = [];
            for (var i = 0; i < files.length; i++) {
                imageObjs.push({ name: files[i].name });
                imageNames.push(files[i].name)
            }
            setImages({
                ...images,
                otherImages: imageObjs,
                imageNames: imageNames,
                files: files
            })
        }
    }

    let onFeaturesFormFieldsChange = (index, featureCode) => e => {
        if (typeof features[index - 1] !== "undefined") {
            setFeatures(previousFeatures => {
                let newFeatures = previousFeatures.map(feature => Object.assign({}, feature));
                let objIndex = newFeatures.findIndex((obj => obj.name === e.target.name));
                if (objIndex > -1) {
                    newFeatures[objIndex] = {
                        featureCode: featureCode,
                        name: e.target.name,
                        value: e.target.value
                    }
                } else {
                    newFeatures.push({
                        featureCode: featureCode,
                        name: e.target.name,
                        value: e.target.value
                    })
                }
                return newFeatures;
            })
        } else {
            setFeatures(previousFeatures => [
                ...previousFeatures,
                {
                    featureCode: featureCode,
                    name: e.target.name,
                    value: e.target.value
                }
            ])
        }

    }

    let onFloorsFormFieldsChange = (index, featureCode) => e => {
        let nameIndex = e.target.name.split("_");
        if (typeof floors[index - 1] !== "undefined") {
            setFloors(previousFloors => {
                let newFloors = previousFloors.map(floor => Object.assign({}, floor));
                let objIndex = newFloors[index - 1]["features"].findIndex((obj => obj.name === nameIndex[1]));
                if (objIndex > -1) {
                    newFloors[index - 1]["features"][objIndex] = {
                        featureCode: featureCode,
                        name: nameIndex[1],
                        value: e.target.value
                    }
                } else {
                    newFloors[index - 1]["features"].push({
                        featureCode: featureCode,
                        name: nameIndex[1],
                        value: e.target.value
                    })
                }
                return newFloors;
            })
        } else {
            setFloors(previousFloors => [
                ...previousFloors,
                {
                    floorNumber: index,
                    features: [{
                        featureCode: featureCode,
                        name: nameIndex[1],
                        value: e.target.value
                    }]
                }
            ])
        }
    }

    let sliceFloorsOnNumberOfFloorsChange = (numberOfFloors) => {
        setFloors(floors.slice(0, numberOfFloors));
    }

    let prepareFinalProperty = () => {
        let finalProperty = property;
        finalProperty.address = address;
        finalProperty.address.latitude = propertyCoordinates.latitude;
        finalProperty.address.longitude = propertyCoordinates.longitude;
        finalProperty.features = features;
        finalProperty.floors = floors;
        finalProperty.thumbnailImg = images.thumbnailImg.name;
        finalProperty.images = images.imageObjs
        finalProperty.contact = contact;
        return finalProperty;
    }

    let onPropertyFormSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            if (property.id) {
                patchProperty();
            } else {
                saveProperty();
            }
        }

        setPropertyFormValidated(true);
    }

    let patchProperty = async () => {
        let finalProperty = prepareFinalProperty();
        const headers = {
            'Content-Type': "application/json"
        }
        await axios.patch("/api/property", finalProperty, headers)
            .then(function (response) {
                setNextForm(forms.UPLOADIMAGES)
            })
            .catch((err) => {
                // toast.error(JSON.stringify(err.response.data.response))
                console.log(err.response.data)
                setErrors(err.response.data.response)
            }).then(function () {

                // always executed
            })
    }

    let saveProperty = async () => {
        let finalProperty = prepareFinalProperty();
        const headers = {
            'Content-Type': "application/json"
        }
        await axios.post("/api/property", finalProperty, headers)
            .then(function (response) {
                let propertyId = response.data.response;
                setProperty({
                    ...property,
                    id: propertyId
                }, setNextForm(forms.UPLOADIMAGES))
            })
            .catch((err) => {
                // toast.error(JSON.stringify(err.response.data.response))
                console.log(err.response.data)
                setErrors(err.response.data.response)
            }).then(function () {

                // always executed
            })
    }

    let onNextClick = (_nextForm) => (e) => {
        setNextForm(_nextForm);
    }

    let propertyForm = () => {
        return (
            <div >
                <h3><b>Enter Details</b></h3>
                <Formik
                    validationSchema={propertySchema}
                    onSubmit={console.log}
                >
                    {(formikProps) => (
                        <Form noValidate validated={propertyFormValidated} onSubmit={onPropertyFormSubmit} >
                            <Form.Group controlId="formGridBody" className="add-property-form">
                                <Form.Group>
                                    <GeneralDescriptionForm onPropertyFormFieldsChange={onPropertyFormFieldsChange}
                                        formikProps={formikProps} property={property}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <AddressForm onAddressFormFieldsChange={onAddressFormFieldsChange}
                                        formikProps={formikProps} address={address} />
                                </Form.Group>
                                <Form.Group>
                                    <ContactForm onContactFormFieldsChange={onContactFormFieldsChange}
                                        formikProps={formikProps} contact={contact} />
                                </Form.Group>
                                <Form.Group>
                                    <FeaturesForm onFeaturesFormFieldsChange={onFeaturesFormFieldsChange}
                                        formikProps={formikProps} features={features} />
                                </Form.Group>
                                <Form.Group controlId="formGridFloors" className="bg-light ">
                                    <FloorsForm
                                        onFloorsFormFieldsChange={onFloorsFormFieldsChange}
                                        sliceFloorsOnNumberOfFloorsChange={sliceFloorsOnNumberOfFloorsChange}
                                        formikProps={formikProps} floors={floors}
                                    />
                                </Form.Group>
                            </Form.Group>
                            <Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} sm="10">
                                        <Button variant={"secondary"} type="submit">Save And Continue</Button>
                                    </Form.Group>
                                    {/* <Form.Group as={Col}>
                                        {property.id && <Button variant="success" onClick={onNextClick(forms.UPLOADIMAGES)}>Next</Button>}
                                    </Form.Group> */}
                                </Form.Row>
                            </Form.Group>
                        </Form>
                    )}
                </Formik>
                <Modal
                    show={errors && Object.keys(errors).length > 0}
                    onHide={() => setErrors(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Following Error(s) Occured:
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {errors && Object.keys(errors).map(function (e) { return errors[e] }).join(", ")}
                    </Modal.Body>
                </Modal>
            </div >
        )
    }

    let onUploadImageFormSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            let allImages = [];
            allImages.push(images.thumbnailImg);
            allImages.push(...images.files);
            await uploadImages(allImages, property.id);
            await patchProperty();
            toast.success("Successfully saved! Please wait for page to reload...", {
                onClose: () => {
                    Router.reload(window.location.pathname);
                }
            })
        }
        setUploadImageFormValidated(true);
    }

    let uploadImageForm = () => {
        return (
            <div>
                <h3><b>Upload Image(s)</b></h3>
                <Form noValidate validated={uploadImageFormValidated} onSubmit={onUploadImageFormSubmit} >
                    <Form.Group className={"add-property-form"}>
                        <Form.Row>
                            <Form.Group as={Col} sm="10">
                                <Form.Group controlId="formGridFileUpload" className="bg-light ">
                                    <FileUploadForm onImageSelection={onImageSelection} images={images} />
                                </Form.Group>
                            </Form.Group>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Group>
                                    <Button variant="secondary" onClick={onNextClick(forms.PROPERTY)} className="right-margin-1">Previous</Button>
                                    <Button type="submit" variant="secondary" >Save And Finish</Button>
                                </Form.Group>
                            </Form.Group>
                        </Form.Row>
                    </Form.Group>
                </Form>

            </div>
        )
    }

    return (
        < div >
            {nextForm === forms.PROPERTY && propertyForm()}
            {nextForm === forms.UPLOADIMAGES && uploadImageForm()}
        </div >
    )
}

function AddHomeForSale(props) {
    return (
        <div className="container top-margin-1 bottom-margin-1">
            <div className="row">
                <div className="col-sm">
                    <AddPropertyForm />
                </div>
            </div>
        </div>
    )
}

export default AddHomeForSale;