import {useEffect} from "react";
import axiosClient from "../../../api/axios-client.js";

export function InputFile({refInput, title, attrName, url = null}) {
    const getFile = async () => {
        if (!url) return
        const {data} = await axiosClient.get(url, {
            responseType: "blob"
        })
        const file = new File([data], 'poster.jpg', {
            type: "image/jpeg",
            lastModified: new Date().getTime()
        })
        const container = new DataTransfer()
        container.items.add(file)
        refInput.current.files = container.files
    }

    useEffect(() => {
        getFile()
    }, [])

    return (
        <label className="conf-step__label conf-step__label-fullsize">
            {title}
            <input className="conf-step__input" type='file'
                   name={attrName} required ref={refInput}/>
        </label>
    )
}
