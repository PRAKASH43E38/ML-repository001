/* ═══════════════════════════════════════════
   MOBILE ADDICTION PREDICTOR — script.js
   ═══════════════════════════════════════════ */

const API = '';   // Same origin — Flask serves both frontend & API

/* ── CONSTANTS ─────────────────────────────── */
const ADVICE = {
  High:   '⚠️ High addiction detected! Excessive phone usage is hurting your health. Try digital detox days, disable non-essential notifications, and set app time limits. Small steps go a long way!',
  Medium: '🟡 Moderate usage detected. You\'re borderline — schedule phone-free hours especially 1 hr before sleep. Consistent small changes will make a huge difference.',
  Low:    '✅ Great job! Your phone usage is healthy and balanced. Keep up the good sleep routine and mindful screen time habits!'
};

const SUBTITLES = {
  High:   'Your usage patterns indicate significantly elevated phone dependency.',
  Medium: 'Moderate phone usage detected — a few habits need attention.',
  Low:    'Your digital lifestyle looks healthy and balanced.'
};

/* ── SLIDER CONFIG ──────────────────────────── */
const SLIDERS = [
  { rid: 'r0', vid: 'v0', cid: 'c0', fmt: v => v + 'h' },
  { rid: 'r1', vid: 'v1', cid: 'c1', fmt: v => v + 'h' },
  { rid: 'r2', vid: 'v2', cid: 'c2', fmt: v => v + 'h' },
  { rid: 'r3', vid: 'v3', cid: 'c3', fmt: v => v       },
  { rid: 'r4', vid: 'v4', cid: 'c4', fmt: v => v       },
];

/* ── INIT SLIDERS ───────────────────────────── */
function initSliders() {
  SLIDERS.forEach(s => {
    const el = document.getElementById(s.rid);
    if (!el) return;

    const update = () => {
      const v = parseFloat(el.value);
      document.getElementById(s.vid).textContent = v;
      document.getElementById(s.cid).textContent = s.fmt(v);

      // Track fill color
      const pct = ((v - el.min) / (el.max - el.min)) * 100;
      el.style.background =
        `linear-gradient(90deg, #0a84ff ${pct}%, #1c1c3e ${pct}%)`;
    };

    el.addEventListener('input', update);
    update(); // run once on load
  });
}

/* ── CHECK API STATUS ───────────────────────── */
async function checkAPI() {
  const dot = document.getElementById('dot');
  const msg = document.getElementById('api-msg');
  try {
    const res = await fetch('/model-info', { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const data = await res.json();
      dot.className = 'dot on';
      msg.textContent = `Flask API connected ✅  |  Model: ${data.model}  |  Accuracy: ${data.accuracy}`;
    } else {
      throw new Error('Bad response');
    }
  } catch {
    dot.className = 'dot off';
    msg.textContent = 'Server offline — run: python app.py';
  }
}

/* ── PREDICT ─────────────────────────────────── */
async function predict() {
  const btn     = document.getElementById('btn');
  const spin    = document.getElementById('spin');
  const btxt    = document.getElementById('btxt');
  const errBox  = document.getElementById('err');

  // Loading state
  btn.disabled          = true;
  spin.style.display    = 'block';
  btxt.textContent      = 'Predicting...';
  errBox.className      = 'err-box';

  // Collect slider values
  const payload = {
    gaming_time_hr:        parseFloat(document.getElementById('r0').value),
    social_media_time_hr:  parseFloat(document.getElementById('r1').value),
    sleep_hours:           parseFloat(document.getElementById('r2').value),
    daily_unlocks:         parseInt(document.getElementById('r3').value),
    notifications_per_day: parseInt(document.getElementById('r4').value),
  };

  try {
    const res  = await fetch('/predict', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
      signal:  AbortSignal.timeout(8000),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      throw new Error(data.error || 'Server returned an error');
    }

    renderResult(data);

  } catch (err) {
    const isNetwork = err.name === 'TypeError' || err.name === 'TimeoutError';
    document.getElementById('emsg').textContent = isNetwork
      ? 'Cannot reach the server. Make sure app.py is running on port 5000.'
      : err.message;
    errBox.className = 'err-box show';
  } finally {
    btn.disabled       = false;
    spin.style.display = 'none';
    btxt.textContent   = '🔮 \u00a0 Predict Addiction Level';
  }
}

/* ── RENDER RESULT ──────────────────────────── */
function renderResult(data) {
  const { prediction: pred, confidence: conf, probabilities: probs } = data;

  // Show panel
  const panel = document.getElementById('result');
  panel.className = 'result show';

  // Prediction level
  const lvl = document.getElementById('rlv');
  lvl.textContent = pred.toUpperCase();
  lvl.className   = 'res-level ' + pred;

  // Subtitle
  document.getElementById('rsub').textContent = SUBTITLES[pred];

  // Glow background
  document.getElementById('gbg').className = 'glow-bg ' + pred;

  // Confidence bar
  document.getElementById('cpct').textContent = conf + '%';
  const fill = document.getElementById('cfill');
  fill.className  = 'conf-fill ' + pred;
  fill.style.width = '0%';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { fill.style.width = conf + '%'; });
  });

  // Probability values
  document.getElementById('pv0').textContent = (probs['High']   ?? 0) + '%';
  document.getElementById('pv1').textContent = (probs['Medium'] ?? 0) + '%';
  document.getElementById('pv2').textContent = (probs['Low']    ?? 0) + '%';

  // Highlight active probability card
  const classMap = { High: 'pi0', Medium: 'pi1', Low: 'pi2' };
  ['pi0', 'pi1', 'pi2'].forEach(id => {
    document.getElementById(id).classList.remove('active');
  });
  document.getElementById(classMap[pred]).classList.add('active');

  // Advice
  const adv = document.getElementById('adv');
  adv.textContent = ADVICE[pred];
  adv.className   = 'advice-box ' + pred;

  // Smooth scroll to result
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ── RESET ──────────────────────────────────── */
function resetResult() {
  document.getElementById('result').className  = 'result';
  document.getElementById('cfill').style.width = '0%';
  document.getElementById('err').className     = 'err-box';
  ['pi0', 'pi1', 'pi2'].forEach(id => {
    document.getElementById(id).classList.remove('active');
  });
}

/* ── BOOT ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initSliders();
  checkAPI();
});
