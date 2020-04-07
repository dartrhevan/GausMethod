import React from 'react'
import {showPhoto} from "./FileUploadComponent";
import $ from "jquery";

export default class DropImageComponent extends React.Component
{

    drop(event) {
        event.preventDefault();
        console.log("drop");
        $("#file").prop("files", event.dataTransfer.files);
        showPhoto(event.dataTransfer.files[0]);
        this.props.toggleSubmit();
    }

    render() {
        return <img alt='photo' id='newPhoto' onDragOver={e => e.preventDefault()} onDrop={e => this.drop(e)} width='100' src='/img/dropLabel.bmp' />
    }
}