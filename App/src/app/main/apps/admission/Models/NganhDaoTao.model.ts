import { ToHopCotDiem } from "./ToHopCotDiem.model";

export class NganhDaoTao {
  Id: number;
  Ten: string;
  GhiChu: string;
  NganhId: string;
  KichHoat: boolean;
  NhomChaId: number;
  NhomCha: NganhDaoTao;
  NgayTao: Date;
  NgaySua: Date;
  NguoiTao: string;
  NguoiSua: string;
  DanhSachToHopCotDiem: Array<ToHopCotDiem>;
  ChiTieu: number;
  ChiTieuVuot: number;
  ChiTieuThapNhat:number;
  DiemSan: number;
  DiemChuan: number;
 
  //DotTuyenSinhId: number;

  IsLoadData:boolean=false; // false: là xuống csdl lấy, và ngược lại
  constructor(nganhDaoTao?)
    {
        nganhDaoTao = nganhDaoTao || {};
        this.Id= nganhDaoTao.Id || null,
        this.Ten= nganhDaoTao.Ten || '',
        this.GhiChu= nganhDaoTao.GhiChu || '',
        this.KichHoat= nganhDaoTao.KichHoat || false,
        this.NganhId= nganhDaoTao.NganhId || '',
        this.NhomChaId= nganhDaoTao.NhomChaId || null,
        this.NhomCha= nganhDaoTao.NhomCha || null,
        this.NguoiTao= nganhDaoTao.NguoiTao || '',
        this.NguoiSua= nganhDaoTao.NguoiSua || '',
        this.NgaySua = nganhDaoTao.NgaySua || null,
        this.NgayTao = nganhDaoTao.NgayTao || null,
        this.DanhSachToHopCotDiem = nganhDaoTao.DanhSachToHopCotDiem || new Array<ToHopCotDiem>(),
        this.ChiTieu = nganhDaoTao.ChiTieu || null,
        this.ChiTieuVuot = nganhDaoTao.ChiTieuVuot || null,
        this.DiemSan = nganhDaoTao.DiemSan || null,
        this.DiemChuan = nganhDaoTao.DiemChuan || null
       
        //this.DotTuyenSinhId = nganhDaoTao.DotTuyenSinhId || null
    }
}

