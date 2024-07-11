const token = localStorage.getItem('token');

        fetch('/DoctorProfile', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
            }
        })
        .then(response => response.json())
        .then(data => {
            const userDataElement = document.getElementById('content');
            console.log(data)
            userDataElement.innerHTML = `
            <div class="UserP">
            <p>Name: ${data.name}</p>
            <p>Email: ${data.email}</p>
            <p>Mobile: ${data.mobile}</p>
            <p>Age: ${data.age}</p>
            <p>Home City: ${data.home_city}</p>
            <p>Gender: ${data.gender}</p>
            </div>
            `;
        })
        .catch(error => console.error('Error fetching user data:', error));