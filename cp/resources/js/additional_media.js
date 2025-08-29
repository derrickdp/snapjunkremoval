async function displayAdditionalMedia(mediaJson) {
    let additional_media_test = [
        {
            type: 'image',
            src: 'https://files.sysers.com/cp/upload/inflateaparty/items/15ft-rocky-rapids-640-1.jpg',
            value: 'https://files.sysers.com/cp/upload/inflateaparty/items/full/15ft-rocky-rapids-640-1.jpg',
        },
        {
            type: 'image',
            src: 'https://files.sysers.com/cp/upload/inflateaparty/editor/15ft-rocky-falls-water-slide-640-1.jpg',
            value: 'https://files.sysers.com/cp/upload/inflateaparty/editor/full/15ft-rocky-falls-water-slide-640-1.jpg',
        },
        {
            type: 'image',
            src: 'https://files.sysers.com/cp/upload/inflateaparty/editor/15ft-rocky-falls-water-slide-640-8.jpg',
            value: 'https://files.sysers.com/cp/upload/inflateaparty/editor/full/15ft-rocky-falls-water-slide-640-8.jpg',
        },
        {
            type: 'youtube',
            value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        {
            type: 'youtube',
            value: 'https://www.youtube.com/watch?v=Y0pYGmfhaGc',
        },
        
    ]
    // Change between current and proposed format, "additional_media_test".
    let additional_media_version = mediaJson;

    // This function is to support the first rollout of Additional media.  This is all handled by modules now when a video is uploaded.
    async function displayProductsImg() {
        function extractVideoId(url) {
            let videoId = '';
              
            // Extract video ID using regular expression
            const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w\-]+)/i;
            const match = url.match(regExp);
            
            if (match && match[1]) {
                videoId = match[1];
            }
              
            return videoId;
        }
        async function getVideoInfo(url) {
            if (url.indexOf('youtube.com') !== -1 || url.indexOf('youtu.be') !== -1) {
                let videoID = extractVideoId(url);
                if(!videoID) {
                    return null;
                }
                try {
                    const response = await fetch(`https://www.youtube.com/oembed?type=json&url=${url}`);
                    const oembedJson = await response.json();
                    const videoObject = {
                        title: oembedJson.title,
                        aspectRatio: `${oembedJson.width} / ${oembedJson.height}`,
                        width: oembedJson.width,
                        thumbnail: oembedJson.thumbnail_url,
                        href: `https://www.youtube.com/embed/${videoID}?enablejsapi=1&mute=1&modestbranding=1&rel=0`,
                        id: videoID,
                        source: 'youtube'
                    }
                    return videoObject;
                } catch(error) {
                    console.log(error);
                    return null;
                }
            } else {
                console.log(`Unsupported Video ${url}`);
                return null;
            }
        }
        // Not used since photos are uploaded to DO.  Maybe reimplement this for the original ERS image?
        function getFullSrc(url) {
            return url.replace(/(\/[^/]+)$/, "/full$1");
        }
        
        // This might not catch all images?  Will the correct image always be the first one on the page?  At least within ".store"?  If so, maybe we just do "".store img"
        let originalImg = document.querySelector('.basic-item-page .image-wrapper img');
        if(!originalImg) {
            originalImg = document.querySelector('.item-page [id^="container_"] img');
        }
        const imageAlt = originalImg.getAttribute('alt');
        // Prepend Original Image to the additional media array
        additional_media_version.unshift({
            type: 'image',
            value: originalImg.getAttribute('src'),
            // fullSrc: getFullSrc(originalImg.getAttribute('src'))
        });
        const lightboxItems = []; 
        let mainSliderHTML = '';
        let thumbSliderHTML = '';
        for(const media of additional_media_version) {
            if(typeof media === 'string') {
                // Only reason they need to be seperated is for videos
                mainSliderHTML += `<div class="swiper-slide"><div class="swiper-slide-content"><img alt="${imageAlt}" src="${media}"/></div></div>`;
                thumbSliderHTML += `<div class="swiper-slide"><div class="swiper-slide-content"><img alt="${imageAlt}" src="${media}"/></div></div>`;
                lightboxItems.push({
                    href: media,
                    type: 'image'
                });
                continue;
            }
            if(media.type === 'image') {
                media.value = media.value.replace('cdn.digitaloceanspaces.com', 'digitaloceanspaces.com');
                // Only reason they need to be seperated is for videos
                mainSliderHTML += `<div class="swiper-slide" data-item-id="${media.item_id || window.itemId}"><div class="swiper-slide-content"><img alt="${imageAlt}" src="${media.value}"/></div></div>`;
                thumbSliderHTML += `<div class="swiper-slide" data-item-id="${media.item_id || window.itemId}"><div class="swiper-slide-content"><img alt="${imageAlt}" src="${media.value}"/></div></div>`;
                lightboxItems.push({
                    href: media.value,
                    type: 'image'
                });
            } else if(media.type === 'youtube' || media.type === 'embed') {
                // It would be nice if when a user adds a video link it makes a call to the oEmbed API and stores that in the database.  I wrote this assuming that is as a rough example though
                let videoObject = media?.videoObject;
                console.log(videoObject)
                if(!videoObject) {
                    videoObject = await getVideoInfo(media.value);
                }
                if(!videoObject || Object.keys(videoObject).length === 0) {
                    continue;
                }
                let vimeoDataAttributes = '';
                let vimeoAspectRatio = '';
                if(videoObject.source == 'vimeo') {
                    if(eval(videoObject.aspectRatio) < 1) vimeoDataAttributes += 'data-vimeo-portrait';
                    vimeoAspectRatio = `aspect-ratio: ${videoObject.aspectRatio};`;
                } 
                lightboxItems.push({
                    'href': videoObject.href,
                    'type': 'video',
                    'source': videoObject.source,
                    'width': videoObject.width,
                });
                // aspect-ratio: ${videoObject.aspectRatio}; Removed from "mainSliderHTML" 8/23
                mainSliderHTML += `<div class="swiper-slide" data-item-id="${media.item_id || window.itemId}"><div style="${vimeoAspectRatio} margin: 0 auto;" class="swiper-slide-content product-video"><div ${vimeoDataAttributes} class="video-player"><iframe id="${videoObject.id}" class="product-video-iframe" allow="autoplay; fullscreen;" frameborder="0" src="${videoObject.href}"></iframe></div></div></div>`;
                thumbSliderHTML += `<div class="swiper-slide" data-item-id="${media.item_id || window.itemId}"><div class="swiper-slide-content"><img alt="Thumbnail of ${videoObject.title}" src="${videoObject.thumbnail}" /><i class="far fa-play-circle"></i></div></div>`;
            }
        }
    
        let allSliderHTML = `
            <div class="product-img-swiper">
                <div class="swiper product-main-swiper">
                <div class="swiper-wrapper">
                    ${mainSliderHTML}
                </div>
                </div>
                <div class="expand-img-text">Click Image to Open Expanded View</div>
                <div thumbSlider class="swiper product-thumb-swiper">
                <div class="swiper-wrapper">
                    ${thumbSliderHTML}
                </div>
                <div class="swiper-scrollbar"></div>
                </div>
            </div>
        `;
        let sliderFragement = document.createRange().createContextualFragment(allSliderHTML);
        originalImg.replaceWith(sliderFragement);
        
        const defaultThumbSwiperOptions = {
            loop: false,
            spaceBetween: 10,
            slidesPerView: 3,
            freeMode: false,
            watchSlidesProgress: true,
            centeredSlides: true,
            centeredSlidesBounds: true,
            //slideToClickedSlide: true,
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
                snapOnRelease: true
            }
        }
    
        let thumbProductSwiper = new Swiper(
            '.product-thumb-swiper', 
            (window.additionalMediaOptions?.thumbsSwiper) ?? defaultThumbSwiperOptions
        );
            
        let mainProductSwiper = new Swiper('.product-main-swiper', {
            loop: false,
            spaceBetween: 10,
            thumbs: {
                swiper: thumbProductSwiper,
                autoScrollOffset: 1,
            }
        });

        window.additionalMediaSwipers = {
            'thumb': thumbProductSwiper,
            'main': mainProductSwiper
        };
    
        //Glightbox.js Config. Might change lightbox, just using this one as an example
        function initGlightbox() {
            const productLightbox = GLightbox({
                elements: lightboxItems
            });
            productLightbox.on('slide_changed', ({current}) => {
                mainProductSwiper.slideTo(current.slideIndex, 0, false);
            });
            mainProductSwiper.on('click', ({clickedSlide, clickedIndex}) => {
                if(!clickedSlide.querySelector('iframe')) {
                    productLightbox.openAt(clickedIndex);
                }
            });
        }
        
        function addGLightbox() {
            if(typeof GLightbox !== 'function') {
                let lightboxScript = document.createElement('script');
                lightboxScript.src = 'https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js';
                lightboxScript.addEventListener('load', initGlightbox);
                document.body.appendChild(lightboxScript);
            } else {
                initGlightbox();
            }
        }

        function initPlyr() {
            const players = Array.from(document.querySelectorAll('.video-player')).map((p) => new Plyr(p, {
                controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'pip', 'fullscreen']
            }));
            for(const player of players) {
                player.on('ready', (event) => {
                    player.ratio = '4:3';
                });
            }
            
            mainProductSwiper.on('slideChange', () => {
                for(const player of players) {
                    if(player.playing) {
                        player.pause();
                    }
                }
            });
            addGLightbox();
        }

        if(typeof Plyr !== 'function') {
            let newScript = document.createElement('script');
            newScript.src = 'https://cdn.plyr.io/3.7.8/plyr.js';
            newScript.addEventListener('load', initPlyr);
            document.body.appendChild(newScript);
        } else {
            initPlyr();
        }
        
        
    }
    
    
    let additionalMediaCSS = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" />
        <link rel="stylesheet" href="https://wwall.ourers.com/view/assets/additionalMedia.css" />
        <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
    `;
    document.head.insertAdjacentHTML('beforeend', additionalMediaCSS);
    
    
    if (window.itemId && additional_media_version.length) {
        displayProductsImg();
    }
    
}

async function checkForSwiper() {
    return new Promise((resolve, reject) => {
        if (typeof Swiper !== 'function') {
            document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="/cp/resources/css/swiper-bundle.min.css" />`);
            let newScript = document.createElement('script');
            newScript.src = '/cp/resources/js/swiper-bundle.min.js';
            newScript.onload = () => {
                if (typeof Swiper === 'function') {
                    resolve();
                } else {
                    reject(new Error('Failed to load Swiper'));
                }
            };
            newScript.onerror = () => {
                reject(new Error('Failed to load script'));
            };
            document.head.appendChild(newScript);
        } else {
            resolve();
        }
    });
}

async function getAdditionalMedia() {
    const bucketUrl = 'https://ers-additional-media-1.sfo3.digitaloceanspaces.com';
    let mediaJson = [];
    try {
        const additionalMedia = await fetch(`${bucketUrl}/${foldername}/items/${itemId}/media.json`);
        if(additionalMedia.ok) {
            mediaJson = await additionalMedia.json();
        }
    } catch(err) {}

    mediaJson.push(...(window.variantMedia || []));
    if(mediaJson.length !== 0) {
        await checkForSwiper();
        displayAdditionalMedia(mediaJson, window.itemId);
    }
}
getAdditionalMedia();
