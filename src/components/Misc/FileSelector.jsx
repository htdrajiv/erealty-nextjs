import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function FileSelector(props) {
    const { handleChange, types, id, multiple, required, selectedFiles } = props;

    let handleFileSelection = (e) => {
        handleChange(e.target.files)
    }

    return (
        <div >
            <Form.File id="formcheck-api-custom" custom>
                <Form.File.Input
                    id={id}
                    required={required}
                    onChange={handleFileSelection}
                    multiple={multiple}
                    accept={types}
                />
                <Form.File.Label style={{ width: '100%', overflowX: 'scroll' }}>
                    {selectedFiles ? (selectedFiles.length > 1 ? selectedFiles.length + " Files selected" : selectedFiles[0]) : 'Select Image'}
                </Form.File.Label>
                <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
            </Form.File>
            {/* <input id={id} required={required} onChange={handleFileSelection} type="file" multiple={multiple} accept={types} /> */}

        </div>
    );
}

export default FileSelector;