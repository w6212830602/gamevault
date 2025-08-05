'use client';
import useGameDetail from '../hooks/useGameDetail';

export default function GameDetail({ gameId, onClose }) {
  const { gameDetail, loading } = useGameDetail(gameId);

  if (!gameId) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {loading || !gameDetail ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>{gameDetail.name}</h2>
            <img
              src={gameDetail.background_image}
              alt={gameDetail.name}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <p><strong>Released:</strong> {gameDetail.released}</p>
            <p><strong>Rating:</strong> {gameDetail.rating} / 5</p>
            <p><strong>Genres:</strong> {gameDetail.genres.map(g => g.name).join(', ')}</p>
            <div style={{ color: '#111', marginTop: '10px' }}>
              <div dangerouslySetInnerHTML={{ __html: gameDetail.description }} />
            </div>

            {/* 🟡 模擬歷史價格區塊 */}
            <div style={styles.priceSection}>
              <h3 style={styles.subHeading}>📉 Historical Prices</h3>
              {gameDetail.platforms?.map(({ platform }) => (
                <div key={platform.id} style={styles.priceItem}>
                  <strong>{platform.name}</strong>:
                  <span style={styles.priceValue}> $19.99 (Lowest: $9.99)</span>
                </div>
              ))}
            </div>

            <button onClick={onClose} style={styles.closeBtn}>Close</button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    width: '80%',
    maxHeight: '80vh',
    overflowY: 'auto',
    position: 'relative',
  },
  closeBtn: {
    marginTop: '20px',
    padding: '10px 16px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  priceSection: {
    marginTop: '24px',
    padding: '12px',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
  },
  subHeading: {
    fontSize: '1.1rem',
    marginBottom: '8px',
  },
  priceItem: {
    fontSize: '0.95rem',
    marginBottom: '4px',
  },
  priceValue: {
    color: '#10b981',
    marginLeft: '6px',
  },
};
