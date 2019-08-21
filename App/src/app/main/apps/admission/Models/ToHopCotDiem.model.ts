export class ToHopCotDiem {
    Id: number;
    Ten: string;
    KichHoat: boolean;
    NgayTao: Date;
	NgaySua: Date;
	NguoiTao: string;
    NguoiSua: string;
    CotDiem_ToHopCotDiems: Array<any>;
    HinhThucXetTuyenId: number;
    MaToHopCotDiem:string;
    // ChiTieu: number;
    // ChiTieuVuot:number;
    // ChiTieuThapNhat:number;
    constructor(toHopCotDiem?)
    {
        toHopCotDiem = toHopCotDiem || {};
        this.Id= toHopCotDiem.Id || null;
        this.Ten= toHopCotDiem.Ten || '';
        this.KichHoat= toHopCotDiem.KichHoat || false;
        this.CotDiem_ToHopCotDiems = toHopCotDiem.CotDiem_ToHopCotDiems || [];
        this.HinhThucXetTuyenId = toHopCotDiem.HinhThucXetTuyenId || null;
        this.MaToHopCotDiem = toHopCotDiem.MaToHopCotDiem || '';
        this.NguoiTao= toHopCotDiem.NguoiTao || '';
        this.NguoiSua= toHopCotDiem.NguoiSua || '';
        this.NgaySua = toHopCotDiem.NgaySua || null;
        this.NgayTao = toHopCotDiem.NgayTao || null;
        // this.ChiTieu = toHopCotDiem.ChiTieu || null;
        // this.ChiTieuVuot = toHopCotDiem.ChiTieuVuot || null;
        // this.ChiTieuThapNhat = toHopCotDiem.ChiTieuThapNhat || null;
    }
}