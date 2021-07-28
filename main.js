const HeirarchicalTimingWheel = require('./src/HTW') 
const htw = new HeirarchicalTimingWheel();

// case 1
htw.scheduleEvent({
  time: {
    day: 0,
    hour: 0,
    minute: 0,
    second: 10,
  },
  event: () => console.log("case 1"),
});

// // case 2
htw.scheduleEvent({
  time: {
    day: 0,
    hour: 0,
    minute: 1,
    second: 1,
  },
  event: () => console.log("case 2"),
});

// // case 3
htw.scheduleEvent({
  time: {
    day: 0,
    hour: 1,
    minute: 2,
    second: 10,
  },
  event: () => console.log("case 3"),
});

// // case 4
htw.scheduleEvent({
  time: {
    day: 0,
    hour: 2,
    minute: 1,
    second: 0,
  },
  event: () => console.log("case 4"),
});

// // case 5
htw.scheduleEvent({
  time: {
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
  },
  event: () => console.log("case 5"),
});

// case 6
htw.scheduleEvent({
  time: {
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
  },
  event: () => console.log("case 6"),
});

// case 7
htw.scheduleEvent({
  time: {
    day: 1,
    hour: 0,
    minute: 0,
    second: 10,
  },
  event: () => console.log("case 7"),
});

// case 8
htw.scheduleEvent({
  time: {
    day: 2,
    hour: 0,
    minute: 0,
    second: 0,
  },
  event: () => console.log("case 8"),
});