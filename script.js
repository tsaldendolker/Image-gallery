const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");
const gallery = document.getElementById("gallery");

// Load images from localStorage on page load
document.addEventListener("DOMContentLoaded", loadImages);

// Drag & Drop Events
dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "green";
});

dropZone.addEventListener("dragleave", () => {
    dropZone.style.borderColor = "#aaa";
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "#aaa";
    const files = e.dataTransfer.files;
    handleFiles(files);
});

// Handle File Input Click
dropZone.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", () => handleFiles(fileInput.files));

// Process Selected Files
function handleFiles(files) {
    for (let file of files) {
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function (event) {
                const imageURL = event.target.result;
                addImageToGallery(imageURL);
                saveImage(imageURL);
            };
        }
    }
}

// Add Image to Gallery
function addImageToGallery(imageURL) {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const img = document.createElement("img");
    img.src = imageURL;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "X";
    deleteBtn.onclick = () => removeImage(imageContainer, imageURL);

    imageContainer.appendChild(img);
    imageContainer.appendChild(deleteBtn);
    gallery.appendChild(imageContainer);
}

// Save Image to localStorage
function saveImage(imageURL) {
    let images = JSON.parse(localStorage.getItem("images")) || [];
    images.push(imageURL);
    localStorage.setItem("images", JSON.stringify(images));
}

// Load Images from localStorage
function loadImages() {
    let images = JSON.parse(localStorage.getItem("images")) || [];
    images.forEach(imageURL => addImageToGallery(imageURL));
}

// Remove Image from Gallery & localStorage
function removeImage(imageContainer, imageURL) {
    imageContainer.remove();
    let images = JSON.parse(localStorage.getItem("images")) || [];
    images = images.filter(img => img !== imageURL);
    localStorage.setItem("images", JSON.stringify(images));
}
