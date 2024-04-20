import * as yup from 'yup';

const addressSchema = yup.object().shape({
    streetAddress1: yup.string().required(),
    streetAddress2: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    zipExtension: yup.string().required(),
    country: yup.string().required(),
    latitude: yup.string().required(),
    longitude: yup.string().required()
})

const userSchema = yup.object().shape({
    userId: yup.string().required()
})

const featuresSchema = yup.object().shape({
    featureCode: yup.string().required(),
    name: yup.string().required(),
    value: yup.string().required()
})

const floorsSchema = yup.object().shape({
    floorNumber: yup.number().required(),
    features: yup.array(featuresSchema)
})

const propertySchema = yup.object().shape({
    title: yup.string().required('Required'),
    description: yup.string(),
    landArea: yup.string().required('Required'),
    parkingSpace: yup.string().required(),
    features: yup.array(featuresSchema),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    country: yup.string().required(),
    price: yup.number().required(),
    floors: yup.array(floorsSchema),
    user: yup.object().shape(userSchema),
    address: yup.object().shape(addressSchema)
});

export { propertySchema, userSchema, floorsSchema, featuresSchema }