// Create a hidden iframe for the YouTube video
function createYouTubePlayer() {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.width = '0';
    iframe.height = '0';
    iframe.src = 'https://www.youtube.com/embed/7_EeCkHs-e0?autoplay=1&controls=0&disablekb=1&fs=0&modestbranding=1&playsinline=1&mute=0';
    iframe.allow = 'autoplay';
    
    // Add iframe to the page
    document.body.appendChild(iframe);
    
    // Store the iframe reference
    window.youtubePlayer = iframe;
}

// Initialize the player when the page loads
createYouTubePlayer();

// Function to restart the video
function restartVideo() {
    if (window.youtubePlayer) {
        window.youtubePlayer.src = window.youtubePlayer.src;
    }
}

// Add event listeners for page interaction
document.addEventListener('click', restartVideo);
document.addEventListener('keydown', restartVideo); 