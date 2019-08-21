import { ThiSinh } from "./ThiSinh.model";
import { NguyenVong } from "./NguyenVong.model";
import { KhaoSat } from "./KhaoSat.model";
import { CotDiem } from "./CotDiem.model";
import { ToHopCotDiem } from "./ToHopCotDiem.model";
import { GiayTo } from "./GiayTo.model";
import { HinhThucXetTuyen } from "./HinhThucXetTuyen.model";

export class HoSoXetTuyen {
	Id: number;
	Ten: string;
	ThiSinhId: number;
	ThiSinh:ThiSinh;
	DotTuyenSinhId: number;
	HinhThucXetTuyenId: number;
	HinhThucXetTuyen: HinhThucXetTuyen;
	MaHoSo:string;
	MaHoSoInt: number;
	LoaiHoSoId: number;
	KhaoSatId: number;
	KhaoSatString: string;
	KichHoat: boolean;
	NgayTao: Date;
	Ngaysua: Date;
	NguoiTao: string;
	NguoiSua: string;
	NguyenVongs: Array<NguyenVong>;
	KhaoSat: KhaoSat;
	CotDiems: Array<CotDiem>;
	GiayToYeuCaus: Array<GiayTo>;
	ToHopCotDiems: Array<ToHopCotDiem>;
	LoaiBienNhan:string="";
	UrlBienNhan:string="";
	SoBaoDanhKiemTra:string;
	DiaDiemKiemTra:string;
	PhongKiemTra:string;
	DiaChiKiemTra:string;
	KetQua: number;
	IsPhucKhao: boolean;

    constructor(item?) {
		item = item || {};
		this.Ten = item.Ten || null;
		this.ThiSinhId = item.ThiSinhId || null;
		this.ThiSinh = item.ThiSinh || new ThiSinh();
		this.DotTuyenSinhId = item.DotTuyenSinhId || null;
		this.HinhThucXetTuyenId = item.HinhThucXetTuyenId || null;
		this.HinhThucXetTuyen = item.HinhThucXetTuyen || new HinhThucXetTuyen();
		this.LoaiHoSoId = item.LoaiHoSoId || null;
		this.KhaoSatId = item.KhaoSatId || null;
		this.KhaoSatString = item.KhaoSatString || null;
		this.KichHoat = item.KichHoat || null;
		this.NgayTao = item.NgayTao || null;
		this.Ngaysua = item.Ngaysua || null;
		this.NguyenVongs = item.NguyenVongs || new Array<NguyenVong>();
		this.KhaoSat = item.KhaoSat || new KhaoSat();
		
		this.CotDiems = item.CotDiems || new Array<CotDiem>();
		this.GiayToYeuCaus = item.GiayToYeuCaus || new Array<GiayTo>();
		this.MaHoSo=item.MaHoSo || '';
		this.MaHoSoInt = item.MaHoSoInt || null;

		this.ToHopCotDiems = item.ToHopCotDiems || new Array<ToHopCotDiem>();
		this.LoaiBienNhan = item.LoaiBienNhan ||"";
		this.UrlBienNhan = item.UrlBienNhan ||"";
		this.SoBaoDanhKiemTra = item.SoBaoDanhKiemTra || "";
		this.DiaDiemKiemTra = item.DiaDiemKiemTra || "";
		this.PhongKiemTra = item.PhongKiemTra || "";
		this.DiaChiKiemTra = item.DiaChiKiemTra || "";

		this.KetQua = item.KetQua || null;
		this.IsPhucKhao = item.IsPhucKhao || false;
    }
}