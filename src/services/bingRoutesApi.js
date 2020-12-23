import axios from "axios";
import buildUrl from "build-url";
import { BING_API_KEY } from "../config/index.js";

async function getTravelDurationTraffic(departure, destination, arrival) {
  const url = buildUrl("http://dev.virtualearth.net/REST/v1/Routes", {
    queryParams: {
      "wayPoint.0": departure,
      "wayPoint.1": destination,
      // travelmode: "Driving",
      key: BING_API_KEY,
      //   optimize: "timeWithTraffic",
      routeAttributes: "routeSummariesOnly",
      dateTime: arrival,
      timeType: "Arrival",
    },
  });

  try {
    const response = await axios.get(url);
    return response.data.resourceSets[0].resources[0].travelDurationTraffic; //.travelDurationTraffic;
  } catch (error) {
    console.log(error);
  }
}

export default {
  getTravelDurationTraffic,
};
