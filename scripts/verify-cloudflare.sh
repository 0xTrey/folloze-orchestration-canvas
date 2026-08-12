#!/usr/bin/env bash
set -euo pipefail

base_url="${1:-https://folloze-orchestration-canvas.harnden-trey.workers.dev}"
base_url="${base_url%/}"
expected_logo_sha256="0e17fce7982368c0791820f488dffc18693336e14f930a88cf436426afba4924"

verify_tmp_dir="$(mktemp -d "${TMPDIR:-/tmp}/folloze-orchestration-verify.XXXXXX")"
cleanup() {
  find "$verify_tmp_dir" -type f -delete 2>/dev/null || true
  rmdir "$verify_tmp_dir" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

fetch_status() {
  local url="$1"
  local output="$2"
  curl --silent --show-error --location \
    --output "$output" \
    --write-out '%{http_code}' \
    "$url" || return 1
}

sha256_file() {
  local file="$1"
  if command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$file" | awk '{print $1}'
  else
    sha256sum "$file" | awk '{print $1}'
  fi
}

verify_once() {
  root_status="$(fetch_status "$base_url/" "$verify_tmp_dir/root.html")" || return 1
  query_status="$(fetch_status "$base_url/?cta=demo" "$verify_tmp_dir/query.html")" || return 1
  logo_status="$(fetch_status "$base_url/brand/folloze-logo.svg" "$verify_tmp_dir/logo.svg")" || return 1
  not_found_status="$(fetch_status "$base_url/cloudflare-migration-negative-probe" \
    "$verify_tmp_dir/not-found.html")" || return 1

  [[ "$root_status" == "200" ]] || return 1
  [[ "$query_status" == "200" ]] || return 1
  [[ "$logo_status" == "200" ]] || return 1
  [[ "$not_found_status" == "404" ]] || return 1

  grep -Fq 'Folloze | AI-Native Marketing Orchestration' "$verify_tmp_dir/root.html" || return 1
  grep -Fq '<svg' "$verify_tmp_dir/logo.svg" || return 1

  actual_logo_sha256="$(sha256_file "$verify_tmp_dir/logo.svg")"
  [[ "$actual_logo_sha256" == "$expected_logo_sha256" ]] || return 1
}

consecutive_passes=0
for attempt in $(seq 1 12); do
  if verify_once; then
    consecutive_passes=$((consecutive_passes + 1))
    printf 'Verification pass %s/3 for %s: root=%s query=%s logo=%s not_found=%s\n' \
      "$consecutive_passes" "$base_url" "$root_status" "$query_status" "$logo_status" \
      "$not_found_status"
    if [[ "$consecutive_passes" -eq 3 ]]; then
      printf 'Verified %s after three consecutive passes; logo_sha256=%s\n' \
        "$base_url" "$actual_logo_sha256"
      exit 0
    fi
  else
    consecutive_passes=0
    printf 'Verification attempt %s/12 has not converged for %s\n' "$attempt" "$base_url" >&2
  fi
  sleep 2
done

printf 'Production verification failed to converge for %s\n' "$base_url" >&2
exit 1
