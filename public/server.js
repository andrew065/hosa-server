const CosmosClient = require('@azure/cosmos').CosmosClient

const endpoint = 'https://hosa-storage-database.documents.azure.com:443/' //URI
const primaryKey = 'DX1PGkqsKsqBMQsPw1k5YkokOzMupR0ezAls4fXYctxy55HsOaH9gjhonD3CPiwDv5d9j0f6ncRBACDb4DItXw=='
const databaseId = 'hosa-database'
const containers = ['AmbulanceData', 'PatientInfo']
const partitionKeyPath = ['/id']

const item = [
    {
        'id': 'ambulance1',
        'status': 'with patient',
        'unit': 'cardiac'
    }
]

class HospitalServer {
    async constructor(databaseId, containerId) {
        this.databaseId = databaseId
        this.containerId = containerId

        this.client = new CosmosClient({endpoint: endpoint, key: primaryKey})

        const db = await this.client.databases.createIfNotExists({id: this.databaseId})
        this.database = db.database

        const cont = await this.database.containers.createIfNotExists({id: this.containerId})
        this.container = cont.container
    }

    async fetch_all_resources() {
        const { resources } = await this.container.items
            .query("SELECT * from c") //fetches all items from entire container
            .fetchAll()

        return resources
    }

    async add_item(item) {
        const { resources } = await this.container.push(item)
    }
}

