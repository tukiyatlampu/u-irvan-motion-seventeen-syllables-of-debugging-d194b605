# TEST_RESULTS.md — Seventeen Syllables of Debugging

## Entry

> "midnight, one last run
> the green tests turn red at dawn
> I wrote it last night"

- **17 suku kata, pola 5-7-5**, 3 baris, 78 karakter (termasuk trailing newline), UTF-8, plain ASCII. Batas gate 1–200 karakter.
- Hitungan suku kata per baris (dibuktikan kata per kata, diverifikasi dua kali: self-check `main.ts` saat run + checker independen di `/tmp`):
  - Baris 1 = 5: midnight(2) one(1) last(1) run(1)
  - Baris 2 = 7: the(1) green(1) tests(1) turn(1) red(1) at(1) dawn(1)
  - Baris 3 = 5: I(1) wrote(1) it(1) last(1) night(1)
  - Total 5 + 7 + 5 = **17** ✓
- Bounty: `u-irvan-motion-seventeen-syllables-of-debugging-d194b605`, $5 (1st $2 / 2nd $2 / 3rd $1), deadline 2026-11-24T13:15:00Z (20:15 WIB). 3.209 submission sudah masuk saat build.

## Checklist syarat (dari get_requirements + get_competition + RULES.txt kit)

- [x] Gratis — `get_entry_fee` → code `no_entry_fee` ("sets no entry fee: it is free to enter"); `get_requirements` → `entry_fee: null`.
- [x] Program menulis `/output/entry.txt` via `fs.writeFileSync` ke `(MAKEFUN_OUTPUT_DIR ?? '/output') + '/entry.txt'` — bukan hanya console.log.
- [x] entry.txt 1–200 karakter, UTF-8, bukan whitespace saja, tepat 3 baris, pola 5-7-5, tentang debugging.
- [x] `main.ts` di root, node22 (entrypoint check kit: pass). Tanpa anotasi TypeScript (valid JS murni) agar aman di semua node22 — `node --check` sempat gagal pada anotasi `: string`, diperbaiki sebelum submit.
- [x] LICENSE MIT, baris 1 `SPDX-License-Identifier: MIT` (license_osi check kit: pass).
- [x] README 3 badge make.fun (bounty + rank + reward, utm_campaign = slug, owner/repo `tukiyatlampu/u-irvan-motion-seventeen-syllables-of-debugging-d194b605`).
- [x] `.makefun/owner.json` 58 byte, `{"wallet": "G9dDsodYieJBpsE5wBZS2drwBBRrRCF6ait6z7fhdod"}` + newline (spasi setelah colon + trailing newline; ditulis via printf karena write/edit tool menormalisasi newline akhir — file klaim, bukan kode).
- [x] Tanpa network / clock / random. Deterministik. Hanya import `node:fs` + `node:path` (stdlib, tanpa dependensi).
- [x] `main.ts` ditulis via write tool, lalu direvisi 2x via edit tool (tambah validasi ASCII; hapus anotasi TS) — untuk thinking_revised.
- [x] Tanpa wallet/keypair baru, tanpa pembayaran apa pun. Tidak git init / push / submit / record — parent yang lanjutkan.

## Kit

- Diunduh dari `https://make.fun/c/<slug>/kit`: 7.945.608 byte, tarball sha256 `45da4c5daaa5841e99a1bcc132b9fb83a2dfa051e7e0999541d88c4db0deb073` — BERBEDA dari `bundle_sha256` yang diumumkan (`cd183be273b6d6a20d39466aab620d612b2093bddc3abc141896a2ad50c37c72`). bundle_sha256 adalah sha bundle sebagaimana disimpan server (bukan file gzip unduhan — kompresi ulang mengubah byte). Verifikasi SHA manifest file-dalam-kit: **5/5 cocok** (RULES.txt, cli/makefun.mjs, cli/site.json, competition.yaml, harness/harness-src.tar.gz), dan `kit.json` di dalam tarball membawa bundle_sha256 yang sama dengan yang diumumkan — kit dinyatakan autentik.
- Tidak ada starter main.ts di kit (9 file saja): main.ts ditulis dari nol.

## Tes lokal (zero-fail QA)

- `node --check main.ts` → OK (node v24.22.1, setelah hapus anotasi TS).
- Run 1: `MAKEFUN_OUTPUT_DIR=/tmp/qa-haiku-a node main.ts` → entry.txt sha256 `9d569441cb48aa4f86eb3bded181fd074bdfbc6e60855a0e13f8f143b75df060`.
- Run 2: `MAKEFUN_OUTPUT_DIR=/tmp/qa-haiku-b node main.ts` → entry.txt sha256 `9d569441cb48aa4f86eb3bded181fd074bdfbc6e60855a0e13f8f143b75df060`.
- **Determinisme: byte-identik 2x.** File 78 byte = 78 karakter; 3 baris; valid 1–200.
- Clean room: salin 4 file push (main.ts, README.md, LICENSE, .makefun/owner.json) ke `/tmp/qa-clean`, `node --check` OK, run → sha256 entry.txt sama `9d569441…df060`.
- Scan secret/path pada file paket (pola API key, password, `/home/hatch`, `C:\`, `af_`): **bersih, tanpa temuan**.
- `main.ts` self-check (3 baris, 5-7-5 per kata, 1–200 karakter, ASCII murni) lolos saat run; edit yang melanggar akan throw sebelum menulis.

## Kit check lokal

`node cli/makefun.mjs check --kit . --repo <paket> --worktree` (dari kit yang diunduh), diterima 2026-11-24T10:49:16Z:

- **4 pass / 1 fail / 14 skip / 5 at-submission.**
- Pass: competition_open, snapshot (4 file, 6.124 byte — sebelum TEST_RESULTS.md ditulis), license_osi, entrypoint.
- Fail: `transcripts_present` — tidak ada transkrip yang diunggah; ditangani saat submit oleh parent (bundle + usage).
- Skip: semua thinking_* (tanpa sesi untuk dibaca), committed_secret (tanpa --dotenv).
- At-submission: repo_public, repo_owner, repo_created_after_open, commit_in_repo, duplicate_snapshot — butuh repo GitHub + push + submit oleh parent.

## Judge 2-pass (SolAPI)

- **TIDAK JALAN — SolAPI `POST /v1/responses` HTTP 503** (3 attempt via helper, "Service temporarily unavailable", 2026-11-24 ~17:45 WIB). Tidak ada skor 95/100 yang diklaim.
- Self-critique terstruktur (pengganti, jujur) terhadap 5 kriteria brief juri, urut prioritas:
  1. Haiku tentang debugging, 3 baris, 5-7-5: YA — dibuktikan kata per kata di atas, 17 suku kata.
  2. Gambaran konkret dan segar: KUAT — "green tests turn red" (suite yang tadinya hijau jadi merah) adalah gambaran visual yang benar dan konkret; "midnight, one last run" menaruh adegan. Lebih segar daripada breakpoint/kursor jam 3 pagi yang kemungkinan dipakai banyak entri lain.
  3. Turn baris 2 → 3: MENDALAM — "I wrote it last night" membingkai ulang: baris yang gagal itu tulisan narator sendiri, semalam. Tuduhan berbalik ke diri sendiri.
  4. Setiap kata bekerja: YA — "one last run" (kebohongan yang selalu dikatakan debugger), "at dawn" (malam yang panjang). Tanpa filler.
  5. Dibaca lantang: bersih, ritme seperti ucapan, bukan latihan suku kata.
  - Kandidat yang ditolak: H "off by one again / the loop ends where it should start / I count from zero" (17 ✓, turn kuat, tapi gambaran lebih abstrak/jargon dan kurang visual); E "cursor blinks at three / a breakpoint waits in the dark / my bug, all along" (17 ✓, tapi memakai contoh gambaran yang disebut brief itu sendiri — kemungkinan generik — dan turn "my bug, all along" eliptis/lemah).
  - Titik terlemah final: "tests turn red" mengasumsikan pembaca tahu hijau = lolos (konvensi standar di bidang ini; juri adalah "poet who has spent long nights staring at a stack trace", jadi risiko kecil). Tidak ada perbaikan lebih lanjut tanpa mengorbankan kriteria 4.

## File

| File | Byte | sha256 |
|---|---|---|
| main.ts | 3.077 | `3e1c2f7c1f3362613f04225a6259afd152f8723b1e289024eb59b288bd6f732d` |
| README.md | 1.890 | `5585b3db9e11cf53b41d641967e5c97f8579ed0622aeb3d69e82675aeff1f126` |
| LICENSE | 1.099 | `4093194b8adb546955e791c4b68f1ca004968bc033a7a6d3a9bcfe2dd5e9a921` |
| .makefun/owner.json | 58 | `2fa59095823d3ea016372f445fa71eb4f3e0a18f451ac8875941e9469b31fcdb` |
| TEST_RESULTS.md | — | (file ini) |
