const TARGET = new Date("2026-12-18T05:00:22Z");

const BG_VIDEO = "https://files.catbox.moe/hqf7pd.webm";

export const command = "date";        
export const refreshFrequency = 999; 

export const className = `
  left: 20px;
  top: 20px;
  width: 400px;
  height: 250px;
  font-family: 'Barlow', sans-serif;
  border: 5px solid rgba(255,255,255,0.25);
  border-radius: 15px;
  overflow: hidden;

  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400&display=swap');

  .doom-root {
    width: 400px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
  }

  .doom-video {
    position: absolute;
    inset: 0;
    width: 150%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    margin-left: -25%;
  }

  .scanlines {
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(0,0,0,0.06) 3px,
      rgba(0,0,0,0.06) 4px
    );
    pointer-events: none;
    z-index: 1;
  }

  .vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.75) 100%);
    pointer-events: none;
    z-index: 2;
  }

  .doom-content {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .doom-title {
    font-weight: 500;
    letter-spacing: 0.45em;
    font-size: 11px;
    color: rgba(232, 219, 219, 0.75);
    text-transform: uppercase;
    margin-bottom: 1rem;
    text-align: center;
  }

  .doom-clock {
    display: flex;
    align-items: center;
    gap: 0;
  }

  .doom-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 60px;
  }

  .doom-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px;
    color: #ffffff;
    line-height: 1;
    letter-spacing: 0.02em;
    text-shadow: 0 0 40px rgba(80,180,100,0.25);
  }

  .doom-label {
    font-weight: 300;
    letter-spacing: 0.25em;
    font-size: 7px;
    color: rgba(180,210,180,0.5);
    text-transform: uppercase;
    margin-top: 4px;
  }

  .doom-sep {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 40px;
    color: rgba(255,255,255,0.25);
    line-height: 1;
    padding: 0 2px;
    align-self: flex-start;
    margin-top: 4px;
  }
`;

function pad(n) {
    return String(Math.max(0, n)).padStart(2, "0");
}

function getTimeLeft() {
  const now = new Date();
  const diff = Math.max(0, TARGET - now);

  const totalSecs = Math.floor(diff / 1000);
  const sec = totalSecs % 60;
  const min = Math.floor(totalSecs / 60) % 60;
  const hours = Math.floor(totalSecs / 3600) % 24;

  let months =
    (TARGET.getFullYear() - now.getFullYear()) * 12 +
    (TARGET.getMonth() - now.getMonth());
  if (now.getDate() > TARGET.getDate()) months--;
  months = Math.max(0, months);

  const monthStart = new Date(now.getFullYear(), now.getMonth() + months, now.getDate() + 1);
  const days = Math.max(0, Math.floor((TARGET - monthStart) / 86400000));

  return { months, days, hours, min, sec };
}

export const render = () => {
    const { months, days, hours, min, sec } = getTimeLeft();

    const units = [
        { value: months, label: "Months" },
        { value: days, label: "Days" },
        { value: hours, label: "Hours" },
        { value: min, label: "Min" },
        { value: sec, label: "Sec" },
    ];

    return (
        <div className="doom-root">
            <video className="doom-video" autoPlay loop muted playsInline>
                <source src={BG_VIDEO} type="video/webm" />
            </video>
            <div className="scanlines" />
            <div className="vignette" />

            <div className="doom-content">
                <p className="doom-title">Doomsday is coming</p>

                <div className="doom-clock">
                    {units.map((u, i) => (
                        <div key={u.label} style={{ display: "flex", alignItems: "center" }}>
                            <div className="doom-unit">
                                <span className="doom-num">{pad(u.value)}</span>
                                <span className="doom-label">{u.label}</span>
                            </div>
                            {i < units.length - 1 && <span className="doom-sep">:</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
