
export class QuanHuyen {
  [x: string]: any;
    
    Id: number;   
    Ten: string;
    ChaId: number;
    TenCapCha: string;
    Cap: string;
    ThuTu: number;
    MaQuanLy: string;
    NgayTao: Date;
	NgaySua: Date;
	NguoiTao: string;
    NguoiSua: string;
    children?: QuanHuyen[];
  root: any;
    constructor(quanHuyen?)
    {
        quanHuyen = quanHuyen || {};
        this.Id= quanHuyen.Id || null,
        this.Ten= quanHuyen.Ten || '',
        this.ChaId= quanHuyen.ChaId || null,
        this.Cap= quanHuyen.Cap || '',
        this.TenCapCha= quanHuyen.TenCapCha || '',
        this.ThuTu= quanHuyen.ThuTu || '',      
        this.MaQuanLy= quanHuyen.MaQuanLy || '',    
        this.NguoiTao= quanHuyen.NguoiTao || '',
        this.NguoiSua= quanHuyen.NguoiSua || '',
        this.NgaySua = quanHuyen.NgaySua || null,
        this.NgayTao = quanHuyen.NgayTao || null;
        this.children = quanHuyen.children || [];
    }
}

