
// // Instagram button 
// document.getElementById("instagram-button").addEventListener("click", ()=> {
//     window.location.href = 'https://www.instagram.com/ally.cady.photography/'; 
// });



const galleryData = {
    'portrait-gallery': [
        { src: 'Images/Portfolio/Portrait/portrait1.jpg', alt: 'Portrait 1' },
        { src: 'Images/Portfolio/Portrait/portrait2.jpg', alt: 'Portrait 2' },
        { src: 'Images/Portfolio/Portrait/portrait3.jpg', alt: 'Portrait 3' },
        { src: 'Images/Portfolio/Portrait/portrait4.jpg', alt: 'Portrait 4' },
        { src: 'Images/Portfolio/Portrait/portrait5.jpg', alt: 'Portrait 5' },
        { src: 'Images/Portfolio/Portrait/portrait6.jpg', alt: 'Portrait 6' },
        { src: 'Images/Portfolio/Portrait/portrait7.jpg', alt: 'Portrait 7' }
    ],
    'wedding-gallery': [
        { src: 'Images/Portfolio/Wedding/wedding1.jpg', alt: 'Wedding 1' },
        { src: 'Images/Portfolio/Wedding/wedding2.jpg', alt: 'Wedding 2' },
        { src: 'Images/Portfolio/Wedding/wedding3.jpg', alt: 'Wedding 3' },
        { src: 'Images/Portfolio/Wedding/wedding4.jpg', alt: 'Wedding 4' },
        { src: 'Images/Portfolio/Wedding/wedding5.jpg', alt: 'Wedding 5' },
        { src: 'Images/Portfolio/Wedding/wedding6.jpg', alt: 'Wedding 6' }, 
        { src: 'Images/Portfolio/Wedding/wedding7.jpg', alt: 'Wedding 7' },
        { src: 'Images/Portfolio/Wedding/wedding8.jpg', alt: 'Wedding 8' },
        { src: 'Images/Portfolio/Wedding/wedding9.jpg', alt: 'Wedding 9' },
        { src: 'Images/Portfolio/Wedding/wedding10.jpg', alt: 'Wedding 10'}
        

    ],
    'event-gallery': [
        { src: 'Images/Portfolio/Event/event1.jpg', alt: 'Event 1' },
        { src: 'Images/Portfolio/Event/event2.jpg', alt: 'Event 2' },
        { src: 'Images/Portfolio/Event/event3.jpg', alt: 'Event 3' },
        { src: 'Images/Portfolio/Event/event4.jpg', alt: 'Event 4' },
        { src: 'Images/Portfolio/Event/event5.jpg', alt: 'Event 5' },
        { src: 'Images/Portfolio/Event/event6.jpg', alt: 'Event 6' },
        { src: 'Images/Portfolio/Event/event7.jpg', alt: 'Event 7' },
        { src: 'Images/Portfolio/Event/event8.jpg', alt: 'Event 8' }

    ]
};



document.querySelectorAll('.portfolio').forEach(gallery => {
    const galleryId = gallery.id;
    const images = galleryData[galleryId];
    let currentImageIndex = 0;

    const displayedImage = gallery.querySelector('.displayed-img');
    const prevBtn = gallery.querySelector('.prev');
    const nextBtn = gallery.querySelector('.next');
    const thumbnails = gallery.querySelectorAll('.thumb');

    // Function to update the image and alt text
    function updateImage(index) {
        displayedImage.src = images[index].src;
        displayedImage.alt = images[index].alt;

        // Update active thumbnail
        thumbnails.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    // Event listeners for next/previous buttons
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex === 0) ? images.length - 1 : currentImageIndex - 1;
        updateImage(currentImageIndex);
    });

    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex === images.length - 1) ? 0 : currentImageIndex + 1;
        updateImage(currentImageIndex);
    });

    // Add event listeners to thumbnails
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            currentImageIndex = index;
            updateImage(currentImageIndex);
        });
    });

    // Set initial image
    updateImage(0);
});