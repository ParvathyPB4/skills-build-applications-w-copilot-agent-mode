import { useApiResource } from '../hooks/useApiResource'

function Teams() {
  const { data, loading, error } = useApiResource('teams')
  return <ResourceView title="Teams" description="Good energy travels faster together."><div className="card-grid"><States loading={loading} error={error} empty={data.length === 0} emptyLabel="Create a team to start moving together." />{!loading && !error && data.map((team) => <article className="team-card" key={team._id ?? team.name}><div className="team-card-top"><span className="team-badge">TEAM</span><span>{team.members?.length ?? 0} members</span></div><h2>{team.name}</h2><p>{team.description}</p><div className="member-stack">{(team.members ?? []).slice(0, 4).map((member) => <span className="avatar avatar-small" key={member._id}>{member.displayName?.slice(0, 1) ?? '?'}</span>)}</div></article>)}</div></ResourceView>
}
export default Teams
function ResourceView({ title, description, children }) { return <section className="resource-view"><div className="eyebrow">THE COLLECTIVE</div><h1>{title}</h1><p className="intro-copy">{description}</p>{children}</section> }
function States({ loading, error, empty, emptyLabel }) { if (loading) return <div className="state-message">Loading live data...</div>; if (error) return <div className="state-message state-error">{error}</div>; return empty ? <div className="state-message">{emptyLabel}</div> : null }