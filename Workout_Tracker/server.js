const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const workoutDataPath = path.join(__dirname, 'workout.json');

// Function to read workouts from workout.json
function readWorkouts() {
    return new Promise((resolve, reject) => {
        fs.readFile(workoutDataPath, 'utf8', (err, data) => {
            if (err) {
                reject('Error reading workout data');
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

// Function to write workouts to workout.json
function writeWorkouts(workouts) {
    return new Promise((resolve, reject) => {
        fs.writeFile(workoutDataPath, JSON.stringify(workouts, null, 2), 'utf8', (err) => {
            if (err) {
                reject('Error writing workout data');
            } else {
                resolve();
            }
        });
    });
}

// Get all workouts for a specific muscle group
app.get('/api/workouts/:muscleGroup', async (req, res) => {
    try {
        console.log(`Fetching workouts for: ${req.params.muscleGroup}`);
        const workouts = await readWorkouts();
        const muscleGroup = req.params.muscleGroup;
        const filteredWorkouts = workouts.filter(workout => workout.muscleGroup === muscleGroup);
        res.json(filteredWorkouts);  // Respond with filtered workouts
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ error: 'Failed to load workouts' });
    }
});

// Add a new workout
app.post('/api/workouts', async (req, res) => {
    const { name, muscleGroup, sets, reps } = req.body;
    console.log('Received POST request to add workout:', req.body);

    try {
        const workouts = await readWorkouts();
        const newWorkout = { id: Date.now(), name, muscleGroup, sets, reps };
        workouts.push(newWorkout);
        await writeWorkouts(workouts);
        res.status(201).json(newWorkout);  // Return the newly added workout
    } catch (error) {
        console.error('Error adding workout:', error);
        res.status(500).json({ error: 'Failed to add workout' });
    }
});

// Delete a workout
app.delete('/api/workouts/:id', async (req, res) => {
    const workoutId = parseInt(req.params.id, 10);
    console.log(`Received DELETE request for workout ID: ${workoutId}`);

    try {
        const workouts = await readWorkouts();
        const updatedWorkouts = workouts.filter(workout => workout.id !== workoutId);
        await writeWorkouts(updatedWorkouts);
        res.status(204).send();  // Successfully deleted
    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).json({ error: 'Failed to delete workout' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
