const DoublyLinkedList = require("./DoublyLinkedList");

class HeirarchicalTimingWheel {
  constructor() {
    this.secondsTick = 0;
    this.minutesTick = 0;
    this.hoursTick = 0;
    this.daysTick = 0;

    this.resolutions = {
      day: Array(30),
      hour: Array(24),
      minute: Array(60),
      second: Array(60), // base resolution
    };

    this._generateBuckets();
    this._initialize();
  }

  _generateBuckets() {
    // need to do this because .fill seems to use shared instance for some odd reason
    for (let resolution in this.resolutions) {
      for (let i = 0; i < this.resolutions[resolution].length; i++) {
        if (!this.resolutions[resolution][i]) {
          this.resolutions[resolution][i] = new DoublyLinkedList();
        }
      }
    }
  }

  _initialize() {
    setInterval(() => {
      const { daysTick, hoursTick, minutesTick, secondsTick } = this;
      // console.log({
      //   days: daysTick,
      //   hours: hoursTick,
      //   minutes: minutesTick,
      //   seconds: secondsTick,
      // });
      this._tickSeconds();
    }, 0);
  }

  _tickSeconds() {
    this.secondsTick = (this.secondsTick + 1) % this.resolutions.second.length; // set base resolution
    this._processSecondEvents(this.secondsTick);
    if (this.secondsTick === 0) {
      this._tickMinutes();
    }
  }

  _tickMinutes() {
    this.minutesTick = (this.minutesTick + 1) % this.resolutions.minute.length;
    this._processMinutesEvents(this.minutesTick);
    if (this.minutesTick === 0) {
      this._tickHours();
    }
  }

  _tickHours() {
    this.hoursTick = (this.hoursTick + 1) % this.resolutions.hour.length;
    this._processHoursEvents(this.hoursTick);
    if (this.hoursTick === 0) {
      this._tickDays();
    }
  }

  _tickDays() {
    this.daysTick = (this.daysTick + 1) % this.resolutions.day.length;
    this._processDaysEvents(this.daysTick);
  }

  _processSecondEvents(secondsTick) {
    const events = this.resolutions.second[secondsTick];
    const purgeList = [];
    const scheduleList = []

    events.scan((data, index) => {
      const { time, event } = data;

      if (time.second - secondsTick <= 0) {
        purgeList.push(index);
        scheduleList.push(event)
      }
    });

    for (let index of purgeList) {
      events.delete(index);
    }

    for (let schedule of scheduleList) {
      schedule()
    }
  }

  _processMinutesEvents(minutesTick) {
    const events = this.resolutions.minute[minutesTick];
    const purgeList = [];
    const scheduleList = [];

    events.scan((data, index) => {
      const { time, event } = data;

      if (time.minute - minutesTick <= 0) {
        purgeList.push(index);
        scheduleList.push(() => this.scheduleEvent({
          time: {
            ...time,
            minute: 0,
          },
          event,
        }));
      }
    });

    for (let index of purgeList) {
      events.delete(index);
    }

    for (let schedule of scheduleList) {
      schedule()
    }
  }

  _processHoursEvents(hoursTick) {
    const events = this.resolutions.hour[hoursTick];
    const purgeList = [];
    const scheduleList = [];

    events.scan((data, index) => {
      const { time, event } = data;

      if (time.hour - hoursTick <= 0) {
        purgeList.push(index);
        scheduleList.push(() => this.scheduleEvent({
          time: {
            ...time,
            hour: 0,
          },
          event,
        }));
      }
    });

    for (let index of purgeList) {
      events.delete(index);
    }

    for (let schedule of scheduleList) {
      schedule()
    }
  }

  _processDaysEvents(daysTick) {
    const events = this.resolutions.day[daysTick];
    const purgeList = [];
    const scheduleList = [];

    events.scan((data, index) => {
      const { time, event } = data;

      if (time.day - daysTick <= 0) {
        purgeList.push(index);
        scheduleList.push(() => {
          this.scheduleEvent({
            time: {
              ...time,
              day: 0,
            },
            event,
          });
        })
      }
    });

    for (let index of purgeList) {
      events.delete(index);
    }

    for (let schedule of scheduleList) {
      schedule()
    }
  }

  scheduleEvent({ time: { day, hour, minute, second }, event }) {
    if (day) {
      this.resolutions.day[day].push({
        time: { day, hour, minute, second },
        event,
      });
    } else if (hour) {
      this.resolutions.hour[hour].push({
        time: { day, hour, minute, second },
        event,
      });
    } else if (minute) {
      this.resolutions.minute[minute].push({
        time: { day, hour, minute, second },
        event,
      });
    } else {
      this.resolutions.second[second].push({
        time: { day, hour, minute, second },
        event,
      });
    }
  }
}

module.exports = HeirarchicalTimingWheel;
