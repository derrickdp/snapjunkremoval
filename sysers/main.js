var player = document.getElementById('ers-video');

/**
 * Clicking the overlay img will hide it and start playing video
 */
$('.video-heading').click(function(event)
{
    $(this).addClass('video-heading-altbg');
    $(this).hide();
    if (player.ended)
    {
        player.currentTime = 0;
    };
    player.play();
});

/**
 * If clicking on the video directly it will pause or restart video if it ended
 */
$('#ers-video').click(function(event)
{
    if (player.ended)
    {
        player.currentTime = 0;
        player.play();
    }
    else
    {
        player.pause();
        $('.video-heading').show();
    }
});
