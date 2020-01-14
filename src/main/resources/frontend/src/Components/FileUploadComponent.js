import React from 'react';
import $ from "jquery";

function showPhoto() {
    const file = $("#file").prop("files")[0];
    const reader = new FileReader();
    reader.onload = () => {
        $("#newPhoto").attr("src", reader.result);
    };
    reader.readAsDataURL(file);
    $("#fileName").text(file.name);
}

export const FileUploadComponent = props => (
    <div className='uploadFile'>
        <span className='upload'>
            <input type='file' name='file' id='file' onInput={showPhoto}/>
            <label htmlFor='file'>Photo</label>
        </span>
        <span id='fileName'>Nothing</span>
    </div>);