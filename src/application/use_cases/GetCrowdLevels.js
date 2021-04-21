module.exports = (CrowdLevelRepository, FacilityRepository) => {

    const Execute = async (start = null, end = null) => {
        return await CrowdLevelRepository.getAllByDateRange(start, end);
    }

    return {
        Execute
    };
}