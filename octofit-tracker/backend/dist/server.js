import express from 'express';
import { connectDatabase } from './config/database.js';
import { activitiesRouter } from './routes/activities.js';
import { leaderboardRouter } from './routes/leaderboard.js';
import { teamsRouter } from './routes/teams.js';
import { usersRouter } from './routes/users.js';
import { workoutsRouter } from './routes/workouts.js';
const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express.json());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', baseUrl });
});
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
async function startServer() {
    await connectDatabase();
    app.listen(port, () => {
        console.log(`OctoFit API listening on ${baseUrl}`);
    });
}
startServer().catch((error) => {
    console.error('Unable to start OctoFit API:', error);
    process.exit(1);
});
