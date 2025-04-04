// Create a visible iframe for the YouTube video
function createYouTubePlayer() {
    // Create container for the iframe
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.right = '20px';
    container.style.width = '300px';
    container.style.height = '169px'; // 16:9 aspect ratio
    container.style.zIndex = '9999';
    container.style.border = '2px solid #ff9900'; // Amazon orange color
    container.style.borderRadius = '8px';
    container.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    container.style.backgroundColor = 'white';
    container.style.cursor = 'move'; // Indicate draggable
    
    // Create a header with title
    const header = document.createElement('div');
    header.style.padding = '8px';
    header.style.backgroundColor = '#ff9900';
    header.style.color = 'white';
    header.style.fontFamily = 'Arial, sans-serif';
    header.style.fontSize = '14px';
    header.style.borderTopLeftRadius = '6px';
    header.style.borderTopRightRadius = '6px';
    header.textContent = 'Play Me';
    
    // Create the iframe
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = 'calc(100% - 34px)'; // Subtract header height
    iframe.style.border = 'none';
    iframe.style.display = 'block';
    
    // Set the source with autoplay and other parameters
    const videoId = '7_EeCkHs-e0';
    // Using muted=1 initially to bypass autoplay restrictions, then unmuting via postMessage
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&disablekb=0&fs=0&modestbranding=1&playsinline=1&mute=1&loop=1&playlist=${videoId}&enablejsapi=1&origin=${window.location.origin}`;
    
    // Add header and iframe to container
    container.appendChild(header);
    container.appendChild(iframe);
    
    // Add container to the page
    document.body.appendChild(container);
    
    // Store the container reference
    window.youtubePlayer = container;
    
    // Function to unmute the video
    function unmuteVideo() {
        try {
            iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
            console.log('Attempted to unmute video');
        } catch (e) {
            console.log('Error unmuting video:', e);
        }
    }
    
    // Function to play the video
    function playVideo() {
        try {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            console.log('Attempted to play video');
        } catch (e) {
            console.log('Error playing video:', e);
        }
    }
    
    // Start playing and unmuting after 1 second
    setTimeout(() => {
        unmuteVideo();
        playVideo();
    }, 1000);
    
    // Add a periodic check to ensure video stays unmuted
    setInterval(() => {
        unmuteVideo();
    }, 30000); // Check every 30 seconds
    
    // Add drag functionality
    makeDraggable(container, header);
}

// Function to make an element draggable
function makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    // Use the header as the drag handle
    handle.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e.preventDefault();
        // Get the mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e.preventDefault();
        // Calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Set the element's new position
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
        element.style.right = 'auto';
        element.style.bottom = 'auto';
    }
    
    function closeDragElement() {
        // Stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Initialize the player when the page loads
createYouTubePlayer();

// Function to restart the video
function restartVideo() {
    if (window.youtubePlayer) {
        const iframe = window.youtubePlayer.querySelector('iframe');
        if (iframe) {
            // Reload the iframe to restart the video
            iframe.src = iframe.src;
            
            // After reloading, try to unmute again
            setTimeout(() => {
                try {
                    iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
                    iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                } catch (e) {
                    console.log('Error unmuting video after restart:', e);
                }
            }, 2000);
        }
    }
}

// Add event listeners for page interaction
document.addEventListener('click', restartVideo);
document.addEventListener('keydown', restartVideo); 