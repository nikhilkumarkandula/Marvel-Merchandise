import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.REDIS_URL
const port = process.env.REDIS_PORT
const password = process.env.REDIS_PASS

const redis = new Redis({
    host: host,
    port: port,
    username: "default",
    password: password
    //tls: {},
});

redis.on('connect', () => console.log(`Connected to Redis with TLS on port ${port}`));
redis.on('error', (err) => console.error('Redis error:', err));

export default redis;

// import Redis from "ioredis";
// import dotenv from "dotenv";
// dotenv.config();

// const redis = new Redis(`rediss://:${process.env.REDIS_PASS}@redis-14614.c305.ap-south-1-1.ec2.redns.redis-cloud.com:14614`);

// redis.on("connect", () => console.log("✅ Connected to Redis with TLS!"));
// redis.on("error", (err) => console.error("❌ Redis error:", err));

// export default redis;
