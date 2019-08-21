import { CotDiem } from "./CotDiem.model";

export class CotDiem_ToHopCotDiem {
    Id: number;
    CotDiemId: number;
    CotDiem: CotDiem;
    ToHopCotDiemId: number;
    KichHoat: boolean;
    NgayTao: Date;
	NgaySua: Date;
	NguoiTao: string;
    NguoiSua: string;
    Loai: string;
    Stt: number;
    constructor(cotDiem_ToHopCotDiem?)
    {
        cotDiem_ToHopCotDiem = cotDiem_ToHopCotDiem || {};
        this.Id= cotDiem_ToHopCotDiem.Id || null;
        this.CotDiemId= cotDiem_ToHopCotDiem.CotDiemId || null;
        this.ToHopCotDiemId= cotDiem_ToHopCotDiem.ToHopCotDiemId || null;
        this.CotDiem= cotDiem_ToHopCotDiem.CotDiem || null,
        this.KichHoat= cotDiem_ToHopCotDiem.KichHoat || true;
        this.Loai= cotDiem_ToHopCotDiem.Loai || '';
        this.Stt= cotDiem_ToHopCotDiem.Stt || null;
        this.NguoiTao= cotDiem_ToHopCotDiem.NguoiTao || '';
        this.NguoiSua= cotDiem_ToHopCotDiem.NguoiSua || '';
        this.NgaySua = cotDiem_ToHopCotDiem.NgaySua || null;
        this.NgayTao = cotDiem_ToHopCotDiem.NgayTao || null;
    }
}