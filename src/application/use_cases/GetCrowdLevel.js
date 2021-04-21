module.exports = (FacilityRepository, CrowdLevelRepository) => {

    const Execute = async (from = '', to = '') => {
        return await CrowdLevelRepository.getAll(from, to);
    }

    return {
        Execute
    };
}