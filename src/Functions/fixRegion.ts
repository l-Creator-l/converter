export default function fixRegion(region:string) {
    if (Number(region) === 5) return 7;
    else if (Number(region) === 6) return 5;
    else if (Number(region) === 7) return 6;
    else return region;
}