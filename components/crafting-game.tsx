"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, ZoomIn, ZoomOut, Ruler, Play } from "lucide-react";

/* ============ Types & helpers ============ */
type MaterialCard = {
  id: string;
  system: string;  // tên vật liệu/hệ
  faceA: string;   // sự kiện/phát minh
  faceB: string;   // năm/thời kỳ (text)
  stats: string[];
  fact: string;
  section: "Cổ đại" | "Công nghiệp" | "Hiện đại";
  yearStart: number | null;
};

type SlotCell = {
  card: Required<MaterialCard>;
  revealed: boolean; // đã lật (hiện năm)
  locked: boolean;   // anchor hoặc đã lật đúng
  owner?: number;    // đội đang giữ (khi chưa lật)
};

const HAND_CAPACITY = 4;

const fmtYear = (y: number | null) =>
  y == null ? "—" : y < 0 ? `${Math.abs(y)} TCN` : `${y} SCN`;

const shuffle = <T,>(a: T[]) => {
  const x = a.slice();
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
};

const ordinalVi = (n: number) =>
  n === 1 ? "Nhất" : n === 2 ? "Nhì" : n === 3 ? "Ba" : "Tư";

const clamp = (n: number, a: number, b: number) =>
  Math.max(a, Math.min(b, n));

function parseVNPeriodToYearStart(period: string): number | null {
  const s = period.trim();
  const mM = s.match(/~?\s*([\d.,]+)\s*triệu\s*năm\s*TCN/i);
  if (mM) {
    const v = parseFloat(mM[1].replace(",", "."));
    if (!isNaN(v)) return Math.round(-1 * v * 1_000_000);
  }
  const mB = s.match(/~?\s*([\d.,]+)\s*TCN/i);
  if (mB) {
    const v = parseFloat(mB[1].replace(",", ""));
    if (!isNaN(v)) return -Math.round(v);
  }
  const mC = s.match(/~?\s*([\d.,]+)\s*SCN/i);
  if (mC) {
    const v = parseFloat(mC[1].replace(",", ""));
    if (!isNaN(v)) return Math.round(v);
  }
  const mY = s.match(/^\s*~?\s*(-?\d{1,7})\s*$/);
  if (mY) return parseInt(mY[1], 10);
  const mR = s.match(/(-?\d{1,5})\s*[–-]\s*(-?\d{1,5})/);
  if (mR) return parseInt(mR[1], 10);
  return null;
}

/* ============ Deck data (đã thêm gia vị, uranium, …) ============ */
const RAW_DECK: MaterialCard[] = [
  // Phần I — Cổ đại
  { id:"stone-lomekwian", system:"Đá (Sơ khai)", faceA:"Công cụ Đá Lomekwian", faceB:"~3.3 triệu năm TCN", stats:["Công nghệ sơ khai","Săn bắn-Hái lượm"], fact:"Công cụ đá lâu đời nhất", section:"Cổ đại", yearStart: parseVNPeriodToYearStart("~3.3 triệu năm TCN") },
  { id:"stone-neolithic", system:"Đá (Cách mạng)", faceA:"Cách mạng Đồ đá Mới", faceB:"~10,000 TCN", stats:["Nông nghiệp","Định cư","Thặng dư"], fact:"Định cư + thặng dư", section:"Cổ đại", yearStart: parseVNPeriodToYearStart("~10,000 TCN") },
  { id:"bronze-alloy", system:"Đồng", faceA:"Hợp kim Đồng", faceB:"~3000 TCN", stats:["Thương mại quốc tế","Tầng lớp tinh hoa","Chiến tranh"], fact:"Đồng–thiếc", section:"Cổ đại", yearStart: parseVNPeriodToYearStart("~3000 TCN") },
  { id:"iron-near-east", system:"Sắt", faceA:"Luyện Sắt Cận Đông", faceB:"~1200 TCN", stats:["Phi tập trung hóa","Dân chủ hóa","Nông nghiệp"], fact:"Sắt phổ biến", section:"Cổ đại", yearStart: parseVNPeriodToYearStart("~1200 TCN") },
  { id:"salt-china", system:"Muối (TQ)", faceA:"Giếng khoan Muối Tứ Xuyên", faceB:"252 TCN", stats:["Bảo quản","Độc quyền","Thuế"], fact:"Nhà nước kiểm soát", section:"Cổ đại", yearStart: parseVNPeriodToYearStart("252 TCN") },
  { id:"silk-road", system:"Tơ lụa", faceA:"Khai mở Con đường Tơ lụa", faceB:"~138 TCN", stats:["Xa xỉ","Toàn cầu hóa","Độc quyền"], fact:"Trương Khiên", section:"Cổ đại", yearStart: parseVNPeriodToYearStart("~138 TCN") },
  { id:"paper-cai-lun", system:"Giấy", faceA:"Phát minh Giấy (Thái Luân)", faceB:"105 SCN", stats:["Thông tin","Hành chính","Chi phí thấp"], fact:"Phổ biến tri thức", section:"Cổ đại", yearStart: parseVNPeriodToYearStart("105 SCN") },
  { id:"roman-concrete-pantheon", system:"Bê tông", faceA:"Pantheon (La Mã)", faceB:"~128 SCN", stats:["Hạ tầng","Đô thị hóa","Quy mô"], fact:"Hợp nhất đế chế", section:"Cổ đại", yearStart: parseVNPeriodToYearStart("~128 SCN") },
  { id:"gunpowder", system:"Thuốc súng", faceA:"Phát minh Thuốc súng", faceB:"~850 SCN", stats:["Phá vỡ quân sự","Hết phong kiến"], fact:"Pháo khí", section:"Cổ đại", yearStart: parseVNPeriodToYearStart("~850 SCN") },

  // Phần II — Công nghiệp
  { id:"steam-newcomen", system:"Hơi nước", faceA:"Động cơ Newcomen", faceB:"1712", stats:["Mỏ than","Bơm nước"], fact:"Thực dụng", section:"Công nghiệp", yearStart: parseVNPeriodToYearStart("1712") },
  { id:"steam-watt", system:"Hơi nước", faceA:"Bằng sáng chế Watt", faceB:"1769", stats:["Hiệu quả","Đô thị hóa"], fact:"Ngưng tụ riêng", section:"Công nghiệp", yearStart: parseVNPeriodToYearStart("1769") },
  { id:"cotton-gin", system:"Bông", faceA:"Máy tách hạt Bông", faceB:"1783", stats:["Mass","Nô lệ"], fact:"Bỏ nút thắt", section:"Công nghiệp", yearStart: parseVNPeriodToYearStart("1783") },
  { id:"rubber-vulcanization", system:"Cao su", faceA:"Lưu hóa (Goodyear)", faceB:"1844", stats:["Vật liệu","Lốp"], fact:"Ổn định cao su", section:"Công nghiệp", yearStart: parseVNPeriodToYearStart("1844") },
  { id:"steel-bessemer", system:"Thép", faceA:"Quy trình Bessemer", faceB:"1855", stats:["Mass","Rẻ"], fact:"Đường sắt/nhà cao", section:"Công nghiệp", yearStart: parseVNPeriodToYearStart("1855") },
  { id:"petroleum-drake", system:"Dầu mỏ", faceA:"Giếng Drake", faceB:"1859", stats:["Năng lượng di động"], fact:"Kỷ nguyên dầu", section:"Công nghiệp", yearStart: parseVNPeriodToYearStart("1859") },
  { id:"aluminum-hall-heroult", system:"Nhôm", faceA:"Hall–Héroult", faceB:"1886", stats:["Điện phân","Nhẹ"], fact:"Hàng không", section:"Công nghiệp", yearStart: parseVNPeriodToYearStart("1886") },

  // Phần III — Hiện đại
  { id:"plastic-bakelite", system:"Nhựa", faceA:"Bakelite", faceB:"1907", stats:["Cách điện","Tiêu dùng"], fact:"Nhựa tổng hợp 1st", section:"Hiện đại", yearStart: parseVNPeriodToYearStart("1907") },
  { id:"semiconductor-transistor", system:"Chất bán dẫn", faceA:"Bóng bán dẫn", faceB:"1947", stats:["Thu nhỏ","KTS"], fact:"Vi mạch", section:"Hiện đại", yearStart: parseVNPeriodToYearStart("1947") },
  { id:"battery-liion", system:"Pin", faceA:"Li-ion thương mại", faceB:"1991", stats:["Mật độ năng lượng","Di động"], fact:"Cách mạng mobile", section:"Hiện đại", yearStart: parseVNPeriodToYearStart("1991") },

  // ===== Bổ sung theo yêu cầu =====
  { id:"spices-sea-route-india", system:"Gia vị", faceA:"Đường biển tới Ấn Độ (Vasco da Gama)", faceB:"1498", stats:["Thương mại gia vị","Đế quốc hải quân","Toàn cầu hóa"], fact:"Mở kỷ nguyên thương mại gia vị đường biển", section:"Công nghiệp", yearStart: parseVNPeriodToYearStart("1498") },
  { id:"uranium-cp1", system:"Uranium", faceA:"Chicago Pile-1 (CP-1)", faceB:"1942", stats:["Năng lượng hạt nhân","Vũ khí","Địa chính trị"], fact:"Phản ứng dây chuyền nhân tạo đầu tiên", section:"Hiện đại", yearStart: parseVNPeriodToYearStart("1942") },
  { id:"coal-coke-darby", system:"Than đá", faceA:"Cốc than của Darby (Coal→Coke)", faceB:"1709", stats:["Năng lượng","Luyện kim","Sản xuất"], fact:"Cốt lõi cho lò cao & CN hoá", section:"Công nghiệp", yearStart: parseVNPeriodToYearStart("1709") },
  { id:"cement-portland", system:"Xi măng Portland", faceA:"Bằng sáng chế Portland cement", faceB:"1824", stats:["Vật liệu xây dựng","Đô thị","Cơ sở hạ tầng"], fact:"Nền tảng xây dựng hiện đại", section:"Công nghiệp", yearStart: parseVNPeriodToYearStart("1824") },
  { id:"haber-bosch-ammonia", system:"Phân đạm", faceA:"Quy trình Haber–Bosch (NH₃)", faceB:"1909", stats:["Nông nghiệp","Dân số","Hoá học"], fact:"Phân bón tổng hợp nuôi sống tỷ người", section:"Hiện đại", yearStart: parseVNPeriodToYearStart("1909") },
  { id:"glass-float-pilkington", system:"Kính nổi", faceA:"Float glass Pilkington", faceB:"1959", stats:["Kiến trúc","Ô tô","Sản xuất chuẩn hoá"], fact:"Bề mặt phẳng/nhẵn quy mô lớn", section:"Hiện đại", yearStart: parseVNPeriodToYearStart("1959") },
  { id:"rare-earth-ndfeb", system:"Đất hiếm", faceA:"Nam châm NdFeB", faceB:"1982", stats:["Động cơ điện","Điện tử","Gió"], fact:"Nam châm mạnh cho công nghệ hiện đại", section:"Hiện đại", yearStart: parseVNPeriodToYearStart("1982") },
  { id:"song-paper-money", system:"Tiền giấy", faceA:"Tiền giấy nhà Tống", faceB:"1020 SCN", stats:["Tài chính","Lưu thông tiền tệ","Thương mại"], fact:"Tiền giấy đầu tiên quy mô nhà nước", section:"Cổ đại", yearStart: parseVNPeriodToYearStart("1020 SCN") },
];

/* ============ Timeline config (lá dài, chữ lớn) ============ */
const CHIP_W = 280;
const CHIP_H = 84;
const RAIL_Y = 170;
const CHIP_Y = 340;
const DOT_R  = 6;

const NUM_SLOTS   = 70;
const SLOT_GAP    = 56;
const SLOT_SPACING= CHIP_W + SLOT_GAP;
const TL_H        = 520;
const MARGIN_X    = 80;
const TL_W        = MARGIN_X * 2 + NUM_SLOTS * SLOT_SPACING;

const centerOf = (slot: number) => MARGIN_X + SLOT_SPACING * (slot + 0.5);

/* ==== Kích thước thẻ trên TAY ĐỘI (portrait) ==== */
const HAND_CARD_W = 170;
const HAND_CARD_H = 240;

/* ============ Slot helpers (nhường chỗ / kiểm tra) ============ */
function makeRoom(slots: (SlotCell | null)[], target: number): (SlotCell | null)[] | null {
  const n = slots.length;
  if (slots[target] === null) return slots.slice();
  let rightEmpty = -1, leftEmpty = -1;
  for (let j = target + 1; j < n; j++) { if (slots[j] === null) { rightEmpty = j; break; } }
  for (let j = target - 1; j >= 0; j--) { if (slots[j] === null) { leftEmpty = j; break; } }
  if (rightEmpty === -1 && leftEmpty === -1) return null;

  const newSlots = slots.slice();
  if (rightEmpty !== -1 && (leftEmpty === -1 || (rightEmpty - target) <= (target - leftEmpty))) {
    for (let k = rightEmpty - 1; k >= target; k--) newSlots[k + 1] = newSlots[k];
    newSlots[target] = null;
  } else {
    for (let k = leftEmpty; k < target; k++) newSlots[k] = newSlots[k + 1];
    newSlots[target] = null;
  }
  return newSlots;
}
function makeRoomWithVacancy(slots: (SlotCell | null)[], target: number, vacancyIndex: number): (SlotCell | null)[] | null {
  const tmp = slots.slice(); tmp[vacancyIndex] = null;
  return makeRoom(tmp, target);
}
function isIncreasingWithCandidate(slots: (SlotCell | null)[], candidateIndex: number) {
  let prev: number | null = null;
  for (let i = 0; i < slots.length; i++) {
    const s = slots[i];
    if (!s) continue;
    if (i !== candidateIndex && !s.revealed) continue;
    const y = s.card.yearStart as number;
    if (prev !== null && y <= prev) return false;
    prev = y;
  }
  return true;
}
const nearestSlotIndex = (baseX: number) =>
  clamp(Math.round((baseX - MARGIN_X) / SLOT_SPACING - 0.5), 0, NUM_SLOTS - 1);

/* ============ Scroll sync hook ============ */
function useScrollSync(vpRef: React.RefObject<HTMLDivElement>) {
  const [ratio, setRatio] = React.useState(0);
  React.useEffect(() => {
    const vp = vpRef.current; if (!vp) return;
    const onScroll = () => {
      const max = Math.max(1, vp.scrollWidth - vp.clientWidth);
      setRatio(vp.scrollLeft / max);
    };
    vp.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => vp.removeEventListener("scroll", onScroll);
  }, [vpRef]);
  const setByRatio = (r: number) => {
    const vp = vpRef.current; if (!vp) return;
    const max = Math.max(1, vp.scrollWidth - vp.clientWidth);
    vp.scrollLeft = clamp(r, 0, 1) * max;
  };
  return { ratio, setByRatio };
}

/* ============ Timeline board (slots cố định + scrollbar + zoom) ============ */
export type SlotBoardHandle = { scrollToSlot: (index: number) => void };

const SlotTimelineBoard = React.forwardRef(function SlotTimelineBoard(
  {
    slots, anchorId, currentOwner, canPlace, hoverSlot, setHoverSlot,
    onDropToSlot, onFlip, zoom,
  }: {
    slots: (SlotCell | null)[];
    anchorId?: string | null;
    currentOwner: number;
    canPlace: boolean;
    hoverSlot: number | null;
    setHoverSlot: (s: number | null) => void;
    onDropToSlot: (slotIndex: number, cardId: string) => void;
    onFlip: (slotIndex: number) => void;
    zoom: number;
  },
  ref: React.Ref<SlotBoardHandle>
) {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const { ratio, setByRatio } = useScrollSync(viewportRef);

  React.useImperativeHandle(
    ref,
    () => ({
      scrollToSlot(index: number) {
        const vp = viewportRef.current!;
        const centerPx = centerOf(index) * zoom;
        const left = clamp(
          centerPx - vp.clientWidth / 2,
          0,
          vp.scrollWidth - vp.clientWidth
        );
        vp.scrollLeft = left;
      },
    }),
    [zoom]
  );

  const toBaseX = React.useCallback(
    (clientX: number) => {
      const vp = viewportRef.current!;
      const r = vp.getBoundingClientRect();
      const xPx = clamp(clientX - r.left + vp.scrollLeft, 0, vp.scrollWidth);
      const u = xPx / (TL_W * zoom);
      return clamp(u * TL_W, MARGIN_X, TL_W - MARGIN_X);
    },
    [zoom]
  );

  const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    if (!canPlace) return;
    e.preventDefault();
    const idx = nearestSlotIndex(toBaseX(e.clientX));
    setHoverSlot(idx);
  };
  const onDragLeave = () => setHoverSlot(null);
  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    if (!canPlace) return;
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;
    const idx = nearestSlotIndex(toBaseX(e.clientX));
    setHoverSlot(null);
    onDropToSlot(idx, id);
  };

  const Slider = () => (
    <div className="mt-3 flex items-center gap-2">
      <span className="text-[11px] text-amber-200/75">Trượt</span>
      <input
        type="range"
        min={0}
        max={1000}
        step={1}
        value={Math.round(ratio * 1000)}
        onChange={(e) => setByRatio(parseInt(e.target.value, 10) / 1000)}
        className="w-full accent-amber-400"
      />
    </div>
  );

  return (
    <div className="relative rounded-2xl border border-amber-700/40 bg-gradient-to-b from-slate-900/50 to-slate-950/70 p-3">
      {/* Viewport */}
      <div
        ref={viewportRef}
        className="relative mx-auto overflow-x-auto overflow-y-hidden rounded-xl"
        style={{ width: "100%", height: TL_H }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div
          style={{ width: TL_W * zoom, height: TL_H * zoom, position: "relative" }}
        >
          <div
            style={{
              width: TL_W,
              height: TL_H,
              position: "absolute",
              left: 0,
              top: 0,
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
          >
            {/* Rail */}
            <svg
              viewBox={`0 0 ${TL_W} ${TL_H}`}
              className="absolute inset-0 w-full h-full"
              aria-label="Slot timeline"
            >
              <defs>
                <linearGradient id="tlNeon" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ff74c9" />
                  <stop offset="100%" stopColor="#ff4db8" />
                </linearGradient>
              </defs>
              <line
                x1={MARGIN_X}
                y1={RAIL_Y}
                x2={TL_W - MARGIN_X}
                y2={RAIL_Y}
                stroke="rgba(255,119,188,.35)"
                strokeWidth={8}
                strokeLinecap="round"
              />
              <line
                x1={MARGIN_X}
                y1={RAIL_Y}
                x2={TL_W - MARGIN_X}
                y2={RAIL_Y}
                stroke="url(#tlNeon)"
                strokeWidth={5}
                strokeLinecap="round"
              />

              {/* Stems + năm khi đã lật */}
              {slots.map(
                (s, i) =>
                  s &&
                  s.revealed && (
                    <g key={`stem-${i}`}>
                      <line
                        x1={centerOf(i)}
                        y1={CHIP_Y - CHIP_H / 2}
                        x2={centerOf(i)}
                        y2={RAIL_Y - DOT_R - 1}
                        stroke={s.card.id === anchorId ? "#ff5fc1" : "#ff8abd"}
                        strokeWidth={2.5}
                      />
                      <circle
                        cx={centerOf(i)}
                        cy={RAIL_Y}
                        r={s.card.id === anchorId ? DOT_R + 1 : DOT_R}
                        fill={s.card.id === anchorId ? "#ff5fc1" : "#ffc1e3"}
                      />
                      <text
                        x={centerOf(i)}
                        y={RAIL_Y - 12}
                        textAnchor="middle"
                        fill="rgba(255,240,248,.95)"
                        fontSize="14"
                        fontWeight={700}
                      >
                        {fmtYear(s.card.yearStart)}
                      </text>
                    </g>
                  )
              )}
            </svg>

            {/* Slots trống (dài) */}
            {slots.map((_, i) => (
              <div
                key={`slot-${i}`}
                className="absolute rounded-md -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: CHIP_W,
                  height: CHIP_H,
                  left: centerOf(i),
                  top: CHIP_Y,
                  border: "2px dashed rgba(251,191,36,.45)",
                  background:
                    "repeating-linear-gradient(45deg, rgba(251,191,36,.09) 0 12px, rgba(251,191,36,.04) 12px 24px)",
                  boxShadow:
                    hoverSlot === i
                      ? "0 0 0 3px rgba(251,191,36,.55) inset"
                      : "none",
                  transition: "box-shadow 120ms ease",
                }}
              />
            ))}

            {/* Card đã đặt trên slot (dài + chữ lớn) */}
            {slots.map(
              (s, i) =>
                s && (
                  <button
                    key={s.card.id}
                    type="button"
                    draggable={!s.locked && s.owner === currentOwner}
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", s.card.id);
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    onClick={() => {
                      if (!s.revealed && s.owner === currentOwner) onFlip(i);
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-md border shadow-sm select-none px-4 py-3 text-left ${
                      s.card.id === anchorId
                        ? "border-pink-500/70 bg-neutral-900/95 text-neutral-50 ring-2 ring-pink-500"
                        : s.revealed
                        ? "border-neutral-600 bg-neutral-900/90 text-neutral-50"
                        : "border-amber-500/70 bg-amber-500/10 text-amber-100"
                    }`}
                    style={{
                      width: CHIP_W,
                      height: CHIP_H,
                      left: centerOf(i),
                      top: CHIP_Y,
                    }}
                    title={
                      !s.revealed && s.owner === currentOwner
                        ? "Bấm để lật (chấm điểm)"
                        : "Chi tiết"
                    }
                  >
                    <div className="text-base md:text-lg font-bold leading-tight truncate">
                      {s.card.system}
                    </div>
                    {!s.revealed && s.owner === currentOwner && (
                      <div className="text-[12px] md:text-sm opacity-85">
                        Bấm để lật • chấm đúng/sai
                      </div>
                    )}
                  </button>
                )
            )}
          </div>
        </div>
      </div>

      {/* Slider điều khiển */}
      <Slider />
    </div>
  );
});

/* ============ Game component ============ */
type Player = { id: number; name: string; hand: Required<MaterialCard>[] };
const TEAM_COLORS = ["#f97316", "#22c55e", "#06b6d4", "#eab308"] as const;
type Phase = "idle" | "countdown" | "dealing" | "active";
type FlipModal =
  | { type: "correct"; card: Required<MaterialCard> }
  | { type: "wrong"; card: Required<MaterialCard> };

export default function HistoryStatsAndFactsGameBoard() {
  const PLAYERS = 4;
  const FULL_DECK = React.useMemo(
    () => RAW_DECK.filter((c) => c.yearStart !== null) as Required<MaterialCard>[],
    []
  );
  const MID = Math.floor(NUM_SLOTS / 2);

  const boardRef = React.useRef<SlotBoardHandle>(null);

  // game states
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [countdown, setCountdown] = React.useState<number>(3);

  const [slots, setSlots] = React.useState<(SlotCell | null)[]>(
    () => Array(NUM_SLOTS).fill(null)
  );
  const [anchor, setAnchor] = React.useState<Required<MaterialCard> | null>(null);

  const [players, setPlayers] = React.useState<Player[]>([]);
  const [drawPile, setDrawPile] = React.useState<Required<MaterialCard>[]>([]);
  const [discardPile, setDiscardPile] = React.useState<Required<MaterialCard>[]>([]);
  const [current, setCurrent] = React.useState(0);
  const [finishedOrder, setFinishedOrder] = React.useState<number[]>([]);
  const [hoverSlot, setHoverSlot] = React.useState<number | null>(null);

  const [showRules, setShowRules] = React.useState(false);
  const [zoom, setZoom] = React.useState(0.9);

  const [flipModal, setFlipModal] = React.useState<FlipModal | null>(null);

  /* ---------- Start / Reset game ---------- */
  const setupGame = React.useCallback(() => {
    const deck = shuffle(FULL_DECK);
    if (!deck.length) return;
    const anch = deck.shift()!;
    const dealEach = Math.min(HAND_CAPACITY, Math.floor(deck.length / PLAYERS));
    const _players: Player[] = Array.from({ length: PLAYERS }, (_, i) => ({
      id: i,
      name: `Đội ${i + 1}`,
      hand: [],
    }));

    const initSlots: (SlotCell | null)[] = Array(NUM_SLOTS).fill(null);
    initSlots[MID] = { card: anch, revealed: true, locked: true };

    setAnchor(anch);
    setSlots(initSlots);
    setPlayers(_players);
    setDrawPile(deck);
    setDiscardPile([]);
    setFinishedOrder([]);
    setCurrent(0);

    setTimeout(() => boardRef.current?.scrollToSlot(MID), 10);

    (async () => {
      setPhase("dealing");
      for (let r = 0; r < dealEach; r++) {
        for (let p = 0; p < PLAYERS; p++) {
          const top = deck.shift();
          if (!top) break;
          setPlayers((prev) =>
            prev.map((pl, i) =>
              i === p ? { ...pl, hand: [...pl.hand, top] } : pl
            )
          );
          setDrawPile(deck.slice());
          await new Promise((res) => setTimeout(res, 160));
        }
      }
      setPhase("active");
    })();
  }, [FULL_DECK]);

  const startGame = () => {
    if (phase !== "idle") return;
    setCountdown(3);
    setPhase("countdown");
    let t = 3;
    const id = setInterval(() => {
      t -= 1;
      setCountdown(t);
      if (t <= 0) {
        clearInterval(id);
        setupGame();
      }
    }, 650);
  };

  /* ---------- Lượt chơi ---------- */
  const nextPlayer = () => {
    for (let step = 1; step <= PLAYERS; step++) {
      const i = (current + step) % PLAYERS;
      if (players[i]?.hand.length > 0) {
        setCurrent(i);
        break;
      }
    }
  };

  const pendingInfo = React.useMemo(() => {
    for (let i = 0; i < slots.length; i++) {
      const s = slots[i];
      if (s && !s.revealed && !s.locked && s.owner === current)
        return { index: i, cell: s };
    }
    return null;
  }, [slots, current]);

  function dropToSlot(slotIndex: number, cardId: string) {
    if (phase !== "active") return;
    const me = players[current];
    if (!me) return;

    if (pendingInfo && pendingInfo.cell.card.id === cardId) {
      const moved = makeRoomWithVacancy(slots, slotIndex, pendingInfo.index);
      if (!moved) return;
      moved[slotIndex] = pendingInfo.cell;
      setSlots(moved);
      return;
    }

    const idxInHand = me.hand.findIndex((c) => c.id === cardId);
    if (idxInHand < 0) return;
    if (pendingInfo) return;

    const roomed = makeRoom(slots, slotIndex);
    if (!roomed) return;

    const card = me.hand[idxInHand];
    roomed[slotIndex] = { card, revealed: false, locked: false, owner: current };
    setSlots(roomed);
    setPlayers((prev) =>
      prev.map((pl, i) =>
        i === current ? { ...pl, hand: pl.hand.filter((c) => c.id !== card.id) } : pl
      )
    );
  }

  function flipAt(slotIndex: number) {
    const s = slots[slotIndex];
    if (!s || s.revealed || s.locked || s.owner !== current) return;

    const withThis = slots.slice();

    if (isIncreasingWithCandidate(withThis, slotIndex)) {
      withThis[slotIndex] = { ...s, revealed: true, locked: true, owner: undefined };
      setSlots(withThis);
      setFlipModal({ type: "correct", card: s.card });
      if (players[current].hand.length === 0 && !finishedOrder.includes(current)) {
        setFinishedOrder((o) => [...o, current]);
      }
    } else {
      const card = s.card;
      const cleaned = slots.slice();
      cleaned[slotIndex] = null;
      setSlots(cleaned);
      setDiscardPile((prev) => [...prev, card]);

      if (drawPile.length > 0) {
        const top = drawPile[0];
        setPlayers((prev) =>
          prev.map((pl, i) =>
            i === current ? { ...pl, hand: [...pl.hand, top] } : pl
          )
        );
        setDrawPile(drawPile.slice(1));
      }
      setFlipModal({ type: "wrong", card });
    }
  }

  function confirmFlipModal() {
    setFlipModal(null);
    nextPlayer();
  }

  /* ---------- Seats UI: 3 xấp bên trái + đội đang lượt chiếm gần hết hàng ---------- */
  const CompactSeat = ({ idx }: { idx: number }) => {
    const p = players[idx];
    const cards = p?.hand ?? [];
    const fanCount = Math.min(cards.length, 5);
    return (
      <div className="rounded-xl border border-slate-700/60 bg-gradient-to-b from-slate-800/55 to-slate-900/55 p-3">
        <div className="text-xs mb-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: TEAM_COLORS[idx] }}
            />
            <span className="font-semibold">{p?.name ?? "-"}</span>
          </span>
          <span className="ml-auto text-muted-foreground">
            ({cards.length}/{HAND_CAPACITY})
          </span>
        </div>
        <div className="h-[90px] relative">
          {Array.from({ length: fanCount }).map((_, i) => (
            <div
              key={i}
              className="absolute top-2 rounded-md border border-neutral-700/80"
              style={{
                left: 10 + i * 18,
                width: 140,
                height: 80,
                background:
                  "repeating-linear-gradient(135deg, rgba(255,255,255,.06) 0 8px, rgba(255,255,255,.03) 8px 16px), linear-gradient(180deg, rgba(2,6,23,.9), rgba(2,6,23,.7))",
              }}
            />
          ))}
          {fanCount === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
              Hết bài
            </div>
          )}
        </div>
      </div>
    );
  };

  // Đội đang lượt: chiếm gần hết hàng 1, thẻ portrait cao to
  const ExpandedSeat = ({ idx }: { idx: number }) => {
    const p = players[idx];
    const cards = p?.hand ?? [];
    const placeholders = Math.max(0, HAND_CAPACITY - cards.length);
    return (
      <div className="rounded-xl border border-slate-700/60 bg-gradient-to-b from-slate-800/60 to-slate-900/60 p-3 ring-2 ring-amber-400/70 shadow">
        <div className="text-xs mb-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: TEAM_COLORS[idx] }}
            />
            <span className="font-semibold">{p?.name ?? "-"}</span>
          </span>
          <span className="ml-auto text-muted-foreground">
            ({cards.length}/{HAND_CAPACITY} lá)
          </span>
        </div>

        {/* Cao hơn để chiếm hết khoảng trống hàng 1 */}
        <div className="flex items-end gap-3 overflow-x-auto h-[280px] pb-2">
          {cards.map((c) => (
            <Card
              key={c.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", c.id);
                e.dataTransfer.effectAllowed = "move";
              }}
              className="cursor-grab active:cursor-grabbing border border-slate-600/70 bg-slate-800/85 rounded-xl shadow-sm"
              style={{ width: HAND_CARD_W, height: HAND_CARD_H }}
              title="Kéo vào slot timeline"
            >
              <CardContent className="h-full p-3 flex flex-col justify-between">
                <div className="text-lg font-extrabold leading-tight">
                  {c.system}
                </div>
                <div className="text-[12px] text-amber-200/80">
                  Kéo vào slot trên timeline • Bấm thẻ đã đặt để lật
                </div>
              </CardContent>
            </Card>
          ))}

          {Array.from({ length: placeholders }).map((_, i) => (
            <div
              key={`ph-${i}`}
              className="rounded-xl border-2 border-dashed border-amber-400/50"
              style={{
                width: HAND_CARD_W,
                height: HAND_CARD_H,
                background:
                  "repeating-linear-gradient(45deg, rgba(251,191,36,.12) 0 12px, rgba(251,191,36,.06) 12px 24px)",
              }}
              title="Ô trống"
            />
          ))}
        </div>
      </div>
    );
  };

  // Thứ tự 3 đội ở cột trái: theo chiều kim đồng hồ sau đội hiện tại
  const others = [(current + 1) % 4, (current + 2) % 4, (current + 3) % 4];

  /* ---------- Render ---------- */
  return (
    <section className="relative py-5 md:py-7">
      <div
        className="absolute inset-0 -z-10 opacity-[.10]"
        style={{
          background:
            "radial-gradient(900px 380px at 50% -200px, rgba(250,204,21,.25), transparent 60%)",
        }}
      />

      {/* Title + toolbar */}
      <div className="container mx-auto px-4">
        <div className="rounded-2xl border border-amber-700/30 bg-amber-950/20 px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-sm">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center md:text-left">
              History Stats & Facts — Timeline Battle
            </h2>
            <p className="text-sm text-amber-200/80 mt-1 text-center md:text-left">
              Hàng trên: đội tới lượt <b>chiếm gần hết</b> để hiện 5 lá{" "}
              <b>portrait cao</b>; 3 đội còn lại <b>xấp bài</b> gọn bên trái.
              Timeline bên dưới hiển thị thẻ <b>dài</b>, chữ lớn.
            </p>
          </div>

          <Toolbar
            phase={phase}
            zoom={zoom}
            setZoom={setZoom}
            onStart={startGame}
            onShowRules={() => setShowRules(true)}
          />
        </div>
      </div>

      {/* HÀNG TRÊN: cột trái (3 xấp) + đội hiện tại (rộng) */}
      <div className="container mx-auto px-4 mt-4">
        <div className="flex gap-4 items-stretch">
          <div className="w-[260px] shrink-0 flex flex-col gap-3">
            <CompactSeat idx={others[0]} />
            <CompactSeat idx={others[1]} />
            <CompactSeat idx={others[2]} />
          </div>
          <div className="flex-1 min-w-0">
            <ExpandedSeat idx={current} />
          </div>
        </div>
      </div>

      {/* TIMELINE chiếm toàn bộ phía dưới */}
      <div className="container mx-auto px-4 mt-4">
        <div className="rounded-2xl border border-amber-700/40 bg-gradient-to-b from-slate-900/60 to-slate-950/80 p-4 shadow-sm">
          <div className="text-xs text-amber-200/80 mb-2 text-center">
            {phase === "idle" &&
              "Nhấn Start game để đếm ngược, auto locate tới Anchor và chia bài."}
            {phase === "countdown" && `Bắt đầu sau: ${countdown}…`}
            {phase === "dealing" && "Đang chia bài…"}
            {phase === "active" && (
              <>
                Nọc: {drawPile.length} • Bỏ: {discardPile.length} —{" "}
                <span className="opacity-90">
                  Kéo 1 lá vào <b>slot</b>. Bấm thẻ để <b>lật</b> và hiện popup
                  kết quả.
                </span>
              </>
            )}
          </div>

          <SlotTimelineBoard
            ref={boardRef}
            slots={slots}
            anchorId={anchor?.id}
            currentOwner={current}
            canPlace={phase === "active" && (players[current]?.hand.length ?? 0) > 0}
            hoverSlot={hoverSlot}
            setHoverSlot={setHoverSlot}
            onDropToSlot={dropToSlot}
            onFlip={flipAt}
            zoom={zoom}
          />
        </div>
      </div>

      {/* Popup kết quả lật thẻ */}
      {flipModal && (
        <ResultModal modal={flipModal} onConfirm={confirmFlipModal} />
      )}

      {/* Rules modal */}
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
    </section>
  );
}

/* ---------- Small components ---------- */
function Toolbar({
  phase,
  zoom,
  setZoom,
  onStart,
  onShowRules,
}: {
  phase: "idle" | "countdown" | "dealing" | "active";
  zoom: number;
  setZoom: (z: number) => void;
  onStart: () => void;
  onShowRules: () => void;
}) {
  return (
    <div className="flex items-center justify-center md:justify-end gap-2">
      <button
        disabled={phase !== "idle"}
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${
          phase === "idle"
            ? "border-amber-700/40 bg-amber-400 text-black hover:brightness-110"
            : "border-slate-700/40 bg-slate-800/50 text-slate-400 cursor-not-allowed"
        }`}
        onClick={onStart}
        title="Bắt đầu ván mới"
      >
        <Play className="w-4 h-4" /> Start game
      </button>

      <button
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-700/40 bg-amber-400/15 text-amber-200 hover:bg-amber-400/25"
        onClick={onShowRules}
        title="Xem luật"
      >
        <HelpCircle className="w-4 h-4" /> Luật chơi
      </button>

      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-700/40 bg-slate-900/40">
        <Ruler className="w-4 h-4 text-amber-300" />
        <button
          className="p-1 rounded hover:bg-slate-800"
          onClick={() => setZoom(Math.max(0.5, Math.round((zoom - 0.1) * 100) / 100))}
          aria-label="Thu nhỏ"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          className="w-32 accent-amber-400"
          aria-label="Zoom timeline"
        />
        <button
          className="p-1 rounded hover:bg-slate-800"
          onClick={() => setZoom(Math.min(1.5, Math.round((zoom + 0.1) * 100) / 100))}
          aria-label="Phóng to"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <span className="text-xs text-amber-200/80 w-10 text-right">
          {Math.round(zoom * 100)}%
        </span>
      </div>
    </div>
  );
}

function ResultModal({
  modal,
  onConfirm,
}: {
  modal: { type: "correct"; card: Required<MaterialCard> } | { type: "wrong"; card: Required<MaterialCard> };
  onConfirm: () => void;
}) {
  const correct = modal.type === "correct";
  return (
    <div
      className="fixed inset-0 z-[70] bg-black/65 flex items-center justify-center p-4"
      onClick={onConfirm}
    >
      <div
        className="bg-card border border-border rounded-xl w-full max-w-lg p-6 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {correct ? (
          <>
            <h3 className="text-xl font-bold text-emerald-400">✅ Chính xác!</h3>
            <div className="mt-2 text-sm">
              <div className="font-semibold">{modal.card.system}</div>
              <div className="text-amber-200/90">Sự kiện: {modal.card.faceA}</div>
              <div className="text-amber-200/90">
                Thời kỳ: {modal.card.faceB} ({fmtYear(modal.card.yearStart)})
              </div>
              <div className="mt-2 text-muted-foreground">
                Stats: {modal.card.stats.join(" • ")}
              </div>
              <div className="mt-1 text-muted-foreground">Fact: {modal.card.fact}</div>
            </div>
            <div className="mt-4 text-right">
              <button
                className="px-3 py-2 rounded bg-emerald-500 text-black hover:brightness-110"
                onClick={onConfirm}
              >
                Tiếp tục (kết thúc lượt)
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-rose-400">❌ Chưa đúng</h3>
            <div className="mt-2 text-sm">
              <div className="font-semibold">{modal.card.system}</div>
              <div className="text-amber-200/90">
                Đáp án đúng: {modal.card.faceB} ({fmtYear(modal.card.yearStart)})
              </div>
              <div className="mt-1 text-muted-foreground">
                Thẻ này sẽ bị <b>discard</b> và bạn phải <b>bốc thêm 1 lá</b>.
              </div>
            </div>
            <div className="mt-4 text-right">
              <button
                className="px-3 py-2 rounded bg-rose-500 text-black hover:brightness-110"
                onClick={onConfirm}
              >
                Tiếp tục (kết thúc lượt)
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function RulesModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-xl w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-2">Luật — Competitive mode</h3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
          <li>
            Nhấn <b>Start game</b> để đếm ngược, màn hình tự cuộn tới <b>Anchor</b> và chia bài cho 4 đội.
          </li>
          <li>
            Đến lượt, kéo 1 lá vào <b>slot</b> (các thẻ bên cạnh sẽ <b>nhường chỗ</b>).
          </li>
          <li>
            Thẻ đặt thử có thể <b>di chuyển tự do</b> cho đến khi bấm để <b>lật</b>.
          </li>
          <li>
            Lật đúng: thẻ giữ nguyên, hiện năm. Lật sai: discard + bốc 1 lá. Nhấn “Tiếp tục” để chuyển lượt.
          </li>
          <li>
            Ai <b>hết bài trước</b> là người thắng; thứ hạng hiển thị ở khung đội.
          </li>
        </ul>
        <div className="text-right mt-4">
          <button className="px-3 py-2 rounded bg-muted hover:bg-muted/80" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
