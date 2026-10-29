import { useState } from 'react'
import './App.css'

const rows = Array.from({ length: 6 }, (_, r) =>
  Array.from({ length: 11 }, (_, p) => ({ r, p }))
)

export default function App() {
  const [mode, setMode] = useState('normal')
  const [removed, setRemoved] = useState(false)

  const data = {
    normal: {
      title: 'Your Crops. Always Protected.',
      desc: 'One intelligent field. Three ways to protect your harvest.',
      temp: 28,
      risk: 'Low',
      status: 'Standby',
      icon: '🌤️',
      caption: 'NORMAL CONDITIONS'
    },
    rain: {
      title: 'Heavy Rain Detected',
      desc: 'A raised rain cover deploys above the crop rows to divert heavy rainfall.',
      temp: 23,
      risk: 'High',
      status: 'Rain Shield Active',
      icon: '🌧️',
      caption: 'RAIN SHIELD DEPLOYED'
    },
    heat: {
      title: 'Extreme Heat Detected',
      desc: 'A supported shade canopy deploys above the plants to reduce direct sunlight.',
      temp: 42,
      risk: 'High',
      status: 'Heat Shade Active',
      icon: '☀️',
      caption: 'HEAT SHADE DEPLOYED'
    },
    weeds: {
      title: removed ? 'Weeds Removed' : 'Unwanted Grass Detected',
      desc: removed
        ? 'The highlighted unwanted grass has been removed from this demo field.'
        : 'Unwanted grass is highlighted among the crop plants. Remove the marked plants to clear the field.',
      temp: 28,
      risk: removed ? 'Low' : 'Medium',
      status: removed ? 'Removal Complete' : 'Weeds Detected',
      icon: '🌿',
      caption: removed ? 'FIELD CLEARED' : 'WEEDS HIGHLIGHTED'
    }
  }

  const current = data[mode]

  const reset = () => {
    setMode('normal')
    setRemoved(false)
  }

  return (
    <main className="app">
      <nav className="navbar">
        <a className="brand" href="#home" onClick={reset}>
          🌱 Farm<span>Shield</span>
        </a>
        <span className="live">● FIELD SYSTEM DEMO</span>
      </nav>

      <section className="hero" id="home">
        <div className="copy">
          <div className="eyebrow">
            INTELLIGENT CROP PROTECTION
          </div>

          <h1>{current.title}</h1>
          <p>{current.desc}</p>

          <div className="buttons">
            <button
              className="rain-btn"
              onClick={() => setMode('rain')}
            >
              🌧️ Simulate Heavy Rain
            </button>

            <button
              className="heat-btn"
              onClick={() => setMode('heat')}
            >
              ☀️ Simulate Extreme Heat
            </button>

            <button
              className="weed-btn"
              onClick={() => {
                setMode('weeds')
                setRemoved(false)
              }}
            >
              🌿 Detect Unwanted Grass
            </button>
          </div>

          {mode === 'weeds' && !removed && (
            <button
              className="remove-btn"
              onClick={() => setRemoved(true)}
            >
              ✂️ Remove Detected Weeds
            </button>
          )}

          <button className="reset" onClick={reset}>
            ↺ Reset Field
          </button>
        </div>

        <div className="field-card">
          <div className={`scene ${mode}`}>
            <div className="sun">
              {mode === 'rain'
                ? '☁️'
                : mode === 'heat'
                  ? '☀️'
                  : '🌤️'}
            </div>

            <div className="mountains" />

            {mode === 'rain' && (
              <div className="rainfall" />
            )}

            {mode === 'heat' && (
              <div className="heat-rays">
                <i /><i /><i /><i /><i />
              </div>
            )}

            <div className="field">
              {rows.map((row, r) => (
                <div className="crop-row" key={r}>
                  {row.map(({ r: rr, p }) => {
                    const weed =
                      mode === 'weeds' &&
                      !removed &&
                      [
                        [0, 2],
                        [1, 7],
                        [2, 4],
                        [3, 9],
                        [4, 1],
                        [5, 6]
                      ].some(
                        ([a, b]) => a === rr && b === p
                      )

                    return (
                      <span
                        className={`plant ${weed ? 'weed' : ''}`}
                        key={`${rr}-${p}`}
                      >
                        {weed ? '🌾' : '🌿'}
                        {weed && <b>!</b>}
                      </span>
                    )
                  })}
                </div>
              ))}
            </div>

            {(mode === 'rain' || mode === 'heat') && (
              <div className={`canopy ${mode}`}>
                <div className="roof">
                  <span>
                    {mode === 'rain'
                      ? 'RAIN DIVERSION COVER'
                      : 'HEAT SHADE CANOPY'}
                  </span>
                </div>

                <i className="leg left" />
                <i className="leg right" />
                <i className="front-edge" />
              </div>
            )}

            {mode === 'rain' && (
              <>
                <div className="runoff">〰 〰 〰</div>
                <div className="puddles">
                  〰〰〰〰〰〰〰
                </div>
              </>
            )}

            {mode === 'weeds' && (
              <div className="weed-note">
                {removed
                  ? '✓ WEEDS CLEARED'
                  : '⚠ Highlighted plants = unwanted grass'}
              </div>
            )}

            <div className="scene-label">
              FARMSHIELD • FIELD ZONE 01
            </div>
          </div>

          <div className="caption">
            <span>{current.icon} Field conditions</span>
            <b
              className={
                mode === 'normal' ||
                (mode === 'weeds' && removed)
                  ? 'safe'
                  : 'warning'
              }
            >
              ● {current.caption}
            </b>
          </div>
        </div>
      </section>

      <section className="dashboard">
        <div className="heading">
          <div>
            <div className="eyebrow">
              FIELD SYSTEM OVERVIEW
            </div>
            <h2>Field Monitoring Dashboard</h2>
          </div>

          <span className="tag">INTERACTIVE DEMO</span>
        </div>

        <div className="metrics">
          <article>
            <span>🌡️</span>
            <p>Temperature</p>
            <h3>{current.temp}<small>°C</small></h3>
            <small>Field temperature display</small>
          </article>

          <article>
            <span>💧</span>
            <p>Water / Risk Level</p>
            <h3>{current.risk}</h3>
            <small>
              {mode === 'rain'
                ? 'Heavy rainfall scenario'
                : 'Field risk status'}
            </small>
          </article>

          <article>
            <span>🛡️</span>
            <p>Protection System</p>
            <h3>{current.status}</h3>
            <small>
              {mode === 'normal'
                ? 'Awaiting a trigger'
                : 'Response selected'}
            </small>
          </article>

          <article>
            <span>🌾</span>
            <p>Crop Zone</p>
            <h3>
              {mode === 'weeds' && !removed
                ? 'Attention'
                : mode === 'normal'
                  ? 'Stable'
                  : 'Protected'}
            </h3>
            <small>
              {mode === 'weeds' && !removed
                ? 'Unwanted grass marked'
                : 'Field zone 01'}
            </small>
          </article>
        </div>
      </section>

      <section className="how">
        <div className="eyebrow">
          HOW FARMSHIELD WORKS
        </div>

        <h2>Detect. Decide. Act. Protect.</h2>

        <div className="steps">
          <article>
            <b>01</b>
            <h3>Detect</h3>
            <p>
              Identify heavy rain, extreme heat, and unwanted grass.
            </p>
          </article>

          <article>
            <b>02</b>
            <h3>Decide</h3>
            <p>
              Choose the response required by the field condition.
            </p>
          </article>

          <article>
            <b>03</b>
            <h3>Act</h3>
            <p>
              Deploy a raised cover or shade, or mark weeds for removal.
            </p>
          </article>

          <article>
            <b>04</b>
            <h3>Protect</h3>
            <p>
              Help safeguard crops from weather risks and unwanted grass.
            </p>
          </article>
        </div>
      </section>

      <section className="responses">
        <h2>One field. Three intelligent responses.</h2>

        <div>
          <article>
            <span>🌧️</span>
            <h3>Rain Shield</h3>
            <p>
              A raised cover diverts heavy rainfall away from crop rows.
            </p>
          </article>

          <article>
            <span>☀️</span>
            <h3>Heat Shade</h3>
            <p>
              A supported canopy shades plants during extreme heat.
            </p>
          </article>

          <article>
            <span>🌿</span>
            <h3>Weed Management</h3>
            <p>
              Detect, highlight, and demonstrate removal of unwanted grass.
            </p>
          </article>
        </div>
      </section>

      <footer>
        <strong>🌱 FarmShield</strong>
        <p>Smart protection for a more resilient harvest.</p>
      </footer>
    </main>
  )
}