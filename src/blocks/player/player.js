function player() {
  return {
    state: {
      visible: false,     // Widget’s visibility on the page
      playing: false,     // Visible state is “playing”
      loaded: false,      // Track is loaded TODO: howler.js?
      track: {            // 
        title: false,     // Title of the main track
        caption: false,   // Caption of the track
        credits: false,   // Credit line, copyright, etc
        audio: false,     // Track’s <audio> tag
        level: {          //
          solo: 1.0,      // Max volume level
          mix: 1.0        // Max volume level when sfx is enabled
        },                //
      },                  //
      sfx: {              //
        available: false, // Main track has an optional sfx track
        enabled: false,   // Sfx track is enabled
        label: false,     // Toggle button label (optional)
        audio: false,     // Sfx’s <audio> tag
        level: {          //
          mix: 0.0        // Max volume level when paired with main track
        },                //
      },
    },
    
    initPlayer() {
      console.log("Hello world.mp3!");
    },
    
    showPlayer(player) {
      this.state.player = player
    },
    hidePlayer() {
      this.state.player = false
    },
    
    playTrack(player) {
      
    },
  }
}
