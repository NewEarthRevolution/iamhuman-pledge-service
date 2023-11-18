import { createClient, RedisClientType } from 'redis';

class RedisClient {
    private client: RedisClientType;
    private subscriber: RedisClientType;
    private reconnectAttempts = 0;
    constructor() {
        this.client = createClient();
        this.subscriber = createClient();
        this.initializeEventHandlers();
    }

    private initializeEventHandlers() {
        this.client.on('connect', () => {
        console.log('Redis client connected');
        this.reconnectAttempts = 0;
        });
        this.client.on('error', (error) => {
        console.error('Redis error:', error);
        this.attemptReconnect();
        });
        this.client.on('end', () => {
        console.log('Redis client disconnected');
        });
    }

    private attemptReconnect() {
        this.reconnectAttempts++;
        const delay = Math.min(100 * 2 ** this.reconnectAttempts, 30000);
        console.log(`Attempting to reconnect in ${delay} ms`);
        setTimeout(() => this.connect(), delay);
    }

    public async connect() {
        try {
            await this.client.connect();
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            this.attemptReconnect();
        }
    }

    public quit() {
        this.client.quit();
    }

    public async subscribe(channel: string, callback: (message: string) => void) {
        await this.subscriber.connect();
        this.subscriber.subscribe(channel, callback);
    }
    public async publish(channel: string, message: string) {
        if (!this.client.isOpen) {
            await this.client.connect();
        }
        await this.client.publish(channel, message);
    }
}
const redisClientInstance = new RedisClient();

// Graceful Shutdown
const cleanup = () => {
    console.log('Cleaning up before shutdown...');
    redisClientInstance.quit();
    console.log('Cleanup completed. Shutting down.');
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

export default redisClientInstance;