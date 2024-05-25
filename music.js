document.addEventListener('DOMContentLoaded', () => {
    fetch('artists.csv')
        .then(response => response.text())
        .then(csvText => {
            const data = parseCSV(csvText);
            const artistsContainer = document.getElementById('artists');

            data.forEach(artist => {
                // Create artist container
                const artistLi = document.createElement('li');
                artistLi.className = 'artist';

                // Create artist name button
                const artistButton = document.createElement('button');
                artistButton.className = 'collapsible';
                artistButton.textContent = artist.artist;
                artistLi.appendChild(artistButton);

                artistButton.addEventListener("click", function () {
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                });

                // Create content div
                const contentDiv = document.createElement('div');
                contentDiv.className = 'content';

                // Create social media container
                const socialMediaDiv = document.createElement('div');
                socialMediaDiv.className = 'socialMedia';

                // Iterate over social media links
                ['website', 'facebook', 'instagram', 'twitter', 'spotify', 'youtube', 'tiktok'].forEach(platform => {
                    if (artist[platform]) {
                        const anchor = document.createElement('a');
                        anchor.href = artist[platform];
                        anchor.target = '_blank';

                        const img = document.createElement('img');
                        img.className = 'socialIcons';
                        img.alt = platform;
                        img.src = `https://static.wixstatic.com/media/${getSocialMediaImage(platform)}`;

                        anchor.appendChild(img);
                        socialMediaDiv.appendChild(anchor);
                    }
                });

                contentDiv.appendChild(socialMediaDiv);

                // Add artist image
                const artistImage = document.createElement('img');
                artistImage.src = artist.image;
                artistImage.alt = artist.artist;
                artistImage.className = 'artist-image';
                contentDiv.appendChild(artistImage);

                artistLi.appendChild(contentDiv);
                artistsContainer.appendChild(artistLi);

                // Add event listener to collapsible button
                artistButton.addEventListener('click', () => {
                    contentDiv.classList.toggle('active');
                    artistButton.classList.toggle('active');
                });
            });
        })
        .catch(error => console.error('Error fetching the CSV:', error));
});

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');

    return lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((object, header, index) => {
            object[header.trim()] = values[index].trim();
            return object;
        }, {});
    });
}

function getSocialMediaImage(platform) {
    const images = {
        facebook: '9975c6_ae1c5b72dcd04f1e85f004fe32eac16e~mv2.png',
        instagram: '9975c6_d0fb95092d8f4eb6abaaec7e69771e4f~mv2.png',
        twitter: '9975c6_e1c5a9c03c594208b94553dcff4f2853~mv2.png',
        spotify: 'a64678_64433f3538784947906572f4f47f0e43~mv2.png',
        youtube: 'a64678_dd6b5a00c0914d9a87b82c8b18936bc2~mv2.png',
        tiktok: 'a64678_0c5b55a8734f45f88316c5c3624b3628~mv2.png',
        website: 'a64678_81dae4aab997438bb32fd063f511fba0~mv2.png'
    };
    return images[platform] || 'default_image.png';  // Return a default image if platform is not found
}

var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}