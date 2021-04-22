const CrowdLevel = require('./CrowdLevel');
const Facility = require('./Facility');

module.exports = class FacilityCrowdLevel {
    constructor(facility, band) {
        this.facility = facility;
        this.facility.band = band;
    }
};