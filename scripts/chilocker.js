window.dataURL = "https://data.trends.cash:9007/"
window.app = "hodlocker.com"

var getUrlVars = function() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + ' years ago';
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + ' months ago';
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + ' days ago';
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' hours ago';
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' minutes ago';
  }

  if(seconds < 10) return 'just now';

  return Math.floor(seconds) + ' seconds ago';
};

function isYoutubeURL(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function isTwitterURL(url) { 
  if (url.match(/^http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)$/i)) return true;
  if (url.match(/^http(?:s)?:\/\/(?:www\.)?x\.com\/([a-zA-Z0-9_]+)$/i)) return true;
  return false;
}

function newLinesToBr(text) {
  return text.replace(/(?:\r\n|\r|\n)/g, '<br>')
}

function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    var video = isYoutubeURL(url)
    if (video) {
      return `<iframe class="video" src="https://www.youtube-nocookie.com/embed/${video}?si=bwFdHI21ciks-DwQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    }
    if (isTwitterURL(url)) {
      return `<a href="${url}" target="_blank">${url}</a>`;
    }
    return `<a href="${url}" target="_blank">${url}</a>`;
  })
}

function imagify(text) {
  var imageRegex = /(data:image\/[^;]+;base64,[-A-Za-z0-9+\/]*={0,3})/g;
  return text.replace(imageRegex, function(image) {
    return `<img alt="post image" width="0" height="0" decoding="async" data-nimg="1" style="color: transparent; width: 100%; height: auto;" src="${image}">`
  })
}

function commentIconClick(txid) {
  window.location.href = `/post/?txid=${txid}`;
}

function shareIconClick(txid) {
  alert(`https://chilocker.com/post/?txid=${txid}`);
}

