export class LoaiDiem {
    Id: number;
    Ten: string;
    KichHoat: boolean;
    NgayTao: Date;
	NgaySua: Date;
	NguoiTao: string;
    NguoiSua: string;
    Ma: string
    constructor(item?) {
        if(item) {
            item = item || new LoaiDiem();
            this.Id = item.Id || null;
            this.Ten = item.Ten || '';
            this.KichHoat = item.KichHoat  || null;
            this.NgayTao = item.NgayTao  || '';
            this.NgaySua = item.NgaySua || null;
            this.NguoiTao = item.NguoiTao || null;
            this.NguoiSua = item.NguoiSua || null;
            this.Ma = item.Ma || '';
        }
    }
}