class CookieMaster {
  constructor() {
    // this.cookies = document.cookie.split(';').map(item => item.split('=')[0]);
    // if (this.cookies.length > 0 && this.cookies.indexOf('blocjams') === -1) {
    //   document.cookie = 'blocjams=1';
    // }
  }

  checkSetCookie(key) {
    const allKeys = this.getCookieKeys();
    if (allKeys.indexOf(key) === -1) {
      this.setACookie(key);
      return true;
    }
    return false;
  }

  setACookie(cookieKey) {
    document.cookie = `${cookieKey}=1`;
  }

  getCookieKeys() {
    return document.cookie.split(';').map( item => item.split('=')[0].trim() );
  }

}


export default CookieMaster;
