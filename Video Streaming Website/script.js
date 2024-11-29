// Function to open and play the selected video in the player
function playVideo(videoUrl) {
    // Get the video player and set the source
    const playerSection = document.getElementById('player');
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = videoUrl; // Set the video URL

    // Display the video player section
    playerSection.style.display = 'flex';
    videoPlayer.play(); // Start playing the video
}

// Function to close the video player
function closePlayer() {
    const playerSection = document.getElementById('player');
    const videoPlayer = document.getElementById('videoPlayer');

    // Pause the video and reset the source
    videoPlayer.pause();
    videoPlayer.src = '';

    // Hide the video player section
    playerSection.style.display = 'none';
}

// Optional: Automatically close the video when the video ends
document.getElementById('videoPlayer').addEventListener('ended', function () {
    closePlayer();
});
