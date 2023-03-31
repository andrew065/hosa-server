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

class ServerClient {
    constructor(databaseId, containerId) {
        this.databaseId = databaseId
        this.containerId = containerId

        this.client = new CosmosClient({endpoint: endpoint, key: primaryKey})
    }

    async init() {
        const db = await this.client.databases.createIfNotExists({id: this.databaseId})
        this.database = db.database

        this.cont = await this.database.containers.createIfNotExists({id: this.containerId})
        this.container = this.cont.container.items

        // console.log(await this.container.query("SELECT * from c").fetchAll())
    }

    async fetch_all_resources() {
        console.log(this.database)
        const {container} = await this.database.containers.createIfNotExists({id: this.containerId})
        const { resources } = await container.items.query("SELECT * from c").fetchAll()
        console.log(resources)
        return resources
    }

    async add_item(item) {
        const { resources } = await this.container.push(item)
    }
}

module.exports = ServerClient