const Redis = require("ioredis");

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6377";
const pub = new Redis(REDIS_URL);
const sub = new Redis(REDIS_URL);

async function run() {
  let n = 0;

  setInterval(async () => {
    n++;
    await pub.publish("news:sports", `hello fans. This is message number ${n}`);
    console.log(`hello fans. This is message number ${n}`);
  }, 1000);
}

sub.subscribe("news:received", (err, count) => {
  if (err) throw err;

  console.log("subscribed to", count, "channel(s)");
});

sub.on("message", (channel, message) => {
  console.log("got", channel, message);
});

run();
