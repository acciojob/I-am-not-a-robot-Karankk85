// Variables to track the state of the images
let selectedImages = [];
let clickedImageIds = [];
let duplicateImageId = null;
let images = document.querySelectorAll(".image");
let resetButton = document.getElementById("reset");
let verifyButton = document.getElementById("verify");
let message = document.getElementById("h");
let resultMessage = document.getElementById("para");

// Function to randomize the image order and select a duplicate
function randomizeImages() {
    // Creating an array of image ids to shuffle
    let imageIds = ['img1', 'img2', 'img3', 'img4', 'img5'];
    let duplicateImage = imageIds[Math.floor(Math.random() * imageIds.length)];
    duplicateImageId = duplicateImage;
    let randomImages = [...imageIds, duplicateImage];

    // Shuffle the array of images
    randomImages.sort(() => Math.random() - 0.5);

    // Assign shuffled images to img tags
    randomImages.forEach((id, index) => {
        let img = document.getElementById(id);
        img.classList.add(id); // Apply the corresponding class
    });
}

// Function to handle image clicks
function handleImageClick(event) {
    if (clickedImageIds.length < 2) {
        const imageId = event.target.id;
        
        // Check if the image has already been clicked
        if (!clickedImageIds.includes(imageId)) {
            clickedImageIds.push(imageId);
            selectedImages.push(event.target.src);

            // Add selected border style
            event.target.classList.add('selected');

            // Show the Reset button after first click
            resetButton.classList.remove('hidden');

            // If two images have been selected, show the Verify button
            if (clickedImageIds.length === 2) {
                verifyButton.classList.remove('hidden');
            }
        }
    }
}

// Function to handle the Reset button
function resetVerification() {
    clickedImageIds = [];
    selectedImages = [];
    images.forEach(image => image.classList.remove('selected'));
    resetButton.classList.add('hidden');
    verifyButton.classList.add('hidden');
    message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
    resultMessage.classList.add('hidden');
}

// Function to handle verification
function verifySelection() {
    if (selectedImages[0] === selectedImages[1]) {
        resultMessage.textContent = "You are a human. Congratulations!";
    } else {
        resultMessage.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    // Hide Verify button after verification
    verifyButton.classList.add('hidden');
    resultMessage.classList.remove('hidden');
}

// Event listeners for image clicks, reset and verify buttons
images.forEach(image => {
    image.addEventListener('click', handleImageClick);
});

resetButton.addEventListener('click', resetVerification);
verifyButton.addEventListener('click', verifySelection);

// Initialize the page with random images
randomizeImages();
