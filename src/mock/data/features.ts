import { JSONObject } from 'yet-another-fetch-mock';
import { Features, PTO_VEDTAKSSTOTTE_PILOT } from '../../rest/feature';

const features: Features & JSONObject = {
    [PTO_VEDTAKSSTOTTE_PILOT]: true,
};

export default features;
