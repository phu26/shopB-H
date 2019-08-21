export class ThongBao {
    Id:number;
    NoiDung:string;
    NgayTao: Date;
    NgaySua: Date;
    NguoiTao: string;
    NguoiSua: string;
    constructor(thongbao?){
        thongbao = thongbao || {};
        this.Id = thongbao.Id || null;
        this.NoiDung = thongbao.NoiDung || '';
        this.NgayTao = thongbao.NgayTao || null;
        this.NgaySua = thongbao.NgaySua || null;
        this.NguoiTao = thongbao.NguoiTao || '';
        this.NguoiSua = thongbao.NguoiSua || '';
    }
}