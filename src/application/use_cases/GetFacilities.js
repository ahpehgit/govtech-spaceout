module.exports = (FacilityRepository) => {

    const Execute = async (page = 1, limit = 10, sort = '', order = 'asc', filter = {}) => {
        return await FacilityRepository.getAll(page, limit, sort, order, filter);
    }

    return {
        Execute
    };
}