const Redis = require("ioredis");

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6377";
const sub = new Redis(REDIS_URL);
const pub = new Redis(REDIS_URL);

sub.subscribe("news:sports", (err, count) => {
  if (err) throw err;

  console.log("subscribed to", count, "channel(s)");
});

sub.on("message", (channel, message) => {
  console.log("got", channel, message);

  pub.publish(
    "news:received",
    "Message received: " + message + " on channel: " + channel,
  );
});
