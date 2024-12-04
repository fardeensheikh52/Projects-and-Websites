let currentMuscleGroup = ''; // To store the selected muscle group

// Function to fetch workouts from the server
function fetchWorkouts(muscleGroup) {
    fetch(`/api/workouts/${muscleGroup}`)
        .then(response => response.json())
        .then(workouts => {
            const workoutList = document.getElementById('workout-list');
            workoutList.innerHTML = ''; // Clear any previous workouts

            if (workouts.length === 0) {
                workoutList.innerHTML = `<p>No workouts found for ${muscleGroup}.</p>`;
            } else {
                workouts.forEach(workout => {
                    const workoutDiv = document.createElement('div');
                    workoutDiv.innerHTML = `
                        <p><strong>${workout.name}</strong> (${workout.muscleGroup})</p>
                        <p>Sets: ${workout.sets}, Reps: ${workout.reps}</p>
                        <button onclick="deleteWorkout(${workout.id})">Delete</button>
                    `;
                    workoutList.appendChild(workoutDiv);
                });
            }
        })
        .catch(error => console.error('Error fetching workouts:', error));
}

// Function to select a muscle group
function selectMuscleGroup(muscleGroup) {
    currentMuscleGroup = muscleGroup;
    fetchWorkouts(muscleGroup);  // Fetch workouts for the selected muscle group
}

// Function to handle the form submission and add a new workout
document.getElementById('workout-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;

    if (!currentMuscleGroup) {
        alert('Please select a muscle group first!');
        return;
    }

    // Send the new workout to the server
    fetch('/api/workouts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, muscleGroup: currentMuscleGroup, sets, reps }),
    })
    .then(response => response.json())
    .then(newWorkout => {
        fetchWorkouts(currentMuscleGroup);  // Fetch updated workouts for the current muscle group
        document.getElementById('workout-form').reset(); // Reset form fields
    })
    .catch(error => console.error('Error adding workout:', error));
});

// Function to delete a workout
function deleteWorkout(workoutId) {
    fetch(`/api/workouts/${workoutId}`, {
        method: 'DELETE',
    })
    .then(() => {
        fetchWorkouts(currentMuscleGroup);  // Fetch updated workouts for the current muscle group
    })
    .catch(error => console.error('Error deleting workout:', error));
}
