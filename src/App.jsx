import React from 'react';

function App() {
  return (
    <>
      <style>{`
        :root{
            --ocean-blue:#041E42;
            --header-red:#E63946;
            --kpi-1:#00C2FF;
            --kpi-2:#FFB703;
            --kpi-3:#06D6A0;
            --kpi-4:#FF6B6B;
            --card-bg:rgba(255,255,255,0.08);
            --card-border:rgba(255,255,255,0.15);
        }

        *{
            margin:0;
            padding:0;
            box-sizing:border-box;
            font-family:Segoe UI, sans-serif;
        }

        body{
            background:var(--ocean-blue);
            color:white;
            padding:30px;
        }

        .dashboard-title{
            text-align:center;
            color:var(--header-red);
            font-size:36px;
            font-weight:700;
            margin-bottom:30px;
        }

        .kpi-grid{
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
            gap:20px;
            margin-bottom:40px;
        }

        .kpi-card{
            background:var(--card-bg);
            backdrop-filter:blur(8px);
            border-radius:16px;
            padding:20px;
            border:3px solid;
            box-shadow:0 6px 20px rgba(0,0,0,0.25);
        }

        .kpi-card:nth-child(1){border-color:var(--kpi-1);}
        .kpi-card:nth-child(2){border-color:var(--kpi-2);}
        .kpi-card:nth-child(3){border-color:var(--kpi-3);}
        .kpi-card:nth-child(4){border-color:var(--kpi-4);}

        .kpi-label{
            font-size:14px;
            opacity:.8;
            margin-bottom:10px;
        }

        .kpi-value{
            font-size:34px;
            font-weight:700;
        }

        .kpi-trend{
            margin-top:8px;
            font-size:14px;
        }

        .visual-section{
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:25px;
        }

        .panel{
            background:var(--card-bg);
            border:1px solid var(--card-border);
            border-radius:18px;
            padding:25px;
        }

        .panel h3{
            margin-bottom:20px;
            color:#ffffff;
        }

        .pie-wrapper{
            display:flex;
            justify-content:center;
            align-items:center;
        }

        .pie-chart{
            width:260px;
            height:260px;
            border-radius:50%;
            background:
            conic-gradient(
                #06D6A0 0% 45%,
                #00C2FF 45% 70%,
                #FFB703 70% 88%,
                #E63946 88% 100%
            );
            position:relative;
        }

        .pie-chart::after{
            content:"";
            position:absolute;
            width:120px;
            height:120px;
            background:var(--ocean-blue);
            border-radius:50%;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
        }

        .gauge-container{
            display:flex;
            justify-content:center;
        }

        .gauge{
            width:280px;
            height:140px;
            border-radius:280px 280px 0 0;
            background:
            conic-gradient(
                #E63946 0deg 60deg,
                #FFB703 60deg 120deg,
                #06D6A0 120deg 180deg
            );
            position:relative;
            overflow:hidden;
        }

        .gauge::before{
            content:"";
            position:absolute;
            width:210px;
            height:105px;
            background:var(--ocean-blue);
            border-radius:210px 210px 0 0;
            bottom:0;
            left:50%;
            transform:translateX(-50%);
        }

        .needle{
            position:absolute;
            width:4px;
            height:100px;
            background:white;
            bottom:0;
            left:50%;
            transform-origin:bottom center;
            transform:translateX(-50%) rotate(40deg);
            z-index:10;
        }

        .score{
            text-align:center;
            margin-top:20px;
            font-size:34px;
            font-weight:700;
            color:#06D6A0;
        }

        @media(max-width:900px){
            .visual-section{
                grid-template-columns:1fr;
            }
        }
      `}</style>
      <div>
        <h1 className="dashboard-title">Enterprise Readiness Dashboard</h1>

        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Applications Assessed</div>
            <div className="kpi-value">128</div>
            <div className="kpi-trend">▲ 12%</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Migration Ready</div>
            <div className="kpi-value">82%</div>
            <div className="kpi-trend">▲ 6%</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Risk Score</div>
            <div className="kpi-value">18</div>
            <div className="kpi-trend">▼ 4%</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Compliance Coverage</div>
            <div className="kpi-value">91%</div>
            <div className="kpi-trend">▲ 9%</div>
          </div>
        </div>

        <div className="visual-section">
          <div className="panel">
            <h3>Readiness Distribution</h3>
            <div className="pie-wrapper">
              <div className="pie-chart"></div>
            </div>
          </div>
          <div className="panel">
            <h3>Overall Readiness Score</h3>
            <div className="gauge-container">
              <div className="gauge">
                <div className="needle"></div>
              </div>
            </div>
            <div className="score">78%</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
