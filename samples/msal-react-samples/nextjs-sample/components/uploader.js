import useSwr from "swr";

const Uploader = ({ files }) => {
    if (files) {
        const apiConfig = {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            // headers: {
            //   'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: files, // body data type must match "Content-Type" header
        };
        const fetcher = (url) =>
            fetch(url, apiConfig).then((res) => res.json());
        const { data, error } = useSwr(
            `/api/db/robotSystems?customerGroup=${files}`, // TODO: here a customer can only be in one group
            fetcher
        );
        if (error) return <div>{error};</div>;
        if (!data) return <div>... Loading;</div>;

        return <div>{data};</div>;
    }
    return <div>... Loading;</div>;
};

export default Uploader;
