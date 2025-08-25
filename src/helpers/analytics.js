import ReactGA from "react-ga4";
import secureLocalStorage from "react-secure-storage";

const analytics = ReactGA;

analytics.initialize(import.meta.env.VITE_MEASUREMENT_ID);

const setAnalyticsUser = (user_id=null)=>{
    analytics.set({user_id})
}
export { analytics, setAnalyticsUser };
