document.addEventListener('DOMContentLoaded', () => {
    const donorForm = document.getElementById('donor-form');
    const searchForm = document.getElementById('search-form');
    const resultsDiv = document.getElementById('results');
    
    const donors = [];

    donorForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const bloodGroup = document.getElementById('blood-group').value;
        const location = document.getElementById('location').value.split(',').map(Number);

        donors.push({ name, bloodGroup, location, availability: true });
        alert('Donor added successfully!');
        donorForm.reset();
    });

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const patientLocation = document.getElementById('patient-location').value.split(',').map(Number);
        const requiredBloodGroup = document.getElementById('required-blood-group').value;
        const searchRadius = Number(document.getElementById('search-radius').value);

        const matchedDonors = donors.filter(donor => 
            donor.bloodGroup === requiredBloodGroup &&
            donor.availability &&
            calculateDistance(patientLocation, donor.location) <= searchRadius
        );

        displayResults(matchedDonors);
    });

    function calculateDistance(loc1, loc2) {
        const toRadians = angle => angle * (Math.PI / 180);
        const [lat1, lon1] = loc1.map(toRadians);
        const [lat2, lon2] = loc2.map(toRadians);
        const R = 6371; // Earth's radius in kilometers

        const dLat = lat2 - lat1;
        const dLon = lon2 - lon1;

        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    function displayResults(donors) {
        resultsDiv.innerHTML = '<h3>Matched Donors:</h3>';
        if (donors.length === 0) {
            resultsDiv.innerHTML += '<p>No donors found.</p>';
        } else {
            const list = document.createElement('ul');
            donors.forEach(donor => {
                const listItem = document.createElement('li');
                listItem.textContent = `Name: ${donor.name}, Location: ${donor.location.join(', ')}`;
                list.appendChild(listItem);
            });
            resultsDiv.appendChild(list);
        }
    }
});
