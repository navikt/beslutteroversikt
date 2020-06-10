import { JSONObject } from 'yet-another-fetch-mock';
import { Features, PRELANSERING_INFO_OM_LOSNING_TOGGLE } from '../../rest/feature';

const features: Features & JSONObject = {
    [PRELANSERING_INFO_OM_LOSNING_TOGGLE]: true,
};

export default features;
