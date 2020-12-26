import axios from "axios";
import buildUrl from "build-url";
import { BING_API_KEY } from "../config.js";

async function getTravelSeconds(departure, destination) {
    const url = buildUrl("http://dev.virtualearth.net/REST/v1/Routes", {
        queryParams: {
            "wayPoint.0": departure,
            "wayPoint.1": destination,
            // travelmode: "Driving",
            key: BING_API_KEY,
            routeAttributes: "routeSummariesOnly",
        },
    });

    const response = await axios.get(url);
    return response.data.resourceSets[0].resources[0].travelDurationTraffic;
}

export default {
    getTravelSeconds,
};
