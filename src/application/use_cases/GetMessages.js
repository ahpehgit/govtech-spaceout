module.exports = (MessageRepository) => {

    const Execute = async () => {
        return MessageRepository.getAll();
    }

    return {
        Execute
    };
}