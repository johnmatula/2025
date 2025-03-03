function smarthome() {
  return {
    clockHours: 0,
    clockMinutes: 0,
    clockHoursEl: false,
    clockMinutesEl: false,
    timer: false,
    updateClocks: function(e) {
      e = e || this;
      
      var date = new Date();

      e.clockHours = date.getHours() % 12
      e.clockMinutes = date.getMinutes();
      e.clockHours = e.clockHours == 0 ? 12 : e.clockHours;
      e.clockMinutes = (e.clockMinutes < 10 ? "0" : "") + e.clockMinutes;
      
      e.clockHoursEl = e.clockHoursEl || document.querySelector(".clock__hours")
      e.clockMinutesEl = e.clockMinutesEl || document.querySelector(".clock__minutes")
      
      if(e.clockHoursEl.textContent != e.clockHours) e.clockHoursEl.textContent = e.clockHours;
      if(e.clockMinutesEl.textContent != e.clockMinutes) e.clockMinutesEl.textContent = e.clockMinutes;
      
      e.timer = setTimeout((ee) => e.updateClocks(ee), 1000)
    }
  }
}
