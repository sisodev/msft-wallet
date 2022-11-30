import React from "react";
import axios from 'axios';
import styles from "../styles/ImageUpload.module.css"

export default function ImageUpload({onFileChange}){



    // onFileChange(e) {
    //     let files = e.target.files;
    //     let fileReader = new FileReader();
    //     fileReader.readAsDataURL(files[0]);

    //     fileReader.onload = (event) =>{
    //         this.setState({
    //             selectedImage: event.target.result
    //         })
    //     }
    // }

    // onSubmit(){
    //     const formData = { image: this.state.selectedImage}
    //     axios.post("/api/hello", formData,{}).then(res => {
    //         console.log(res)
    //         console.log("file uploaded")
    //     })
    // }

    return (
                <div className={styles.form__group}>
                    <label htmlFor="img">Select image:</label>
                    <input className={styles.file__input} type="file" id="img" name="photo"  onChange={onFileChange} accept="image/*"/>
                </div>
        )
}