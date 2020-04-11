/* eslint-disable jsx-a11y/img-redundant-alt */
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
    onImgDragOver = e => e.preventDefault();
    onImgDrop = e => this.drop(e);
    render() {
        return <img alt='photo' id='newPhoto' onDragOver={this.onImgDragOver} onDrop={this.onImgDrop} width='100' src='/img/dropLabel.bmp' />
    }
}