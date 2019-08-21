import { DotTuyenSinh } from "./DotTuyenSinh.model";


export class DotXetTuyen {
    Id: number;
    Ten: string;
    DotTuyenSinhId: number;
    DotTuyenSinh: DotTuyenSinh;
    KichHoat: boolean;
    CongThucTinhDiem: string;
    NgayTao: Date;
    NgaySua: Date;
    NguoiTao: string;
    NguoiSua: string;
    constructor(dotXetTuyen?) {
        dotXetTuyen = dotXetTuyen || {},
            this.Id = dotXetTuyen.Id || null,
            this.Ten = dotXetTuyen.Ten || '',
            this.DotTuyenSinhId = dotXetTuyen.DotTuyenSinhId || null,
            this.KichHoat = dotXetTuyen.KichHoat || false,
            this.NgayTao = dotXetTuyen.NgayTao || Date.now,
            this.NgaySua = dotXetTuyen.NgaySua || Date.now,
            this.NguoiTao = dotXetTuyen.NguoiTao || null,
            this.NguoiSua = dotXetTuyen.NguoiSua || null,
            this.CongThucTinhDiem = dotXetTuyen.CongThucTinhDiem || null
    }
}
