function navigation() {
  return {
    blah() {
      console.log("home but will probably show everywhere");
    }
    /*submenu: false,
    openSubmenu(menu) {
      this.submenu = menu
    },
    tester(e) {
      console.log(e)
      console.log(this)
    }, x-data="sidebar()"
    isSubmenuOpen(menu) {
      return menu === this.submenu
    },
    closeSubmenus() {
      this.submenu = false
    },  
    listenForCloseEvent() {
      // Use ES6 notation so that `this` refers to this component
      // (a proud moment that John remembered this differentiation)
      window.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
          this.closeSubmenus()
        }
      });

      window.addEventListener('closeButtonClick', () => {
        this.closeSubmenus();
      });
    }*/
  }
}
