class HeirarchicalTimingWheel {
  constructor() {
    this.secondsTick = 0;
    this.minutesTick = 0;
    this.hoursTick = 0;
    this.daysTick = 0;

    this.resolutions = {
      day: new Array(30),
      hour: new Array(24),
      minute: new Array(60),
      second: new Array(60), // base resolution
    };

    this._initialize();
  }

  _initialize() {
    setInterval(() => {
      const { daysTick, hoursTick, minutesTick, secondsTick } = this;
      console.log({ days: daysTick, hours: hoursTick, minutes: minutesTick, seconds: secondsTick });
      this._tickSeconds();
    }, 1000);
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
    this._processMinutesEvents();
    if (this.minutesTick === 0) {
      this._tickHours();
    }
  }

  _tickHours() {
    this.hoursTick = (this.hoursTick + 1) % this.resolutions.hour.length;
    this._processHoursEvents();
    if (this.hoursTick === 0) {
      this._tickDays();
    }
  }

  _tickDays() {
    this.daysTick = (this.daysTick + 1) % this.resolutions.day.length;
    this._processDaysEvents();
  }

  _processSecondEvents(secondsTick) {
    const events = this.resolutions.second[secondsTick];
    if (events) {
      while (events.length > 0) {
        events.pop().event();
      }
    }
  }

  _processMinutesEvents() {
    const events = this.resolutions.minute[this.minutesTick];
    if (events) {
      const _events = [];
      while (events.length > 0) {
        const event = events.pop();
        if (event.time.minute - this.minutesTick === 0) {
          this.scheduleEvent({
            time: {
              day: 0,
              hour: 0,
              minute: 0,
              second:
                event.time.second === 0
                  ? this.secondsTick + 1
                  : event.time.second,
            },
            event: event.event,
          });
        } else {
          _events.push(event);
        }
      }

      this.resolutions.minute[this.minutesTick] = _events;
    }
  }

  _processHoursEvents() {
    const events = this.resolutions.hour[this.hoursTick];
    if (events) {
      const _events = [];
      while (events.length > 0) {
        const event = events.pop();
        if (event.time.hour - this.hoursTick === 0) {
          this.scheduleEvent({
            time: {
              day: 0,
              hour: 0,
              minute: event.time.minute,
              second:
                event.time.second === 0
                  ? this.secondsTick + 1
                  : event.time.second,
            },
            event: event.event,
          });
        } else {
          _events.push(event);
        }
      }

      this.resolutions.hour[this.hoursTick] = _events;
    }
  }

  _processDaysEvents() {
    const events = this.resolutions.day[this.daysTick];
    if (events) {
      const _events = [];
      while (events.length > 0) {
        const event = events.pop();
        if (event.time.day - this.daysTick === 0) {
          this.scheduleEvent({
            time: {
              day: 0,
              hour: event.time.hour,
              minute: event.time.minute,
              second:
                event.time.second === 0
                  ? this.secondsTick + 1
                  : event.time.second,
            },
            event: event.event,
          });
        } else {
          _events.push(event);
        }
      }

      this.resolutions.day[this.daysTick] = _events;
    }
  }

  scheduleEvent({ time: { day, hour, minute, second }, event }) {
    if (day) {
      if (!Array.isArray(this.resolutions.day[day])) {
        this.resolutions.day[day] = [];
      }
      this.resolutions.day[day].push({
        time: { day, hour, minute, second },
        event,
      });
    } else if (hour) {
      if (!Array.isArray(this.resolutions.hour[hour])) {
        this.resolutions.hour[hour] = [];
      }
      this.resolutions.hour[hour].push({
        time: { day, hour, minute, second },
        event,
      });
    } else if (minute) {
      if (!Array.isArray(this.resolutions.minute[minute])) {
        this.resolutions.minute[minute] = [];
      }
      this.resolutions.minute[minute].push({
        time: { day, hour, minute, second },
        event,
      });
    } else if (second) {
      if (!Array.isArray(this.resolutions.second[second])) {
        this.resolutions.second[second] = [];
      }
      this.resolutions.second[second].push({
        time: { day, hour, minute, second },
        event,
      });
    }
  }
}

module.exports = HeirarchicalTimingWheel;
