import { useApiResource } from '../hooks/useApiResource'

function Leaderboard() {
  const { data, loading, error } = useApiResource('leaderboard')
  return <ResourceView eyebrow="THE RACE" title="Leaderboard" description="A little competition, a lot of consistency."><div className="leaderboard-list"><States loading={loading} error={error} empty={data.length === 0} emptyLabel="The leaderboard is waiting for its first score." />{!loading && !error && data.map((entry, index) => <article className="leader-row" key={entry._id ?? entry.rank}><span className="rank-number">{String(entry.rank ?? index + 1).padStart(2, '0')}</span><div className="avatar">{entry.user?.displayName?.slice(0, 1) ?? '?'}</div><div className="leader-name"><strong>{entry.user?.displayName ?? 'Athlete'}</strong><span>{entry.team?.name ?? 'Independent'}</span></div><strong className="points">{entry.points ?? 0}<small> pts</small></strong></article>)}</div></ResourceView>
}
export default Leaderboard
function ResourceView({ eyebrow, title, description, children }) { return <section className="resource-view"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="intro-copy">{description}</p>{children}</section> }
function States({ loading, error, empty, emptyLabel }) { if (loading) return <div className="state-message">Loading live data...</div>; if (error) return <div className="state-message state-error">{error}</div>; return empty ? <div className="state-message">{emptyLabel}</div> : null }