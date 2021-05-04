refs = {
  clockDays: document.querySelector('[data-value="days"]'),
  clockHours: document.querySelector('[data-value="hours"]'),
  clockMins: document.querySelector('[data-value="mins"]'),
  clockSecs: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ onTick, targetDate }) {
    this.onTick = onTick;
    this.targetDate = targetDate;
    this.start();
  }

  start() {
    setInterval(() => {
      const currentTime = Date.now();
      const time = this.targetDate - currentTime;
      const timeLeft = this.getTimeComponents(time);
      this.onTick(timeLeft);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const Timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2048'),
  onTick: updateClockFace,
});

function updateClockFace({ days, hours, mins, secs }) {
  refs.clockDays.textContent = `${days}`;
  refs.clockHours.textContent = `${hours}`;
  refs.clockMins.textContent = `${mins}`;
  refs.clockSecs.textContent = `${secs}`;
}
