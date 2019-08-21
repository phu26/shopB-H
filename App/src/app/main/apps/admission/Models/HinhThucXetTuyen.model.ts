import { LoaiDiem } from "./LoaiDiem.model";

export class HinhThucXetTuyen {
    Id: number; 
	Ten: string;
	Loai: string;
    KichHoat: boolean; 
    MaTruong:string;
    LoaiDiems: Array<LoaiDiem>;
	NgayTao: Date;
	NgaySua: Date;
	NguoiTao: string;
	NguoiSua: string;
    constructor(hinhThucXetTuyen?) {
        if(hinhThucXetTuyen){
            hinhThucXetTuyen = hinhThucXetTuyen || {},
            this.Id = hinhThucXetTuyen.Id || null,
            this.Ten = hinhThucXetTuyen.Ten || '',
            this.Loai = hinhThucXetTuyen.Loai || '',
            this.KichHoat = hinhThucXetTuyen.KichHoat || null,
            this.LoaiDiems = hinhThucXetTuyen.LoaiDiems || [],
            this.NgayTao = hinhThucXetTuyen.NgayTao || null,
            this.NgaySua = hinhThucXetTuyen.NgaySua || null,
            this.NguoiTao = hinhThucXetTuyen.NguoiTao || null,
            this.NguoiSua = hinhThucXetTuyen.NguoiSua || null,
            this.MaTruong = hinhThucXetTuyen.MaTruong || ''
        }
    }
}