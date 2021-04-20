module.exports = class Facility {
    constructor(id, name, type, center, address, blk_house, road_name, other_name, postalCode) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.center = center;
        this.address = address;
        this.blk_house = blk_house;
        this.road_name = road_name;
        this.other_name = other_name;
        this.postalCode = postalCode;
    }
};
