import { useReducer, useEffect, useRef, useCallback, useState } from "react";

// ============================================================
// 1. DEFAULT WORD BANK
// ============================================================
const DEFAULT_CARDS = [
  { id: "d1", targetWord: "NETFLIX", forbiddenWords: ["Stream", "Movie", "Series", "Show", "Subscription"], isCustom: false },
  { id: "d2", targetWord: "PIZZA", forbiddenWords: ["Cheese", "Dough", "Italy", "Slice", "Tomato"], isCustom: false },
  { id: "d3", targetWord: "INSTAGRAM", forbiddenWords: ["Photo", "Filter", "Follower", "Story", "Like"], isCustom: false },
  { id: "d4", targetWord: "AIRPORT", forbiddenWords: ["Plane", "Travel", "Terminal", "Flight", "Gate"], isCustom: false },
  { id: "d5", targetWord: "GUITAR", forbiddenWords: ["Music", "String", "Rock", "Strum", "Band"], isCustom: false },
  { id: "d6", targetWord: "COFFEE", forbiddenWords: ["Caffeine", "Espresso", "Bean", "Morning", "Hot"], isCustom: false },
  { id: "d7", targetWord: "PYRAMID", forbiddenWords: ["Egypt", "Triangle", "Ancient", "Pharaoh", "Desert"], isCustom: false },
  { id: "d8", targetWord: "MARATHON", forbiddenWords: ["Run", "Race", "26", "Miles", "Athens"], isCustom: false },
  { id: "d9", targetWord: "SUBMARINE", forbiddenWords: ["Ocean", "Navy", "Underwater", "Torpedo", "Dive"], isCustom: false },
  { id: "d10", targetWord: "CHOCOLATE", forbiddenWords: ["Sweet", "Cocoa", "Dark", "Candy", "Brown"], isCustom: false },
  { id: "d11", targetWord: "VOLCANO", forbiddenWords: ["Lava", "Erupt", "Mountain", "Hot", "Magma"], isCustom: false },
  { id: "d12", targetWord: "TWITTER", forbiddenWords: ["Tweet", "Bird", "Social", "Elon", "Post"], isCustom: false },
  { id: "d13", targetWord: "SUSHI", forbiddenWords: ["Japan", "Rice", "Fish", "Raw", "Roll"], isCustom: false },
  { id: "d14", targetWord: "ASTRONAUT", forbiddenWords: ["Space", "Rocket", "NASA", "Moon", "Suit"], isCustom: false },
  { id: "d15", targetWord: "BASKETBALL", forbiddenWords: ["Hoop", "Ball", "NBA", "Court", "Score"], isCustom: false },
  { id: "d16", targetWord: "IPHONE", forbiddenWords: ["Apple", "Phone", "Smart", "Device", "Apps"], isCustom: false },
  { id: "d17", targetWord: "TESLA", forbiddenWords: ["Car", "Electric", "Elon", "Battery", "Auto"], isCustom: false },
  { id: "d18", targetWord: "HARRY POTTER", forbiddenWords: ["Wizard", "Magic", "Wand", "Movie", "Scar"], isCustom: false },
  { id: "d19", targetWord: "YOUTUBE", forbiddenWords: ["Video", "Channel", "Watch", "Creator", "Google"], isCustom: false },
  { id: "d20", targetWord: "CACTUS", forbiddenWords: ["Desert", "Prickly", "Green", "Water", "Plant"], isCustom: false },
  { id: "d21", targetWord: "SHARK", forbiddenWords: ["Ocean", "Jaws", "Fin", "Teeth", "Bite"], isCustom: false },
  { id: "d22", targetWord: "TOWER BRIDGE", forbiddenWords: ["London", "Thames", "River", "UK", "Castle"], isCustom: false },
  { id: "d23", targetWord: "KARAOKE", forbiddenWords: ["Sing", "Microphone", "Music", "Bar", "Song"], isCustom: false },
  { id: "d24", targetWord: "ELEVATOR", forbiddenWords: ["Lift", "Building", "Floor", "Up", "Down"], isCustom: false },
  { id: "d25", targetWord: "DIAMOND", forbiddenWords: ["Ring", "Gem", "Expensive", "Jewelry", "Hard"], isCustom: false },
  { id: "d26", targetWord: "POKEMON", forbiddenWords: ["Card", "Game", "Anime", "Pikachu", "Catch"], isCustom: false },
  { id: "d27", targetWord: "SUBWAY", forbiddenWords: ["Train", "Underground", "Station", "Metro", "Commute"], isCustom: false },
  { id: "d28", targetWord: "GHOST", forbiddenWords: ["Scary", "Spirit", "Haunted", "Casper", "Boo"], isCustom: false },
  { id: "d29", targetWord: "CHEF", forbiddenWords: ["Cook", "Kitchen", "Restaurant", "Food", "Knife"], isCustom: false },
  { id: "d30", targetWord: "OLYMPICS", forbiddenWords: ["Gold", "Sports", "Medal", "World", "Games"], isCustom: false },
  { id: "d31", targetWord: "ZOMBIE", forbiddenWords: ["Undead", "Apocalypse", "Brain", "Dead", "Walking"], isCustom: false },
  { id: "d32", targetWord: "EIFFEL TOWER", forbiddenWords: ["Paris", "France", "Iron", "Monument", "City"], isCustom: false },
  { id: "d33", targetWord: "UMBRELLA", forbiddenWords: ["Rain", "Wet", "Weather", "Sun", "Dry"], isCustom: false },
  { id: "d34", targetWord: "BEE", forbiddenWords: ["Honey", "Insect", "Yellow", "Sting", "Flower"], isCustom: false },
  { id: "d35", targetWord: "MICROSCOPE", forbiddenWords: ["Science", "Lab", "Cells", "View", "Small"], isCustom: false },
  { id: "d36", targetWord: "SPIDERMAN", forbiddenWords: ["Marvel", "Web", "Hero", "Peter", "Parker"], isCustom: false },
  { id: "d37", targetWord: "TAXI", forbiddenWords: ["Yellow", "Driver", "Cab", "Uber", "Ride"], isCustom: false },
  { id: "d38", targetWord: "SKELETON", forbiddenWords: ["Bones", "Body", "Skull", "Halloween", "White"], isCustom: false },
  { id: "d39", targetWord: "PENGUIN", forbiddenWords: ["Antarctica", "Ice", "Bird", "Flightless", "Cold"], isCustom: false },
  { id: "d40", targetWord: "CAMERA", forbiddenWords: ["Photo", "Lens", "Picture", "Flash", "Video"], isCustom: false },
  { id: "d41", targetWord: "TIKTOK", forbiddenWords: ["Dance", "Viral", "Short", "App", "Music"], isCustom: false },
  { id: "d42", targetWord: "VALENTINE", forbiddenWords: ["Love", "Heart", "Red", "February", "Gift"], isCustom: false },
  { id: "d43", targetWord: "ASTRONOMY", forbiddenWords: ["Stars", "Space", "Telescope", "Planet", "Galaxy"], isCustom: false },
  { id: "d44", targetWord: "LIBRARY", forbiddenWords: ["Books", "Read", "Quiet", "Silence", "Study"], isCustom: false },
  { id: "d45", targetWord: "FIREWORKS", forbiddenWords: ["Explosion", "Sky", "Celebration", "Night", "Colors"], isCustom: false },
  { id: "d46", targetWord: "KITCHEN", forbiddenWords: ["House", "Cooking", "Stove", "Room", "Fridge"], isCustom: false },
  { id: "d47", targetWord: "BACKPACK", forbiddenWords: ["School", "Bag", "Carry", "Travel", "Hike"], isCustom: false },
  { id: "d48", targetWord: "DRACULA", forbiddenWords: ["Vampire", "Blood", "Transylvania", "Bat", "Fang"], isCustom: false },
  { id: "d49", targetWord: "ICELAND", forbiddenWords: ["Country", "Cold", "Greenland", "Glacier", "Island"], isCustom: false },
  { id: "d50", targetWord: "STEREOTYPE", forbiddenWords: ["General", "Group", "Label", "Opinion", "Bias"], isCustom: false }
];

// ============================================================
// 2. localStorage helpers
// ============================================================
const LS_KEY = "taboo_custom_cards_v2";

function loadCustomCards() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveCustomCards(cards) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(cards)); } catch {}
}

function buildDeck(includeCustom, customCards) {
  return includeCustom && customCards.length > 0
    ? [...DEFAULT_CARDS, ...customCards]
    : [...DEFAULT_CARDS];
}

function shuffleDeck(deck) {
  return [...deck].sort(() => Math.random() - 0.5);
}

// ============================================================
// 3. GAME PHASES & STATE
// ============================================================
const PHASE = {
  SETUP: "SETUP",
  CARD_MANAGER: "CARD_MANAGER",
  TURN_START: "TURN_START",
  PLAYING: "PLAYING",
  TURN_END: "TURN_END",
  GAME_OVER: "GAME_OVER",
};

function createInitialState(customCards = []) {
  return {
    phase: PHASE.SETUP,
    teams: [
      { id: 0, name: "Team A", score: 0, color: "#FF3366" },
      { id: 1, name: "Team B", score: 0, color: "#00C9FF" },
    ],
    activeTeamIndex: 0,
    round: 1,
    totalRounds: 3,
    turnDuration: 60,
    timeLeft: 60,
    includeCustomCards: true,
    customCards,
    deck: shuffleDeck(buildDeck(true, customCards)),
    currentCardIndex: 0,
    turnHistory: [],
  };
}

// ============================================================
// 4. REDUCER
// ============================================================
function reducer(state, action) {
  switch (action.type) {
    case "SET_TEAM_NAME": {
      const teams = state.teams.map((t, i) =>
        i === action.payload.index ? { ...t, name: action.payload.name } : t);
      return { ...state, teams };
    }
    case "SET_TURN_DURATION":
      return { ...state, turnDuration: action.payload, timeLeft: action.payload };
    case "SET_TOTAL_ROUNDS":
      return { ...state, totalRounds: action.payload };
    case "TOGGLE_CUSTOM":
      return { ...state, includeCustomCards: !state.includeCustomCards };
    case "SET_CUSTOM_CARDS":
      return { ...state, customCards: action.payload };
    case "OPEN_MANAGER":
      return { ...state, phase: PHASE.CARD_MANAGER };
    case "CLOSE_MANAGER":
      return { ...state, phase: PHASE.SETUP };
    case "START_GAME": {
      const deck = shuffleDeck(buildDeck(state.includeCustomCards, state.customCards));
      return { ...state, phase: PHASE.TURN_START, deck, currentCardIndex: 0 };
    }
    case "BEGIN_TURN":
      return { ...state, phase: PHASE.PLAYING, timeLeft: state.turnDuration, turnHistory: [] };
    case "TICK":
      if (state.timeLeft <= 1) return { ...state, timeLeft: 0, phase: PHASE.TURN_END };
      return { ...state, timeLeft: state.timeLeft - 1 };
    case "CORRECT": {
      const teams = state.teams.map((t, i) =>
        i === state.activeTeamIndex ? { ...t, score: t.score + 1 } : t);
      return {
        ...state, teams,
        currentCardIndex: (state.currentCardIndex + 1) % state.deck.length,
        turnHistory: [...state.turnHistory, { word: state.deck[state.currentCardIndex].targetWord, result: "correct" }],
      };
    }
    case "TABOO": {
      const teams = state.teams.map((t, i) =>
        i === state.activeTeamIndex ? { ...t, score: Math.max(0, t.score - 1) } : t);
      return {
        ...state, teams,
        currentCardIndex: (state.currentCardIndex + 1) % state.deck.length,
        turnHistory: [...state.turnHistory, { word: state.deck[state.currentCardIndex].targetWord, result: "taboo" }],
      };
    }
    case "PASS":
      return {
        ...state,
        currentCardIndex: (state.currentCardIndex + 1) % state.deck.length,
        turnHistory: [...state.turnHistory, { word: state.deck[state.currentCardIndex].targetWord, result: "pass" }],
      };
    case "END_TURN":
      return { ...state, phase: PHASE.TURN_END, timeLeft: 0 };
    case "NEXT_TURN": {
      const next = (state.activeTeamIndex + 1) % state.teams.length;
      const newRound = next === 0 ? state.round + 1 : state.round;
      if (newRound > state.totalRounds && next === 0) return { ...state, phase: PHASE.GAME_OVER };
      const deck = shuffleDeck(buildDeck(state.includeCustomCards, state.customCards));
      return { ...state, phase: PHASE.TURN_START, activeTeamIndex: next, round: newRound, timeLeft: state.turnDuration, turnHistory: [], deck, currentCardIndex: 0 };
    }
    case "RESET":
      return createInitialState(state.customCards);
    default:
      return state;
  }
}

// ============================================================
// 5. useTabooLogic HOOK
// ============================================================
function useTabooLogic() {
  const [state, dispatch] = useReducer(reducer, createInitialState(loadCustomCards()));
  const timerRef = useRef(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => dispatch({ type: "TICK" }), 1000);
  }, [stopTimer]);

  useEffect(() => {
    if (state.phase === PHASE.PLAYING) startTimer();
    else stopTimer();
    return stopTimer;
  }, [state.phase]);

  useEffect(() => { saveCustomCards(state.customCards); }, [state.customCards]);

  const updateCustomCards = useCallback((cards) =>
    dispatch({ type: "SET_CUSTOM_CARDS", payload: cards }), []);

  return {
    state,
    currentCard: state.deck[state.currentCardIndex],
    activeTeam: state.teams[state.activeTeamIndex],
    updateCustomCards,
    actions: {
      setTeamName: (i, n) => dispatch({ type: "SET_TEAM_NAME", payload: { index: i, name: n } }),
      setTurnDuration: (d) => dispatch({ type: "SET_TURN_DURATION", payload: d }),
      setTotalRounds: (r) => dispatch({ type: "SET_TOTAL_ROUNDS", payload: r }),
      toggleCustom: () => dispatch({ type: "TOGGLE_CUSTOM" }),
      openManager: () => dispatch({ type: "OPEN_MANAGER" }),
      closeManager: () => dispatch({ type: "CLOSE_MANAGER" }),
      startGame: () => dispatch({ type: "START_GAME" }),
      beginTurn: () => dispatch({ type: "BEGIN_TURN" }),
      correct: () => dispatch({ type: "CORRECT" }),
      taboo: () => dispatch({ type: "TABOO" }),
      pass: () => dispatch({ type: "PASS" }),
      endTurn: () => { stopTimer(); dispatch({ type: "END_TURN" }); },
      nextTurn: () => dispatch({ type: "NEXT_TURN" }),
      reset: () => dispatch({ type: "RESET" }),
    },
  };
}

// ============================================================
// 6. FloatingTimer — SVG circular progress, fixed bottom-right
// ============================================================
function FloatingTimer({ timeLeft, turnDuration }) {
  const pct = timeLeft / turnDuration;
  const R = 26;
  const circ = 2 * Math.PI * R;
  const isCritical = timeLeft <= 10;
  const color = pct > 0.5 ? "#00E676" : pct > 0.25 ? "#FFD600" : "#FF3D00";

  return (
    <>
      <style>{`
        @keyframes fp { from{transform:scale(1)} to{transform:scale(1.18)} }
        .ft-critical { animation: fp 0.55s ease-in-out infinite alternate; }
      `}</style>
      <div
        className={isCritical ? "ft-critical" : ""}
        style={{
          position: "fixed",
          bottom: 22,
          right: 22,
          zIndex: 9999,
          filter: isCritical ? "drop-shadow(0 0 14px #FF3D00aa)" : "drop-shadow(0 2px 8px #000a)",
        }}
      >
        <svg width={72} height={72} viewBox="0 0 68 68">
          <circle cx={34} cy={34} r={R} fill="#0a0a0f" stroke="#1e1e2e" strokeWidth={5} />
          <circle
            cx={34} cy={34} r={R}
            fill="none"
            stroke={color}
            strokeWidth={5}
            strokeDasharray={`${circ * pct} ${circ}`}
            strokeLinecap="round"
            transform="rotate(-90 34 34)"
            style={{ transition: "stroke-dasharray 1s linear, stroke 0.3s" }}
          />
          <text
            x={34} y={34}
            textAnchor="middle"
            dominantBaseline="central"
            fill={color}
            fontWeight={900}
            fontSize={isCritical ? 21 : 18}
            fontFamily="Impact, Arial Black, sans-serif"
          >{timeLeft}</text>
        </svg>
      </div>
    </>
  );
}

// ============================================================
// 7. CardCreator Component
// ============================================================
const emptyForm = () => ({ targetWord: "", forbiddenWords: ["", "", "", "", ""] });

function CardCreator({ customCards, onUpdate, onClose }) {
  const [form, setForm] = useState(emptyForm());
  const [msg, setMsg] = useState(null); // { type: 'error'|'ok', text }

  function setFW(idx, val) {
    const f = [...form.forbiddenWords]; f[idx] = val;
    setForm(prev => ({ ...prev, forbiddenWords: f }));
  }

  function handleAdd() {
    if (!form.targetWord.trim()) return setMsg({ type: "error", text: "Target word is required." });
    if (form.forbiddenWords.filter(w => w.trim()).length < 3)
      return setMsg({ type: "error", text: "Add at least 3 forbidden words." });
    const card = {
      id: `c_${Date.now()}`,
      targetWord: form.targetWord.trim().toUpperCase(),
      forbiddenWords: form.forbiddenWords.map(w => w.trim()).filter(Boolean),
      isCustom: true,
    };
    onUpdate([...customCards, card]);
    setForm(emptyForm());
    setMsg({ type: "ok", text: `✅ "${card.targetWord}" added!` });
    setTimeout(() => setMsg(null), 2500);
  }

  return (
    <div style={S.screen}>
      <div style={S.mgCard}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <h2 style={{ color: "#fff", margin: 0, fontSize: 22, fontWeight: 900 }}>✏️ Card Manager</h2>
          <button style={{ background: "none", border: "none", color: "#666", fontSize: 22, cursor: "pointer" }} onClick={onClose}>✕</button>
        </div>
        <p style={{ color: "#555", fontSize: 12, margin: "0 0 20px" }}>Cards are saved in your browser and persist between sessions.</p>

        {/* Form */}
        <div style={S.formBox}>
          <div style={S.fGroup}>
            <label style={S.fLabel}>🎯 TARGET WORD</label>
            <input style={S.fInput} value={form.targetWord}
              onChange={e => setForm(p => ({ ...p, targetWord: e.target.value }))}
              placeholder="e.g. PHOTOSYNTHESIS" maxLength={30} />
          </div>
          <div style={S.fGroup}>
            <label style={S.fLabel}>🚫 FORBIDDEN WORDS (min 3)</label>
            {form.forbiddenWords.map((w, i) => (
              <input key={i} style={{ ...S.fInput, marginBottom: i < 4 ? 8 : 0, fontSize: 14 }}
                value={w} onChange={e => setFW(i, e.target.value)}
                placeholder={`Forbidden word ${i + 1}`} maxLength={24} />
            ))}
          </div>
          {msg && (
            <div style={{ color: msg.type === "ok" ? "#00E676" : "#FF3D00", fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
              {msg.text}
            </div>
          )}
          <button style={S.addBtn} onClick={handleAdd}>+ ADD CARD</button>
        </div>

        {/* Custom card list */}
        {customCards.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div style={{ color: "#555", fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>
              SAVED CARDS ({customCards.length})
            </div>
            <div style={{ maxHeight: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
              {customCards.map(c => (
                <div key={c.id} style={S.cardRow}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#fff", fontWeight: 900, fontSize: 14 }}>{c.targetWord}</div>
                    <div style={{ color: "#666", fontSize: 11, marginTop: 2 }}>{c.forbiddenWords.join(" · ")}</div>
                  </div>
                  <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}
                    onClick={() => onUpdate(customCards.filter(x => x.id !== c.id))}>🗑</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button style={{ ...S.startBtn, marginTop: 24, background: "#1a1a2e", border: "2px solid #333", color: "#aaa" }} onClick={onClose}>
          ← Back to Setup
        </button>
      </div>
    </div>
  );
}

// ============================================================
// 8. Setup Screen
// ============================================================
function SetupScreen({ state, actions }) {
  const cc = state.customCards.length;
  return (
    <div style={S.screen}>
      <div style={S.setupCard}>
        <h1 style={S.logo}>
          <span style={{ color: "#FF3366" }}>UAM</span>{" "}
          <span style={{ color: "#fff" }}>TABOO</span>
        </h1>
        <p style={S.sub}>The ultimate word guessing party game</p>

        <div style={S.teamsRow}>
          {state.teams.map((team, i) => (
            <div key={i} style={{ ...S.teamBox, borderColor: team.color }}>
              <label style={{ display: "block", color: team.color, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
                {i === 0 ? "🔴" : "🔵"} Team {i + 1}
              </label>
              <input
                style={{ width: "100%", background: "transparent", border: "none", borderBottom: `2px solid ${team.color}`, color: "#fff", fontSize: 18, fontWeight: 700, textAlign: "center", outline: "none", padding: "4px 0", boxSizing: "border-box" }}
                value={team.name} maxLength={16}
                onChange={e => actions.setTeamName(i, e.target.value)}
                placeholder={`Team ${i + 1}`}
              />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label style={S.setLabel}>⏱ Time per turn</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[30, 60, 90].map(d => (
                <button key={d} style={state.turnDuration === d ? S.optActive : S.opt} onClick={() => actions.setTurnDuration(d)}>{d}s</button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label style={S.setLabel}>🏆 Rounds</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[2, 3, 5].map(r => (
                <button key={r} style={state.totalRounds === r ? S.optActive : S.opt} onClick={() => actions.setTotalRounds(r)}>{r}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Custom cards toggle */}
        <div style={{ display: "flex", alignItems: "center", background: "#1a1a2e", borderRadius: 14, padding: "14px 16px", marginBottom: 12, gap: 12 }}>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ color: "#ddd", fontWeight: 700, fontSize: 14 }}>Include Custom Cards</div>
            <div style={{ color: "#555", fontSize: 12, marginTop: 2 }}>
              {cc === 0 ? "No custom cards yet" : `${cc} custom card${cc > 1 ? "s" : ""} saved`}
            </div>
          </div>
          <div
            onClick={actions.toggleCustom}
            style={{ width: 52, height: 28, borderRadius: 999, background: state.includeCustomCards ? "#FF3366" : "#333", cursor: "pointer", position: "relative", transition: "background 0.3s", flexShrink: 0 }}
          >
            <div style={{ position: "absolute", top: 3, left: state.includeCustomCards ? 27 : 3, width: 22, height: 22, borderRadius: "50%", background: "#fff", transition: "left 0.3s" }} />
          </div>
        </div>

        <button style={S.mgBtn} onClick={actions.openManager}>
          ✏️ Manage Cards {cc > 0 ? `(${cc} custom)` : ""}
        </button>

        <button style={S.startBtn} onClick={actions.startGame}>START GAME →</button>
      </div>
    </div>
  );
}

// ============================================================
// 9. Turn Start Screen
// ============================================================
function TurnStartScreen({ state, activeTeam, actions }) {
  return (
    <div style={{ ...S.screen, background: activeTeam.color }}>
      <div style={{ textAlign: "center", maxWidth: 400, width: "100%", padding: 32 }}>
        <div style={{ background: "rgba(0,0,0,0.3)", color: "#fff", borderRadius: 999, padding: "6px 20px", fontSize: 13, fontWeight: 700, display: "inline-block", marginBottom: 24 }}>
          Round {state.round} / {state.totalRounds}
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 32 }}>
          {state.teams.map(t => (
            <div key={t.id} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: t.id === activeTeam.id ? "#fff" : "rgba(255,255,255,0.4)" }}>{t.score}</div>
              <div style={{ color: t.id === activeTeam.id ? "#fff" : "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: 14 }}>{t.name}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 20, padding: "24px 16px", marginBottom: 32 }}>
          <span style={{ fontSize: 48 }}>{state.activeTeamIndex === 0 ? "🔴" : "🔵"}</span>
          <div style={{ color: "#fff", fontSize: 28, fontWeight: 900, marginTop: 8 }}>{activeTeam.name}'s Turn!</div>
          <p style={{ color: "rgba(255,255,255,0.75)", marginTop: 8, fontSize: 14 }}>Hand the device to your describer</p>
        </div>
        <button style={{ width: "100%", padding: "20px", background: "rgba(0,0,0,0.4)", border: "3px solid rgba(255,255,255,0.4)", borderRadius: 20, color: "#fff", fontSize: 22, fontWeight: 900, cursor: "pointer", letterSpacing: 2 }} onClick={actions.beginTurn}>
          ⚡ BEGIN TURN
        </button>
      </div>
    </div>
  );
}

// ============================================================
// 10. Playing Screen
// ============================================================
function PlayingScreen({ state, currentCard, activeTeam, actions }) {
  const pct = state.timeLeft / state.turnDuration;
  const barColor = pct > 0.5 ? "#00E676" : pct > 0.25 ? "#FFD600" : "#FF3D00";
  const [bump, setBump] = useState(false);

  const act = fn => { setBump(true); setTimeout(() => setBump(false), 150); fn(); };

  return (
    <div style={{ ...S.screen, background: "#0a0a0f", padding: 16, paddingBottom: 110, flexDirection: "column" }}>
      <FloatingTimer timeLeft={state.timeLeft} turnDuration={state.turnDuration} />

      {/* Score bar */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, width: "100%", maxWidth: 480, alignItems: "center", flexWrap: "wrap" }}>
        {state.teams.map(t => (
          <div key={t.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", background: t.color + "22", border: `2px solid ${t.color}`, borderRadius: 12, padding: "6px 16px", minWidth: 60 }}>
            <span style={{ color: t.color, fontWeight: 900, fontSize: 20 }}>{t.score}</span>
            <span style={{ color: "#aaa", fontSize: 11 }}>{t.name}</span>
          </div>
        ))}
        <div style={{ flex: 1, height: 6, background: "#1e1e2e", borderRadius: 999, overflow: "hidden", minWidth: 60 }}>
          <div style={{ height: "100%", background: barColor, width: `${pct * 100}%`, borderRadius: 999, transition: "width 1s linear, background 0.3s" }} />
        </div>
      </div>

      {/* Card */}
      <div style={{
        background: "#13131f", border: `3px solid ${activeTeam.color}`,
        borderRadius: 24, padding: "28px 24px", width: "100%", maxWidth: 480,
        marginBottom: 20, position: "relative",
        transform: bump ? "scale(0.97)" : "scale(1)",
        transition: "transform 0.15s ease",
      }}>
        <div style={{ position: "absolute", top: -14, left: 20, background: activeTeam.color, borderRadius: 999, padding: "4px 16px", fontSize: 12, fontWeight: 700, color: "#fff" }}>
          {activeTeam.name}
        </div>
        {currentCard?.isCustom && (
          <div style={{ position: "absolute", top: -14, right: 20, background: "#7C3AED", borderRadius: 999, padding: "4px 12px", fontSize: 11, fontWeight: 700, color: "#fff" }}>
            ✨ CUSTOM
          </div>
        )}
        <div style={{ fontSize: 44, fontWeight: 900, color: "#fff", textAlign: "center", letterSpacing: -1, marginBottom: 16, textTransform: "uppercase", fontFamily: "Impact, Arial Black, sans-serif" }}>
          {currentCard?.targetWord}
        </div>
        <div style={{ height: 2, background: "#2a2a3f", marginBottom: 16 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {currentCard?.forbiddenWords.map((w, i) => (
            <div key={i} style={{ color: "#ff6b6b", fontWeight: 700, fontSize: 16, background: "#2a1a1a", borderRadius: 10, padding: "8px 14px", textTransform: "uppercase", letterSpacing: 1 }}>
              🚫 {w}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 12, width: "100%", maxWidth: 480, marginBottom: 12 }}>
        <button style={{ flex: 1, padding: "18px 8px", borderRadius: 16, border: "2px solid #333", background: "#1a1a2e", color: "#aaa", fontWeight: 900, fontSize: 14, cursor: "pointer" }}
          onClick={() => act(actions.pass)}>PASS</button>
        <button style={{ flex: 1, padding: "18px 8px", borderRadius: 16, border: "none", background: "#00C853", color: "#fff", fontWeight: 900, fontSize: 30, cursor: "pointer" }}
          onClick={() => act(actions.correct)}>✓</button>
        <button style={{ flex: 1, padding: "18px 8px", borderRadius: 16, border: "2px solid #FF3D00", background: "#1a1a2e", color: "#FF3D00", fontWeight: 900, fontSize: 13, cursor: "pointer" }}
          onClick={() => act(actions.taboo)}>TABOO ✗</button>
      </div>
      <button style={{ background: "transparent", border: "none", color: "#444", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}
        onClick={actions.endTurn}>End Turn Early</button>
    </div>
  );
}

// ============================================================
// 11. Turn End Screen
// ============================================================
function TurnEndScreen({ state, activeTeam, actions }) {
  const correct = state.turnHistory.filter(h => h.result === "correct").length;
  const taboos  = state.turnHistory.filter(h => h.result === "taboo").length;
  const passes  = state.turnHistory.filter(h => h.result === "pass").length;
  const isLast  = state.round >= state.totalRounds && state.activeTeamIndex === state.teams.length - 1;

  return (
    <div style={{ ...S.screen, background: "#0a0a0f" }}>
      <div style={S.endCard}>
        <h2 style={{ color: activeTeam.color, fontSize: 22, fontWeight: 900, margin: "0 0 20px", textAlign: "center" }}>
          Turn Summary
        </h2>
        <div style={{ display: "flex", justifyContent: "space-around", background: "#0a0a0f", borderRadius: 16, padding: "20px 8px", marginBottom: 20 }}>
          {[
            { icon: "✅", val: correct, label: "Correct",  color: "#00E676" },
            { icon: "🚫", val: taboos,  label: "Taboo",    color: "#FF3D00" },
            { icon: "⏭️", val: passes,  label: "Passed",   color: "#FFD600" },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 30 }}>{s.icon}</span>
              <span style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.val}</span>
              <span style={{ color: "#aaa", fontSize: 12 }}>{s.label}</span>
            </div>
          ))}
        </div>
        <div style={{ maxHeight: 160, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
          {state.turnHistory.map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", background: "#0d0d1a", borderRadius: 8, padding: "8px 12px", fontSize: 14, fontWeight: 600 }}>
              <span style={{ color: h.result === "correct" ? "#00E676" : h.result === "taboo" ? "#FF3D00" : "#555" }}>
                {h.result === "correct" ? "✓" : h.result === "taboo" ? "✗" : "→"}
              </span>
              <span style={{ color: "#ddd", marginLeft: 10 }}>{h.word}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 20 }}>
          {state.teams.map(t => (
            <div key={t.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ color: t.color, fontWeight: 900, fontSize: 26 }}>{t.score}</span>
              <span style={{ color: "#aaa", fontSize: 13 }}>{t.name}</span>
            </div>
          ))}
        </div>
        <button style={{ ...S.startBtn, background: isLast ? "#FFD600" : activeTeam.color, color: isLast ? "#000" : "#fff" }} onClick={actions.nextTurn}>
          {isLast ? "🏆 FINAL RESULTS" : "NEXT TEAM →"}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// 12. Game Over Screen
// ============================================================
function GameOverScreen({ state, actions }) {
  const sorted = [...state.teams].sort((a, b) => b.score - a.score);
  const tie    = sorted[0].score === sorted[1].score;

  return (
    <div style={{ ...S.screen, background: "#0a0a0f" }}>
      <div style={{ ...S.endCard, textAlign: "center", maxWidth: 420 }}>
        <div style={{ fontSize: 80 }}>{tie ? "🤝" : "🏆"}</div>
        <h1 style={{ color: "#FFD600", fontSize: 32, fontWeight: 900, letterSpacing: 2, margin: "8px 0 4px" }}>
          {tie ? "IT'S A TIE!" : "WINNER!"}
        </h1>
        {!tie && <div style={{ fontSize: 22, fontWeight: 700, color: sorted[0].color, marginBottom: 24 }}>{sorted[0].name}</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          {sorted.map((t, i) => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, background: "#0d0d1a", borderRadius: 16, padding: "14px 20px", border: `2px solid ${t.color}` }}>
              <span style={{ fontSize: 24 }}>{i === 0 && !tie ? "🥇" : "🥈"}</span>
              <span style={{ color: t.color, fontWeight: 900, fontSize: 20, flex: 1 }}>{t.name}</span>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 28 }}>{t.score}</span>
            </div>
          ))}
        </div>
        <button style={S.startBtn} onClick={actions.reset}>🔄 PLAY AGAIN</button>
      </div>
    </div>
  );
}

// ============================================================
// 13. ROOT APP
// ============================================================
export default function TabooGame() {
  const { state, currentCard, activeTeam, updateCustomCards, actions } = useTabooLogic();

  if (state.phase === PHASE.CARD_MANAGER)
    return <CardCreator customCards={state.customCards} onUpdate={updateCustomCards} onClose={actions.closeManager} />;

  return (
    <>
      {state.phase === PHASE.SETUP      && <SetupScreen state={state} actions={actions} />}
      {state.phase === PHASE.TURN_START && <TurnStartScreen state={state} activeTeam={activeTeam} actions={actions} />}
      {state.phase === PHASE.PLAYING    && <PlayingScreen state={state} currentCard={currentCard} activeTeam={activeTeam} actions={actions} />}
      {state.phase === PHASE.TURN_END   && <TurnEndScreen state={state} activeTeam={activeTeam} actions={actions} />}
      {state.phase === PHASE.GAME_OVER  && <GameOverScreen state={state} actions={actions} />}
    </>
  );
}

// ============================================================
// 14. SHARED STYLES
// ============================================================
const S = {
  screen: {
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    background: "#0a0a0f", fontFamily: "'Segoe UI', system-ui, sans-serif",
    padding: 16, boxSizing: "border-box",
  },
  setupCard: {
    background: "#13131f", border: "1px solid #2a2a3f", borderRadius: 24,
    padding: "40px 32px", maxWidth: 480, width: "100%", textAlign: "center",
  },
  logo: { fontSize: 48, fontWeight: 900, letterSpacing: -1, margin: 0, fontFamily: "Impact, Arial Black, sans-serif" },
  sub: { color: "#888", fontSize: 14, marginTop: 4, marginBottom: 32 },
  teamsRow: { display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" },
  teamBox: { flex: 1, minWidth: 140, border: "2px solid", borderRadius: 16, padding: "16px 12px", background: "#1a1a2e" },
  setLabel: { display: "block", color: "#aaa", fontSize: 13, fontWeight: 600, marginBottom: 10 },
  opt: { flex: 1, padding: "8px 4px", background: "#1a1a2e", border: "2px solid #333", borderRadius: 10, color: "#aaa", fontWeight: 700, cursor: "pointer", fontSize: 14 },
  optActive: { flex: 1, padding: "8px 4px", background: "#FF3366", border: "2px solid #FF3366", borderRadius: 10, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 },
  mgBtn: { width: "100%", padding: "13px", background: "transparent", border: "2px solid #333", borderRadius: 14, color: "#aaa", fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 12 },
  startBtn: { width: "100%", padding: "18px", background: "#FF3366", border: "none", borderRadius: 16, color: "#fff", fontSize: 20, fontWeight: 900, cursor: "pointer", letterSpacing: 1 },
  // Card Manager
  mgCard: { background: "#13131f", border: "1px solid #2a2a3f", borderRadius: 24, padding: "32px 28px", maxWidth: 480, width: "100%" },
  formBox: { background: "#0d0d1a", borderRadius: 16, padding: "20px 16px", marginBottom: 0 },
  fGroup: { marginBottom: 16 },
  fLabel: { display: "block", color: "#555", fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 8 },
  fInput: { width: "100%", background: "#1a1a2e", border: "2px solid #2a2a3f", borderRadius: 10, color: "#fff", fontSize: 16, fontWeight: 600, padding: "10px 14px", outline: "none", boxSizing: "border-box" },
  addBtn: { width: "100%", padding: "13px", background: "#FF3366", border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 900, cursor: "pointer" },
  cardRow: { display: "flex", alignItems: "center", background: "#0d0d1a", border: "1px solid #2a2a3f", borderRadius: 12, padding: "12px 14px", gap: 10 },
  // Turn End / Game Over shared
  endCard: { background: "#13131f", border: "1px solid #2a2a3f", borderRadius: 24, padding: "36px 28px", maxWidth: 440, width: "100%" },
};
