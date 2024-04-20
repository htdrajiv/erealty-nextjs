import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { toast } from "react-toastify";
import FileSelector from "./FileSelector"

export const uploadImages = async (files, propertyId) => {
    if (files === null || typeof files === "undefined" || Object.keys(files).length < 1) {
        toast.error("No file(s) choosen");
        return;
    }
    const headers = {
        'Content-Type': 'multipart/form-data'
    }
    var formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    }
    formData.append('propertyId', propertyId)
    await axios.post("/api/s3/uploader", formData, { headers })
        .then(response => {
            // console.log(response.data);
        })
        .catch(error => {
            alert(JSON.stringify(error));
        })
};

export function Uploader(props) {
    const { propertyId } = props;
    const [state, setState] = useState({
        success: false,
        url: ""
    })

    let handleChange = (files) => {
        setState({
            success: false, files: files
        });
    }

    return (
        <div className={"top-margin-1"}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-7">
                        <FileSelector id="file-selector" handleChange={handleChange.bind(state.files)} types={"image/png, image/jpeg"} />
                        {/* <input id="file-selector" onChange={handleChange} type="file" multiple accept="image/png, image/jpeg" /> */}
                    </div>
                    <div className="col-sm-4">
                        <Button variant='success' onClick={() => { uploadImages() }}>Upload </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}