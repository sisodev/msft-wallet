import { useEffect,  useState } from "react";
import ImageUpload from "../components/ImageUpload"
import { useAppContext } from "../store/AppContext";

export default function Home() {
    const [selectedImage, setSelectedImage] = useState("");
    const {fullname, setFullname} = useAppContext()

    const onFileChange = (e) =>{
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);

        fileReader.onload = (event) =>{
            setSelectedImage(event.target.result)
        }
    }

    useEffect(() => {
        console.log(selectedImage)
    }, [selectedImage])


    return(
        <div>
            <div>
                <input type="text" value={fullname} onChange={e => setFullname(e.target.value)} />
                Fullname: {fullname}
            </div>
            <ImageUpload onFileChange={onFileChange}/>
        </div>
    )
}