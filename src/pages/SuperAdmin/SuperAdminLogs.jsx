import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cpanelApi } from '../../lib/cpanelApi'
import './SuperAdminLogs.css'

const SuperAdminLogs = () => {
  const navigate = useNavigate()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  const [filterAction, setFilterAction] = useState('')
  const [filterEntity, setFilterEntity] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('superAdminAuth')
    if (savedAuth !== 'true') {
      navigate('/super-admin')
    }
  }, [navigate])

  const fetchLogs = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await cpanelApi.listLogs({
        page,
        limit: 50,
        action: filterAction,
        entity: filterEntity,
        search
      })

      setLogs(response.logs || [])
      const pagination = response.pagination || {}
      setTotalPages(pagination.total_pages || 1)
      setTotal(pagination.total || 0)
    } catch (err) {
      setError(err.message || 'Failed to load logs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [page, filterAction, filterEntity, search])

  const handlePrev = () => setPage(prev => Math.max(1, prev - 1))
  const handleNext = () => setPage(prev => Math.min(totalPages, prev + 1))

  const resetFilters = () => {
    setFilterAction('')
    setFilterEntity('')
    setSearch('')
    setPage(1)
  }

  const formatMeta = (meta) => {
    if (!meta) return '-'
    if (typeof meta === 'string') {
      try {
        return JSON.stringify(JSON.parse(meta))
      } catch {
        return meta
      }
    }
    return JSON.stringify(meta)
  }

  return (
    <div className="super-admin-logs">
      <div className="hex-grid-overlay" />
      <header className="logs-header">
        <div>
          <h1>System Logs</h1>
          <p>Super admin only • Records retained for 100 days</p>
        </div>
        <div className="logs-actions">
          <Link to="/super-admin" className="logs-back-btn">Back to Dashboard</Link>
          <button onClick={fetchLogs} className="logs-refresh-btn">Refresh</button>
        </div>
      </header>

      <section className="logs-filters">
        <div className="filter-field">
          <label>Action</label>
          <input
            type="text"
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            placeholder="payment_submit, admin_update..."
          />
        </div>
        <div className="filter-field">
          <label>Entity</label>
          <input
            type="text"
            value={filterEntity}
            onChange={(e) => setFilterEntity(e.target.value)}
            placeholder="student, payment, admin_user"
          />
        </div>
        <div className="filter-field">
          <label>Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="code, email, ID"
          />
        </div>
        <button className="filters-clear" onClick={resetFilters}>Clear</button>
      </section>

      {loading && (
        <div className="logs-loading">Loading logs...</div>
      )}

      {error && (
        <div className="logs-error">{error}</div>
      )}

      {!loading && !error && (
        <motion.div
          className="logs-table-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <table className="logs-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Action</th>
                <th>Entity</th>
                <th>Entity ID</th>
                <th>Actor</th>
                <th>IP</th>
                <th>Meta</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.created_at}</td>
                    <td>{log.action}</td>
                    <td>{log.entity}</td>
                    <td>{log.entity_id || '-'}</td>
                    <td>{log.actor || '-'}</td>
                    <td>{log.ip_address || '-'}</td>
                    <td className="logs-meta">{formatMeta(log.meta)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="logs-empty">No logs found</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="logs-pagination">
            <span>Page {page} of {totalPages} • Showing {logs.length} of {total}</span>
            <div className="pagination-buttons">
              <button onClick={handlePrev} disabled={page === 1}>Previous</button>
              <button onClick={handleNext} disabled={page === totalPages}>Next</button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default SuperAdminLogs
