

const { Client } = require('@elastic/elasticsearch');

class SearchManager {
    static elasticClient = Client;
    static async init() {
        try {
            this.elasticClient = new Client({ node: 'http://elastic_search:9200' });
            await this.elasticClient.info();
            console.log('Connected to Elasticsearch successfully.');
        } catch (e) {
            console.log("error initializing elastic search", e);
        }
    }
    static async log(index, body) {
        try {
            const response = await this.elasticClient.index({
                index,
                body: body,
            });
            console.log(`Logged to Elasticsearch: ${response.body._id}`);
            return response.body;

        } catch (e) {
            console.log("error logging data");
        }
    }
    static async search(index, startDate, endDate, macId = null) {
        try {
            // Prepare the query for macId if it is provided
            let query = {
                bool: {
                    must: []
                }
            };
    
            // If macId is provided, include it in the query
            if (macId) {
                query.bool.must.push({
                    match: {
                        macAddress: macId, // Filter by macAddress
                    }
                });
            }
    
            // Execute the search query
            const response = await this.elasticClient.search({
                index, // The index to search in
               size:10000,
                body: {
                    query, // Use the constructed query
                }
            });
    
            let logs = response.body.hits.hits;
            console.log(`Found ${logs.length} logs.`);
    
            // Filter logs in JavaScript based on the timestamp range
            const filteredLogs = logs.filter(log => {
                const timestamp = log._source.timestamp;
                //console.log(timestamp);
                return timestamp >= startDate && timestamp <= endDate;
            });
    
            console.log(`Filtered ${filteredLogs.length} logs within the specified time range.`);
            return filteredLogs; // Return the filtered logs
        } catch (e) {
            console.error('Error searching logs in Elasticsearch:', e);
            return [];
        }
    }
    
    
}

module.exports = SearchManager;