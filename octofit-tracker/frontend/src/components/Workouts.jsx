import { useApiResource } from '../hooks/useApiResource'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts'

function Workouts() {
  const { data, loading, error } = useApiResource('workouts', workoutsEndpoint)
  return <ResourceView title="Workouts" description="A good plan makes showing up easier."><div className="card-grid workout-grid"><States loading={loading} error={error} empty={data.length === 0} emptyLabel="No workouts available." />{!loading && !error && data.map((workout) => <article className="workout-card" key={workout._id ?? workout.name}><div className="workout-top"><span>{workout.type ?? 'Training'}</span><span>{workout.difficulty ?? 'all levels'}</span></div><h2>{workout.name}</h2><div className="workout-meta"><span>{workout.durationMinutes ?? 0} min</span><span>{workout.targetCalories ?? 0} kcal</span></div></article>)}</div></ResourceView>
}
export default Workouts
function ResourceView({ title, description, children }) { return <section className="resource-view"><div className="eyebrow">THE LIBRARY</div><h1>{title}</h1><p className="intro-copy">{description}</p>{children}</section> }
function States({ loading, error, empty, emptyLabel }) { if (loading) return <div className="state-message">Loading live data...</div>; if (error) return <div className="state-message state-error">{error}</div>; return empty ? <div className="state-message">{emptyLabel}</div> : null }