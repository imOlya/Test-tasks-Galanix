document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector(".gallery");
    const imageCount = document.getElementById("image-count");
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const closeModal = document.getElementById("close-modal");
    const restoreButton = document.querySelector(".restore-button");

    // Зображення
    const images = [
        "task-2/1.jpg", "task-2/2.jpg", "task-2/3.jpg",
        "task-2/4.jpg", "task-2/5.jpg", "task-2/6.jpg",
        "task-2/7.jpg", "task-2/8.jpg", "task-2/9.jpg",
        "task-2/10.jpg", "task-2/11.jpg", "task-2/12.jpg",
    ];

    // Відновлення зображень із LocalStorage
    const deletedImages = JSON.parse(localStorage.getItem("deletedImages")) || [];
    const filteredImages = images.filter(image => !deletedImages.includes(image));

    // Оновлення кількості зображень
    const updateImageCount = () => {
        const date = new Date();
        const formattedDate = date.toLocaleString("uk-UA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
        imageCount.textContent = `Кількість зображень: ${filteredImages.length} | ${formattedDate}`;
    };

    // Рендеринг зображень
    const renderGallery = () => {
        gallery.innerHTML = "";
        filteredImages.forEach((src, index) => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("image-wrapper");

            const img = document.createElement("img");
            img.src = src;
            img.alt = `Image ${index + 1}`;

            const deleteButton = document.createElement("span");
            deleteButton.textContent = "×";
            deleteButton.classList.add("delete-button");

            wrapper.appendChild(img);
            wrapper.appendChild(deleteButton);
            gallery.appendChild(wrapper);

            // Подія для модального вікна
            img.addEventListener("click", () => {
                modal.style.display = "flex";
                modalImage.src = src;
            });

            // Видалення зображення
            deleteButton.addEventListener("click", () => {
                const imgIndex = filteredImages.indexOf(src);
                if (imgIndex !== -1) {
                    filteredImages.splice(imgIndex, 1);
                    deletedImages.push(src);
                    localStorage.setItem("deletedImages", JSON.stringify(deletedImages));
                    renderGallery();
                    updateImageCount();
                }
            });
        });
    };

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    restoreButton.addEventListener("click", () => {
        localStorage.removeItem("deletedImages");
        location.reload();
    });

    renderGallery();
    updateImageCount();
});
