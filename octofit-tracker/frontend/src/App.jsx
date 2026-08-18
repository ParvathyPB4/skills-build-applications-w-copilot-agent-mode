import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { API_BASE_URL } from './api'
import './App.css'

const navigation = [
  { label: 'Overview', path: '/' }, { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' }, { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' }, { label: 'Workouts', path: '/workouts' },
]

function Dashboard() {
  return <section className="dashboard-view"><div className="eyebrow">OCTOFIT / CONTROL ROOM</div><h1>Train with intent.</h1><p className="intro-copy">A shared view of movement, momentum, and the people making it happen.</p><div className="dashboard-grid"><article className="feature-panel feature-panel-dark"><span className="panel-kicker">LIVE API</span><h2>One place for the whole team.</h2><p>Track progress, spot trends, and keep the next session close.</p><code>{API_BASE_URL}</code></article>{navigation.slice(1, 5).map((item, index) => <NavLink className={`shortcut shortcut-${index + 1}`} to={item.path} key={item.path}><span className="shortcut-number">0{index + 1}</span><strong>{item.label}</strong><span className="shortcut-arrow" aria-hidden="true">↗</span></NavLink>)}</div></section>
}

function App() {
  return <div className="app-shell"><header className="topbar"><NavLink className="brand" to="/" aria-label="OctoFit overview"><span className="brand-mark">O</span><span>OctoFit</span></NavLink><nav className="primary-nav" aria-label="Primary navigation">{navigation.map((item) => <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to={item.path} key={item.path} end={item.path === '/'}>{item.label}</NavLink>)}</nav><span className="status-chip"><span className="status-dot" /> Online</span></header><main className="page-content"><Routes><Route path="/" element={<Dashboard />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main><footer className="footer"><span>OCTOFIT TRACKER</span><span>Move well. Compete kindly.</span></footer></div>
}

export default App