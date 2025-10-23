export default function fitContain(srcW, srcH, dstW, dstH) {
    const r = Math.min(dstW / srcW, dstH / srcH);
    return { width: Math.round(srcW * r), height: Math.round(srcH * r) };
}