import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import styles from "../styles/IssuerForm.module.css"
import ImageUpload from "./ImageUpload";
import Modal from "./Modal";

export default function IssuerForm({name : fullname, host}) {

    const router = useRouter();

    const [claims, setClaims] = useState({cpttitle: "Mr", phoneno: "333333333"})
    const [issuanceResponse, setIssuanceResponse] = useState(null)
    const [show,setShow] = useState(false)
    const [modalMessage, setModalMessage] = useState("Verifying")
    const [selectedImage, setSelectedImage] = useState("")

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setClaims(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(`${JSON.stringify(claims,null,2)}`)
    }

    const onFileChange = (e) =>{
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);

        fileReader.onload = (event) =>{
            setSelectedImage(event.target.result.split(",")[1])
        }
    }

    const modalCloseHandler = () => {
        // setShow(false)
        //console.log(JSON.stringify(issuanceResponse))
        //const issuanceResponse = {"requestId":"13b8891f-3811-4d3e-8d78-7ccc9f340209","url":"openid-vc://?request_uri=https://beta.did.msidentity.com/v1.0/tenants/fe83c546-e3ca-4d22-9fbf-10cb709424b1/verifiableCredentials/issuanceRequests/13b8891f-3811-4d3e-8d78-7ccc9f340209","expiry":1669264671,"pin":"1655"}
        // console.log("navigating...")
        const {url, pin, state} = issuanceResponse;
        console.log(`the namespace is ${state}`)
        router.push({
            pathname: '/issuance/save',
            query: {url, pin, state, fullname}
        }, "/issuance/save")
    }

    const submitHandler = async () => {
        if(claims.fname && claims.domicile && claims.dateOfBirth && claims.emailaddress && claims.psignr && selectedImage) {

            const fetchOptions = {
                method: 'POST',
                body: JSON.stringify({claims,hostname: host,selectedImage }),
                headers: {
                'Content-Type': 'application/json',
                }
            };
            try{
                setShow(true)
                const response = await fetch('api/issuer/issuance-request',fetchOptions)
                const data = await response.json()
                console.log("received response")
                console.log(console.log(`the issueance response received is ${JSON.stringify(data)}`))
                setIssuanceResponse(data)
                console.log(`the issueance response received is ${JSON.stringify(issuanceResponse)}`)
                setModalMessage("Verification Complete")
            }catch(e) {
                setModalMessage("Something went wrong")
                console.error(e)
            } 
        }
    }

    return(
        <>
        <div className={styles.issuer__form__wrapper}>
            <div className={styles.issuer__form_field__groups}>
                <div className={styles.issuer__form__name__fields}>
                    <div className={styles.form__group}>
                        <label htmlFor="fname"><p>Name</p></label>
                        <input onChange={changeHandler} type="text" name="fname" id="fname" required/>
                    </div>
                    <div className={styles.form__group}>
                            <label htmlFor="dateOfBirth"><p>Date of birth</p></label>
                            <input onChange={changeHandler} type="text" name="dateOfBirth" id="dateOfBirth" required/>
                    </div>
                    <div className={styles.form__group}>
                            <label htmlFor="emailaddress"><p>Email address</p></label>
                            <input onChange={changeHandler} type="text" name="emailaddress" id="emailaddress" required/>
                    </div>
                </div>
                <div className={styles.issuer__form__dob__photo}>
                        <div className={styles.form__group}>
                            <label htmlFor="domicile"><p>Where are you domiciled?</p></label>
                            <input onChange={changeHandler} type="text" name="domicile" id="domicile" required/>
                        </div>
                        <div className={styles.form__group__radio}>
                        <p style={{color: "rgb(87, 87, 87)", paddingLeft: "15px"}}> Are you a priviliged signer?</p><br/>
                            <div className={styles.radio__group}>
                                <div className={styles.border_element_one}></div><input onChange={changeHandler} type="radio" id="html" name="psignr" value="Yes"/>
                                <label htmlFor="html">No</label>
                                <div className={styles.border_element_two}></div><input onChange={changeHandler} type="radio" id="css" name="psignr" value="No"/>
                                <label htmlFor="css">Yes</label>
                            </div>
                        </div>
                        {/* <div className={styles.form__group}>
                            <label htmlFor="img">Select image:</label>
                            <input className={styles.file__input} type="file" id="img" name="img" accept="image/*"/>
                        </div> */}
                        <ImageUpload onFileChange={onFileChange}/>
                </div>
            </div>
            <div className={styles.issuer__action__btn}>
                    <button className={styles.issuer_btn}>Back</button>
                    <button className={styles.issuer_btn} onClick={submitHandler}>Submit</button>
            </div>
        </div>
        
            <Modal title={modalMessage} onClose={modalCloseHandler} show={show}>
               <Image src="/verify_md_fast.gif" alt="progress" width={250} height={250} />
            </Modal>
        </>
    )
}