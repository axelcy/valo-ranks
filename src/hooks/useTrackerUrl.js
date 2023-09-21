// https://tracker.gg/valorant/profile/riot/CLG%20Manzana%20Roja%23vsc/overview
// const TRACKER_URL = import.meta.env.VITE_TRACKER_URL
const TRACKER_URL = 'https://tracker.gg/valorant/profile/riot'
export default function useTrackerUrl(name = '') {
    return `${TRACKER_URL}/${name.replace(/ /g, '%20').replace(/#/g, '%23')}/overview`
}