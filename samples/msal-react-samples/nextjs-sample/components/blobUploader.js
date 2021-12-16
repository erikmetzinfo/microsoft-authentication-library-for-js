// import useSwr from "swr";

import axios from "axios";

// const fetcher = (url) => fetch(url).then((res) => res.json());

// export function CadBlobUploader(file) {
//     const { data, error } = useSwr(`/api/blob?blob=cad`, fetcher);
//     if (error) console.log("error blob", error);
//     if (data) console.log("data blob", data);
// }

export function CadBlobUploader(file) {
    const config = {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: (event) => {
            console.log(
                `Current progress:`,
                Math.round((event.loaded * 100) / event.total)
            );
        },
    };

    const response = await axios.post("/api/blob", formData, config);

    console.log("response", response.data);
}
