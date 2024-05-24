import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CustomSkeleton({ width, height, count = 1 }) {
    return (
        <Skeleton width={width} height={height} count={count}/>
    )
}