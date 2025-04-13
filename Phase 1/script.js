document.addEventListener('DOMContentLoaded', (event) => {
    let totalLikes = 0; // Initial likes
    const likeButton = document.getElementById('likeButton');
    const totalLikesSpan = document.getElementById('totalLikes');

    likeButton.addEventListener('click', () => {
        totalLikes++;
        totalLikesSpan.textContent = totalLikes;
    });
});