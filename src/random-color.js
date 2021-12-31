// Adapted from: http://web.archive.org/web/20210219050141/https://meshgradient.com/m.min.js

function HSLtoRGB(s, M, t) {
    let e, w, L;

    const D = s => Math.floor(Math.max(Math.min(256 * s, 255), 0)),
        i = (s, M, t) => (
            t < 0 && (t += 1),
            t > 1 && (t -= 1),
            t < 1 / 6
                ? s + 6 * (M - s) * t
                : t < 0.5
                    ? M
                    : t < 2 / 3
                        ? s + (M - s) * (2 / 3 - t) * 6
                        : s
        ),
        r = t < 0.5 ? t * (1 + M) : t + M - t * M,
        N = 2 * t - r;

    return (
        (e = i(N, r, s + 1 / 3)),
        (w = i(N, r, s)),
        (L = i(N, r, s - 1 / 3)),
        [D(e), D(w), D(L)]
    );
}

function RGBtoHex(s, M, t) {
    return `#${s.toString(16)}${M.toString(16)}${t.toString(16)}`;
}

export function randomColor() {
    const s = Math.random(),
        M =
            (Math.floor(360 * s),
                HSLtoRGB(s, 1, 0.01 * (Math.floor(16 * Math.random()) + 75)));
    return RGBtoHex(M[0], M[1], M[2]);
}
