const Redis = require("ioredis");

const sub = new Redis("redis://127.0.0.1:6377");
const pub = new Redis("redis://127.0.0.1:6377");

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
