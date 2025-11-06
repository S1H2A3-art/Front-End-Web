function goBackOrHome() {
  const referrer = document.referrer;
  const currentOrigin = window.location.origin;

  if (referrer && referrer.startsWith(currentOrigin)) {
    history.back();
  } else {
    window.location.href = "../../Navigation_Page/Explorer.html"; 
  }
}