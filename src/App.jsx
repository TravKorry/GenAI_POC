import { useState, createContext, useContext } from "react";

/* ── Light theme (teal + peach) ── */
const LIGHT = {
  navBg:          "#1A3C40",
  navText:        "#fff",
  accent:         "#2EC4B6",
  accentDark:     "#1B9E93",
  accentLight:    "#D9F5F2",
  peach:          "#F4C7AB",
  peachLight:     "#FDF0E6",
  peachDark:      "#D4956A",
  pageBg:         "#FDF0E6",
  cardBg:         "#fff",
  border:         "#E8D5C4",
  borderLight:    "#F0E0D0",
  textPrimary:    "#1A3C40",
  textSecondary:  "#5A7A6F",
  textMuted:      "#9BAEA6",
  hoverRow:       "#E8F5F3",
  altRow:         "#FBF6F1",
  agentMsgBg:     "#D9F5F2",
  customerMsgBg:  "#fff",
  summaryBannerBg:"#D9F5F2",
  summaryBannerBd:"#B2E5DF",
  inputBg:        "#fff",
};

/* ── Dark theme (same character, inverted) ── */
const DARK = {
  navBg:          "#0D1F22",
  navText:        "#E0E0E0",
  accent:         "#2EC4B6",
  accentDark:     "#3DD9CB",
  accentLight:    "#15332F",
  peach:          "#F4C7AB",
  peachLight:     "#2A1F18",
  peachDark:      "#E8A97A",
  pageBg:         "#111B1D",
  cardBg:         "#182628",
  border:         "#2A3D3F",
  borderLight:    "#223335",
  textPrimary:    "#E8EEEC",
  textSecondary:  "#9BB5AE",
  textMuted:      "#5E7D75",
  hoverRow:       "#1A3330",
  altRow:         "#152123",
  agentMsgBg:     "#15332F",
  customerMsgBg:  "#182628",
  summaryBannerBg:"#15332F",
  summaryBannerBd:"#2A4A44",
  inputBg:        "#152123",
};

const ThemeCtx = createContext(LIGHT);

const MOCK_REQUESTS = [
  {
    id: "CS-1041",
    subject: "Unable to process payment on checkout",
    customer: "Elena Marchetti",
    email: "elena.m@helix.io",
    priority: "HIGH",
    status: "Open",
    channel: "Email",
    assignee: "James K.",
    created: "2026-03-09T08:12:00",
    updated: "2026-03-09T09:45:00",
    category: "Billing",
    summary:
      "Customer reports recurring payment failures when attempting to complete checkout with a Visa card ending in 4821. The issue has persisted across multiple browsers. Stripe logs show a soft decline (insufficient_funds), but the customer confirms available balance. Likely a card network hold — recommended next step is to ask the customer to contact their issuing bank or try an alternate payment method.",
    messages: [
      { from: "Elena Marchetti", time: "08:12 AM", body: "Hi, I've been trying to complete my order for the last 2 hours but my card keeps getting declined. I have plenty of funds. Can you help?" },
      { from: "James K.", time: "08:30 AM", body: "Hi Elena, I can see the decline codes on our end. It looks like your bank is placing a temporary hold. Could you try a different card or contact your bank?" },
      { from: "Elena Marchetti", time: "09:45 AM", body: "I called my bank and they said there's no hold on their end. Still can't pay." },
    ],
  },
  {
    id: "CS-1040",
    subject: "Feature request: dark mode for dashboard",
    customer: "Tomás Herrera",
    email: "tomas.h@stackbyte.com",
    priority: "LOW",
    status: "Open",
    channel: "Chat",
    assignee: "Priya S.",
    created: "2026-03-08T16:40:00",
    updated: "2026-03-08T17:05:00",
    category: "Feature Request",
    summary:
      "Customer is requesting a dark mode toggle for the main analytics dashboard. They mention eye strain during extended use. This is the 14th request for dark mode this quarter. Product team has it on the Q3 roadmap — advised the customer it's under consideration and logged their vote.",
    messages: [
      { from: "Tomás Herrera", time: "4:40 PM", body: "Love the product but I really need a dark mode option. I spend 6+ hours a day on the dashboard and the bright white is rough." },
      { from: "Priya S.", time: "5:05 PM", body: "Thanks Tomás! Great feedback. I've logged your request — dark mode is actively being considered by our product team." },
    ],
  },
  {
    id: "CS-1039",
    subject: "Account locked after password reset",
    customer: "Aisha Nkomo",
    email: "aisha.n@coreline.co",
    priority: "CRITICAL",
    status: "In Progress",
    channel: "Phone",
    assignee: "James K.",
    created: "2026-03-08T11:22:00",
    updated: "2026-03-09T07:30:00",
    category: "Account Access",
    summary:
      "Customer triggered a password reset but the new credentials aren't being accepted. Auth logs show the reset token was consumed successfully, but subsequent login attempts fail with 'account_locked' — likely triggered by the 5-attempt lockout policy before the reset took effect. Engineering has been looped in to manually clear the lockout flag. ETA: 2 hours.",
    messages: [
      { from: "Aisha Nkomo", time: "11:22 AM", body: "I reset my password but now I can't log in at all. It says my account is locked. I need access urgently for a client demo today." },
      { from: "James K.", time: "11:40 AM", body: "Aisha, I've escalated this to our engineering team. It looks like a lockout was triggered before the reset completed. We're working on it — I'll keep you posted." },
      { from: "James K.", time: "7:30 AM (next day)", body: "Update: Engineering is clearing the lockout flag now. You should have access within 2 hours." },
    ],
  },
  {
    id: "CS-1038",
    subject: "Data export missing last 30 days",
    customer: "Raj Patel",
    email: "raj.p@novaedge.in",
    priority: "MEDIUM",
    status: "Resolved",
    channel: "Email",
    assignee: "Priya S.",
    created: "2026-03-07T09:15:00",
    updated: "2026-03-08T14:00:00",
    category: "Data & Reports",
    summary:
      "Customer exported their analytics data but the CSV only contained records through Feb 6. Root cause identified: a timezone mismatch in the export filter was truncating the date range. Fix deployed in v2.14.3 patch. Customer confirmed the re-export now includes all expected records.",
    messages: [
      { from: "Raj Patel", time: "9:15 AM", body: "My data export is missing everything from the last month. I need this for a board report by Friday." },
      { from: "Priya S.", time: "10:00 AM", body: "Hi Raj, I can reproduce this — it's a bug on our end with timezone handling. I've flagged it as urgent with engineering." },
      { from: "Priya S.", time: "2:00 PM (next day)", body: "Good news — the fix is live. Please try your export again and let me know if it looks complete." },
      { from: "Raj Patel", time: "2:30 PM", body: "Confirmed, all data is there now. Thanks for the quick turnaround." },
    ],
  },
  {
    id: "CS-1037",
    subject: "Webhook delivery failures since Tuesday",
    customer: "Lin Wei",
    email: "lin.w@apexflow.dev",
    priority: "HIGH",
    status: "In Progress",
    channel: "Email",
    assignee: "Marcus R.",
    created: "2026-03-06T13:50:00",
    updated: "2026-03-09T06:10:00",
    category: "Integrations",
    summary:
      "Customer reports that webhook deliveries to their endpoint have been failing intermittently since March 4. Our logs confirm a spike in 503 responses from their endpoint, but the customer says their server is healthy. Investigating whether our retry logic is overwhelming their rate limiter.",
    messages: [
      { from: "Lin Wei", time: "1:50 PM", body: "Our webhook ingestion pipeline is missing events. We're seeing gaps in our data since Tuesday. Is there an issue on your end?" },
      { from: "Marcus R.", time: "2:15 PM", body: "Hi Lin, I can see delivery failures in our logs — your endpoint is returning 503s. Could you check your server's rate limiting config?" },
      { from: "Lin Wei", time: "3:00 PM", body: "Our infra team says the server is fine. Could it be a burst issue from your retry logic?" },
      { from: "Marcus R.", time: "6:10 AM (Mar 9)", body: "That's a good theory. I'm pulling our retry cadence data now. Let's compare logs — can you share your access logs for March 4-6?" },
    ],
  },
  {
    id: "CS-1036",
    subject: "Billing discrepancy on March invoice",
    customer: "Sofia Andersen",
    email: "sofia.a@brightvine.eu",
    priority: "MEDIUM",
    status: "Resolved",
    channel: "Chat",
    assignee: "James K.",
    created: "2026-03-05T10:30:00",
    updated: "2026-03-06T16:20:00",
    category: "Billing",
    summary:
      "Customer was charged for 85 seats but only has 72 active users. Investigation revealed 13 deactivated users were not removed from the billing roster due to a sync delay. A prorated credit of $247.00 was issued and the roster has been corrected.",
    messages: [
      { from: "Sofia Andersen", time: "10:30 AM", body: "My March invoice shows 85 seats but we only have 72 people. Can you look into this?" },
      { from: "James K.", time: "11:00 AM", body: "Hi Sofia, you're right — I can see the mismatch. It looks like some deactivated users weren't removed from billing. I'm issuing a credit now." },
      { from: "James K.", time: "4:20 PM (next day)", body: "A credit of $247.00 has been applied to your account. Your roster is now showing 72 seats correctly." },
    ],
  },
];

function getPriorityColors(T) {
  return {
    CRITICAL: { bg: "#3A1A1A", text: "#FF6B6B", border: "#5C2A2A" },
    HIGH:     { bg: "#3A2A1A", text: "#FFB06B", border: "#5C3A2A" },
    MEDIUM:   { bg: "#3A351A", text: "#FFD76B", border: "#5C4A2A" },
    LOW:      { bg: T.accentLight, text: T.accentDark, border: "#2A4A44" },
  };
}

function getPriorityColorsLight(T) {
  return {
    CRITICAL: { bg: "#FDECEA", text: "#B71C1C", border: "#E57373" },
    HIGH:     { bg: "#FFF3E0", text: "#C65100", border: "#FFB74D" },
    MEDIUM:   { bg: "#FFF8E1", text: "#E6A117", border: "#FFD54F" },
    LOW:      { bg: T.accentLight, text: T.accentDark, border: "#81D8CF" },
  };
}

function getStatusColors(T, isDark) {
  if (isDark) {
    return {
      "Open":        { bg: T.accentLight, text: T.accentDark, border: "#2A4A44" },
      "In Progress": { bg: "#2A2018", text: T.peachDark, border: "#4A3528" },
      "Resolved":    { bg: "#1A2E1A", text: "#6BCB77", border: "#2A4A2A" },
    };
  }
  return {
    "Open":        { bg: T.accentLight, text: T.accentDark, border: "#9FE0D9" },
    "In Progress": { bg: "#FFF0E0", text: T.peachDark, border: T.peach },
    "Resolved":    { bg: "#E8F5E9", text: "#2E7D32", border: "#81C784" },
  };
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function Tag({ label, colors }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: "3px",
      fontSize: "12px",
      fontWeight: 600,
      background: colors.bg,
      color: colors.text,
      border: `1px solid ${colors.border}`,
      lineHeight: "20px",
    }}>
      {label}
    </span>
  );
}

function KPICard({ label, value, color, icon }) {
  const T = useContext(ThemeCtx);
  return (
    <div style={{
      background: T.cardBg,
      border: `1px solid ${T.border}`,
      borderRadius: "6px",
      padding: "16px 20px",
      flex: 1,
      minWidth: 140,
      borderTop: `3px solid ${color}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: "14px" }}>{icon}</span>
        <span style={{ fontSize: "12px", color: T.textSecondary, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</span>
      </div>
      <div style={{ fontSize: "28px", fontWeight: 700, color: color }}>{value}</div>
    </div>
  );
}

function RecordDetail({ req, onBack, priorityColors, statusColors }) {
  const T = useContext(ThemeCtx);
  const [tab, setTab] = useState("summary");

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{
        background: T.cardBg,
        borderBottom: `1px solid ${T.border}`,
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <button onClick={onBack} style={{
          background: "none", border: `1px solid ${T.border}`, borderRadius: "4px",
          padding: "5px 12px", cursor: "pointer", fontSize: "13px", color: T.accent,
          fontWeight: 500, display: "flex", alignItems: "center", gap: 4,
        }}>
          ← Back to List
        </button>
        <span style={{ color: T.textMuted, fontSize: "13px" }}>|</span>
        <span style={{ fontSize: "13px", color: T.textSecondary }}>{req.id}</span>
      </div>

      <div style={{
        background: T.cardBg,
        borderBottom: `1px solid ${T.border}`,
        padding: "20px 24px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 600, color: T.textPrimary }}>{req.subject}</h2>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Tag label={req.priority} colors={priorityColors[req.priority]} />
              <Tag label={req.status} colors={statusColors[req.status]} />
              <span style={{ fontSize: "12px", color: T.textMuted, marginLeft: 4 }}>Opened {formatDate(req.created)}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{
              background: T.accent, color: "#fff", border: "none", borderRadius: "4px",
              padding: "8px 16px", fontSize: "13px", fontWeight: 500, cursor: "pointer",
            }}>
              Edit Request
            </button>
            <button style={{
              background: "transparent", color: T.accent, border: `1px solid ${T.accent}`, borderRadius: "4px",
              padding: "8px 16px", fontSize: "13px", fontWeight: 500, cursor: "pointer",
            }}>
              Reassign
            </button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", background: T.pageBg }}>
        <div style={{ display: "flex", gap: 16, padding: "20px 24px", alignItems: "flex-start" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{
              background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: "6px", overflow: "hidden",
            }}>
              <div style={{ display: "flex", borderBottom: `1px solid ${T.border}` }}>
                {["summary", "conversation", "activity"].map((t) => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    padding: "12px 20px",
                    background: "none",
                    border: "none",
                    borderBottom: tab === t ? `2px solid ${T.accent}` : "2px solid transparent",
                    color: tab === t ? T.accent : T.textSecondary,
                    fontSize: "13px",
                    fontWeight: tab === t ? 600 : 400,
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}>
                    {t}
                  </button>
                ))}
              </div>
              <div style={{ padding: "20px" }}>
                {tab === "summary" && (
                  <div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6, marginBottom: 12,
                      padding: "8px 12px", background: T.summaryBannerBg, borderRadius: "4px", border: `1px solid ${T.summaryBannerBd}`,
                    }}>
                      <span style={{ fontSize: "14px" }}>✦</span>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: T.accentDark }}>AI-Generated Summary</span>
                    </div>
                    <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.7, color: T.textPrimary }}>{req.summary}</p>
                  </div>
                )}
                {tab === "conversation" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {req.messages.map((msg, i) => {
                      const isAgent = msg.from !== req.customer;
                      return (
                        <div key={i} style={{
                          padding: "12px 16px",
                          background: isAgent ? T.agentMsgBg : T.customerMsgBg,
                          border: `1px solid ${T.border}`,
                          borderRadius: "6px",
                          borderLeft: isAgent ? `3px solid ${T.accent}` : `3px solid ${T.border}`,
                        }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                            <span style={{ fontSize: "13px", fontWeight: 600, color: isAgent ? T.accentDark : T.textPrimary }}>{msg.from}</span>
                            <span style={{ fontSize: "11px", color: T.textMuted }}>{msg.time}</span>
                          </div>
                          <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.6, color: T.textPrimary }}>{msg.body}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
                {tab === "activity" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { time: formatDate(req.created), event: "Request created", by: req.customer },
                      { time: formatDate(req.created), event: `Assigned to ${req.assignee}`, by: "System" },
                      { time: formatDate(req.updated), event: "Last updated", by: req.assignee },
                    ].map((evt, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{
                          width: 8, height: 8, borderRadius: "50%", background: T.accent,
                          marginTop: 5, flexShrink: 0,
                        }} />
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 500, color: T.textPrimary }}>{evt.event}</div>
                          <div style={{ fontSize: "12px", color: T.textMuted }}>{evt.time} · {evt.by}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{
            width: 280, minWidth: 280,
            background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: "6px",
          }}>
            <div style={{
              padding: "12px 16px", borderBottom: `1px solid ${T.border}`,
              fontSize: "13px", fontWeight: 600, color: T.textPrimary,
            }}>
              Request Details
            </div>
            {[
              { label: "Customer", value: req.customer },
              { label: "Email", value: req.email },
              { label: "Channel", value: req.channel },
              { label: "Assignee", value: req.assignee },
              { label: "Category", value: req.category },
              { label: "Created", value: formatDate(req.created) },
              { label: "Last Updated", value: timeAgo(req.updated) },
            ].map((field) => (
              <div key={field.label} style={{
                padding: "10px 16px", borderBottom: `1px solid ${T.borderLight}`,
              }}>
                <div style={{ fontSize: "11px", color: T.textMuted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>
                  {field.label}
                </div>
                <div style={{ fontSize: "13px", color: T.textPrimary }}>{field.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const NAV_SECTIONS = [
  { label: "CASES", items: ["Dashboard", "My Cases", "Overdue", "All Cases"] },
  { label: "RESOURCES", items: ["Knowledge Base", "Training", "Help Needed"] },
];

function VerticalNav({ activeItem }) {
  const T = useContext(ThemeCtx);
  return (
    <div style={{
      width: 180, minWidth: 180, background: T.cardBg, borderRight: `1px solid ${T.border}`,
      padding: "16px 0", overflowY: "auto", flexShrink: 0,
    }}>
      {NAV_SECTIONS.map((section) => (
        <div key={section.label} style={{ marginBottom: 16 }}>
          <div style={{
            padding: "0 16px", marginBottom: 6,
            fontSize: "11px", fontWeight: 700, color: T.peachDark,
            textTransform: "uppercase", letterSpacing: "0.5px",
          }}>
            {section.label}
          </div>
          {section.items.map((item) => {
            const isActive = item === activeItem;
            return (
              <div key={item} style={{
                padding: "7px 16px",
                fontSize: "13px",
                color: isActive ? T.accentDark : T.textPrimary,
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                background: isActive ? T.accentLight : "transparent",
                borderLeft: isActive ? `3px solid ${T.peach}` : "3px solid transparent",
                transition: "all 0.1s",
              }}>
                {item}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function TopNav({ showPortalLabel, isDark, onToggle }) {
  const T = useContext(ThemeCtx);
  return (
    <div style={{
      height: 48, background: T.navBg, display: "flex", alignItems: "center", padding: "0 20px", gap: 20,
      color: T.navText, flexShrink: 0,
    }}>
      <span style={{ fontWeight: 700, fontSize: "14px", letterSpacing: "0.3px", marginRight: 8 }}>Customer Service</span>
      {["HOME", "MY TASKS", "CASES"].map((item) => (
        <span key={item} style={{
          fontSize: "12px",
          fontWeight: item === "CASES" ? 700 : 400,
          padding: "4px 0",
          borderBottom: item === "CASES" ? `2px solid ${T.accent}` : "2px solid transparent",
          cursor: "pointer",
          letterSpacing: "0.5px",
        }}>
          {item}
        </span>
      ))}
      <div style={{ flex: 1 }} />
      {/* Dark mode toggle */}
      <button
        onClick={onToggle}
        style={{
          background: isDark ? T.accent : "rgba(255,255,255,0.15)",
          border: "none",
          borderRadius: "20px",
          padding: "5px 14px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: "12px",
          color: isDark ? "#0D1F22" : "#fff",
          fontWeight: 600,
          transition: "all 0.2s",
        }}
      >
        {isDark ? "☀︎ Light" : "☾ Dark"}
      </button>
      {showPortalLabel && (
        <span style={{ fontSize: "12px", opacity: 0.7 }}>Support Agent Portal</span>
      )}
    </div>
  );
}

export default function AppianServiceTracker() {
  const [isDark, setIsDark] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [search, setSearch] = useState("");
  const [sortCol, setSortCol] = useState("updated");
  const [sortDir, setSortDir] = useState("desc");

  const T = isDark ? DARK : LIGHT;
  const pColors = isDark ? getPriorityColors(T) : getPriorityColorsLight(T);
  const sColors = getStatusColors(T, isDark);

  const filtered = MOCK_REQUESTS
    .filter((r) => {
      if (filterStatus !== "all" && r.status !== filterStatus) return false;
      if (filterPriority !== "all" && r.priority !== filterPriority) return false;
      if (search && !r.subject.toLowerCase().includes(search.toLowerCase()) && !r.customer.toLowerCase().includes(search.toLowerCase()) && !r.id.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      let av, bv;
      if (sortCol === "updated") { av = new Date(a.updated); bv = new Date(b.updated); }
      else if (sortCol === "id") { av = a.id; bv = b.id; }
      else if (sortCol === "subject") { av = a.subject; bv = b.subject; }
      else if (sortCol === "customer") { av = a.customer; bv = b.customer; }
      else { av = a[sortCol]; bv = b[sortCol]; }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const counts = {
    total: MOCK_REQUESTS.length,
    open: MOCK_REQUESTS.filter((r) => r.status === "Open").length,
    inProgress: MOCK_REQUESTS.filter((r) => r.status === "In Progress").length,
    resolved: MOCK_REQUESTS.filter((r) => r.status === "Resolved").length,
  };

  const selectedReq = MOCK_REQUESTS.find((r) => r.id === selected);

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const SortHeader = ({ col, label, style }) => (
    <th onClick={() => handleSort(col)} style={{
      ...style,
      padding: "10px 12px",
      textAlign: "left",
      fontSize: "12px",
      fontWeight: 600,
      color: T.textSecondary,
      textTransform: "uppercase",
      letterSpacing: "0.3px",
      cursor: "pointer",
      userSelect: "none",
      borderBottom: `2px solid ${T.border}`,
      background: T.altRow,
      whiteSpace: "nowrap",
    }}>
      {label} {sortCol === col ? (sortDir === "asc" ? "▲" : "▼") : ""}
    </th>
  );

  if (selectedReq) {
    return (
      <ThemeCtx.Provider value={T}>
        <div style={{
          width: "100%", minHeight: "100vh",
          fontFamily: "'Open Sans', 'Segoe UI', system-ui, sans-serif",
          background: T.pageBg,
          display: "flex", flexDirection: "column",
          transition: "background 0.3s, color 0.3s",
        }}>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <TopNav isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            <VerticalNav activeItem="My Cases" />
            <RecordDetail req={selectedReq} onBack={() => setSelected(null)} priorityColors={pColors} statusColors={sColors} />
          </div>
        </div>
      </ThemeCtx.Provider>
    );
  }

  return (
    <ThemeCtx.Provider value={T}>
      <div style={{
        width: "100%", minHeight: "100vh",
        fontFamily: "'Open Sans', 'Segoe UI', system-ui, sans-serif",
        background: T.pageBg,
        transition: "background 0.3s, color 0.3s",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

        <TopNav showPortalLabel isDark={isDark} onToggle={() => setIsDark(!isDark)} />

        {/* Breadcrumb */}
        <div style={{
          background: T.cardBg, borderBottom: `1px solid ${T.border}`, padding: "10px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          transition: "background 0.3s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "13px", color: T.textMuted }}>
            <span style={{ color: T.accent, cursor: "pointer" }}>Cases</span>
            <span>/</span>
            <span style={{ color: T.textPrimary, fontWeight: 500 }}>Service Requests</span>
          </div>
          <button style={{
            background: T.accent, color: "#fff", border: "none", borderRadius: "4px",
            padding: "7px 16px", fontSize: "13px", fontWeight: 500, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            + New Request
          </button>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          <VerticalNav activeItem="My Cases" />

          <div style={{ flex: 1, padding: "20px 24px", overflow: "auto" }}>
            <h1 style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 600, color: T.textPrimary }}>
              Service Requests
            </h1>

            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <KPICard label="Total Requests" value={counts.total} color={T.textPrimary} icon="📋" />
              <KPICard label="Open" value={counts.open} color={T.accent} icon="🔵" />
              <KPICard label="In Progress" value={counts.inProgress} color={T.peachDark} icon="🟠" />
              <KPICard label="Resolved" value={counts.resolved} color={isDark ? "#6BCB77" : "#2E7D32"} icon="✅" />
            </div>

            <div style={{
              background: T.cardBg,
              border: `1px solid ${T.border}`,
              borderRadius: "6px",
              overflow: "hidden",
              transition: "background 0.3s",
            }}>
              {/* Toolbar */}
              <div style={{
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                borderBottom: `1px solid ${T.border}`,
                background: T.altRow,
                flexWrap: "wrap",
              }}>
                <div style={{ position: "relative", flex: 1, minWidth: 150, maxWidth: 300 }}>
                  <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: "14px", color: T.textMuted }}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      width: "100%", padding: "7px 12px 7px 32px", border: `1px solid ${T.border}`,
                      borderRadius: "4px", fontSize: "13px", outline: "none", fontFamily: "inherit",
                      background: T.inputBg, color: T.textPrimary,
                    }}
                  />
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{
                  padding: "7px 12px", border: `1px solid ${T.border}`, borderRadius: "4px",
                  fontSize: "13px", fontFamily: "inherit", background: T.inputBg, cursor: "pointer", color: T.textPrimary,
                }}>
                  <option value="all">All Status</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} style={{
                  padding: "7px 12px", border: `1px solid ${T.border}`, borderRadius: "4px",
                  fontSize: "13px", fontFamily: "inherit", background: T.inputBg, cursor: "pointer", color: T.textPrimary,
                }}>
                  <option value="all">All Priority</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
                <span style={{ fontSize: "12px", color: T.textMuted }}>
                  {filtered.length} of {MOCK_REQUESTS.length} requests
                </span>
              </div>

              {/* Grid */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <SortHeader col="id" label="ID" style={{ width: 80 }} />
                      <SortHeader col="subject" label="Subject" />
                      <SortHeader col="customer" label="Customer" style={{ width: 150 }} />
                      <SortHeader col="assignee" label="Assignee" style={{ width: 120 }} />
                      <SortHeader col="priority" label="Priority" style={{ width: 100 }} />
                      <SortHeader col="status" label="Status" style={{ width: 110 }} />
                      <SortHeader col="updated" label="Updated" style={{ width: 100 }} />
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ padding: "40px 16px", textAlign: "center", color: T.textMuted, fontSize: "13px" }}>
                          No requests match your filters.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((req, idx) => (
                        <tr
                          key={req.id}
                          onClick={() => setSelected(req.id)}
                          style={{
                            cursor: "pointer",
                            background: idx % 2 === 0 ? T.cardBg : T.altRow,
                            borderBottom: `1px solid ${T.borderLight}`,
                            transition: "background 0.1s",
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = T.hoverRow}
                          onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? T.cardBg : T.altRow}
                        >
                          <td style={{ padding: "10px 12px", fontSize: "13px", color: T.accent, fontWeight: 500 }}>{req.id}</td>
                          <td style={{ padding: "10px 12px", fontSize: "13px", color: T.textPrimary }}>{req.subject}</td>
                          <td style={{ padding: "10px 12px", fontSize: "13px", color: T.textSecondary }}>{req.customer}</td>
                          <td style={{ padding: "10px 12px", fontSize: "13px", color: T.textSecondary }}>{req.assignee}</td>
                          <td style={{ padding: "10px 12px" }}><Tag label={req.priority} colors={pColors[req.priority]} /></td>
                          <td style={{ padding: "10px 12px" }}><Tag label={req.status} colors={sColors[req.status]} /></td>
                          <td style={{ padding: "10px 12px", fontSize: "12px", color: T.textMuted }}>{timeAgo(req.updated)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div style={{
                padding: "10px 16px",
                borderTop: `1px solid ${T.border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: T.altRow,
                fontSize: "12px",
                color: T.textMuted,
              }}>
                <span>Showing 1-{filtered.length} of {filtered.length}</span>
                <div style={{ display: "flex", gap: 4 }}>
                  {[1].map((p) => (
                    <button key={p} style={{
                      width: 28, height: 28, border: `1px solid ${T.accent}`, borderRadius: "4px",
                      background: T.accent, color: "#fff", fontSize: "12px", fontWeight: 600,
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}
