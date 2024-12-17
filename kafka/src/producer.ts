import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ['localhost:9092']
})

const producer = kafka.producer()

const run = async () => {
    await producer.connect()
    await producer.send({
        topic: "quickstart-events",
        messages: [
            {value: "Hello this is kafka user"}
        ]
    })

}

run().catch(console.error)
