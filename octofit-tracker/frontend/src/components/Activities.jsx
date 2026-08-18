import { useApiResource } from '../hooks/useApiResource'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities'

function Activities() {
  const { data, loading, error } = useApiResource('activities', activitiesEndpoint)
  return <ResourceView eyebrow="MOVEMENT LOG" title="Activities" description="Every completed session, in one rhythm."><div className="activity-list"><States loading={loading} error={error} empty={data.length === 0} emptyLabel="No activities logged yet." />{!loading && !error && data.map((activity) => <article className="activity-row" key={activity._id ?? `${activity.type}-${activity.completedAt}`}><div className="activity-icon">{activity.type?.slice(0, 1) ?? 'A'}</div><div className="activity-main"><strong>{activity.type ?? 'Activity'}</strong><span>{activity.user?.displayName ?? 'Team member'} · {activity.team?.name ?? 'Personal'}</span></div><div className="activity-stat"><strong>{activity.durationMinutes ?? 0}</strong><span>minutes</span></div><div className="activity-stat"><strong>{activity.calories ?? 0}</strong><span>calories</span></div></article>)}</div></ResourceView>
}
export default Activities
function ResourceView({ eyebrow, title, description, children }) { return <section className="resource-view"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="intro-copy">{description}</p>{children}</section> }
function States({ loading, error, empty, emptyLabel }) { if (loading) return <div className="state-message">Loading live data...</div>; if (error) return <div className="state-message state-error">{error}</div>; return empty ? <div className="state-message">{emptyLabel}</div> : null }