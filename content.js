// Load YouTube IFrame API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

// Initialize YouTube player when API is ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: '7_EeCkHs-e0',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'disablekb': 1,
            'fs': 0,
            'modestbranding': 1,
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

// Create hidden player container
const playerContainer = document.createElement('div');
playerContainer.id = 'youtube-player';
playerContainer.style.display = 'none';
document.body.appendChild(playerContainer);

// Play video when player is ready
function onPlayerReady(event) {
    event.target.playVideo();
}

// Replay video on page interaction
document.addEventListener('click', () => {
    if (player && player.playVideo) {
        player.playVideo();
    }
});

document.addEventListener('keydown', () => {
    if (player && player.playVideo) {
        player.playVideo();
    }
}); 