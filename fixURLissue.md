# passport-facebook


https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js

save this to a client .js file and include it on the facebook login redirect page. Also require above modernizr library.

// Remove the ugly Facebook appended hash
// <https://github.com/jaredhanson/passport-facebook/issues/12>
if (window.location.hash && window.location.hash === "#_=_") {
  // If you are not using Modernizr, then the alternative is:
  //   `if (window.history && history.replaceState) {`
  if (Modernizr.history) {
    window.history.replaceState("", document.title, window.location.pathname);
  } else {
    // Prevent scrolling by storing the page's current scroll offset
    var scroll = {
      top: document.body.scrollTop,
      left: document.body.scrollLeft
    };
    window.location.hash = "";
    // Restore the scroll offset, should be flicker free
    document.body.scrollTop = scroll.top;
    document.body.scrollLeft = scroll.left;
  }
}
