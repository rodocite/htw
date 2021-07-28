const HeirarchicalTimingWheel = require('./src/HTW') 
const htw = new HeirarchicalTimingWheel();

htw.scheduleEvent({
  time: {
    day: 0,
    hour: 0,
    minute: 1,
    second: 0,
  },
  event: () => console.log("FIRING EVENT!"),
});

htw.scheduleEvent({
  time: {
    day: 0,
    hour: 0,
    minute: 2,
    second: 10,
  },
  event: () => console.log("FIRING EVENT!"),
});

htw.scheduleEvent({
  time: {
    day: 0,
    hour: 1,
    minute: 2,
    second: 10,
  },
  event: () => console.log("FIRING EVENT!"),
});

htw.scheduleEvent({
  time: {
    day: 0,
    hour: 2,
    minute: 0,
    second: 0,
  },
  event: () => console.log("FIRING EVENT!"),
});

htw.scheduleEvent({
  time: {
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
  },
  event: () => console.log("FIRING EVENT!"),
});

htw.scheduleEvent({
  time: {
    day: 1,
    hour: 0,
    minute: 0,
    second: 10,
  },
  event: () => console.log("FIRING EVENT!"),
});
