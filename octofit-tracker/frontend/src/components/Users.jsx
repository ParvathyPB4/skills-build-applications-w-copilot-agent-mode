import { useApiResource } from '../hooks/useApiResource'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users'

function Users() {
  const { data, loading, error } = useApiResource('users', usersEndpoint)
  return <ResourceView title="Users" description="Meet the athletes behind the numbers."><div className="card-grid user-grid"><States loading={loading} error={error} empty={data.length === 0} emptyLabel="No users found." />{!loading && !error && data.map((user) => <article className="user-card" key={user._id ?? user.username}><div className="avatar avatar-large">{user.displayName?.slice(0, 1) ?? '?'}</div><h2>{user.displayName ?? user.username}</h2><span className="user-handle">@{user.username}</span><p>{user.goal ?? 'Keep showing up.'}</p></article>)}</div></ResourceView>
}
export default Users
function ResourceView({ title, description, children }) { return <section className="resource-view"><div className="eyebrow">THE ROSTER</div><h1>{title}</h1><p className="intro-copy">{description}</p>{children}</section> }
function States({ loading, error, empty, emptyLabel }) { if (loading) return <div className="state-message">Loading live data...</div>; if (error) return <div className="state-message state-error">{error}</div>; return empty ? <div className="state-message">{emptyLabel}</div> : null }