import React from 'react';
import $ from "jquery";

function addPhoto() {
    showPhoto($("#file").prop("files")[0]);
}

export function showPhoto(file) {
    const reader = new FileReader();
    reader.onload = () => {
        $("#newPhoto").attr("src", reader.result);
    };
    reader.readAsDataURL(file);
    $("#fileName").text(file.name);

}

export const FileUploadComponent = props => (
    <div id='fileUploadComponent'>
        <div className='uploadFile' >
        <span className='upload'>
            <input type='file' name='file' id='file' onInput={addPhoto}/>
            <label htmlFor='file'>Photo</label>
        </span>
            <span id='fileName'>Nothing</span>
        </div>
    </div>);