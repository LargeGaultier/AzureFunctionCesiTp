const { app, output } = require('@azure/functions');

const queueOutput = output.storageQueue({
    queueName: 'js-queue-items',
    connection: 'FA1307_STORAGE',
});
app.http('CreateMessage', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    extraOutputs: [queueOutput],
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';
        context.extraOutputs.set(queueOutput, name);
        return { body: `Hello, ${name}!` };
    }
});
