const SearchManager = require('../../classes/searchManager');

exports.searchLogsInTimeRange = async (req, res) => {
    try {
        const { index, startDate, endDate, macId = null } = req.body;

        if (!index || !startDate || !endDate) {
            return res.status(400).json({ error: 'index, startDate, and endDate are required.' });
        }

        const logs = await SearchManager.search(index, startDate, endDate, macId);
        if (logs.length === 0) {
            return res.status(404).json({ message: 'No logs found for the specified time range.' });
        }
        return res.status(200).json({ logs });
    } catch (error) {
        console.error('Error searching logs:', error);
        return res.status(500).json({ error: 'An error occurred while searching logs.' });
    }
};
