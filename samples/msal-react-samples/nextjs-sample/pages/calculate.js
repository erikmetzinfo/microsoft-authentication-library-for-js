import { useRouter } from "next/router";

const calculate = () => {
    const router = useRouter();
    const { job } = router.query;
    console.log("job", job, router);
    return <div>Calaculate {job}</div>;
};

export default calculate;
