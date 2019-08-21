import { QuanHuyen } from "./QuanHuyen.model";
import { TruongTHPT } from "./TruongTHPT.model";
import { ChungChi } from "./ChungChi.model";
import { DanToc } from "./DanToc.model";
import { DoiTuong3T } from "./DoiTuong3T.model";

export class ThiSinh {


	/* #region  Thông tin thí sinh */
	Id: number;
	HoLot: string;
	Ten: string;
	HoLotVaTen: string;
	GioiTinh: number;
	NgaySinh: Date;
	NoiSinh: string;
	NoiSinhObject: QuanHuyen;
	CMND: string;
	NgayCapCMND: Date;
	NoiCapCMND: string;
	SDT: string;
	Email: string;



	DanTocId: number;
	DanToc: DanToc;
	TenDanToc: string;
	QuocTich: string;
	TonGiaoId: number;
	DoiTuongUuTienId: number;
	KhuVucUuTienId: number;
	DoiTuong3TId: number;
	DoiTuong3T: DoiTuong3T;
	KhaoSatId: number;
	TenDangNhap: string;
	MatKhau: string;


	HoSoNopId: number;
	KichHoat: boolean;
	NgayTao: Date;
	NgaySua: Date;
	NguoiTao: string;
	NguoiSua: string;

	CoDuThiOlympia: boolean;
	CoChungChiQuocTe: boolean;

	DiaChiNhanBaoTin: string;

	DienThoaiBoHoacMe: string;
	/* #endregion */


	/* #region  Chứng chỉ */

	ChungChi: ChungChi;
	DongYHeVuaHocVuaLam: boolean;
	DongYHocQuanTriKinhDoanh:boolean;

	/* #endregion */


	/* #region  Thông tin  lớp 10 */
	TinhThanhTHPT10: QuanHuyen;
	QuanHuyenTHPT10: QuanHuyen;
	TruongTHPT10Id: number;
	TruongTHPT10MaTruong: string;
	TruongTHPT10MaTinh: string;
	TruongTHPT10: TruongTHPT;

	/* #endregion */


	/* #region  Thông tin lớp 11 */
	TinhThanhTHPT11: QuanHuyen;
	QuanHuyenTHPT11: QuanHuyen;
	TruongTHPT11Id: number;
	TruongTHPT11MaTruong: string;
	TruongTHPT11MaTinh: string;
	TruongTHPT11: TruongTHPT;
	/* #endregion */


	/* #region  Thông tin lớp 12 */
	TinhThanhTHPT12: QuanHuyen;
	QuanHuyenTHPT12: QuanHuyen;
	TruongTHPT12Id: number;
	TruongTHPT12MaTruong: string;
	TruongTHPT12MaTinh: string;
	TruongTHPT12: any;
	/* #endregion */



	/* #region  Thông tin liên quan đến kỳ thi THPTQG */
	NamTotNghiepTHPT: number;
	HanhKiemTotNghiepTHPT: string;
	HocLucTotNghiepTHPT: string;
	SoBaoDanh: string; // thi thptqg
	SoBaoDanhThiTHPTQG: string; // 2 cái số báo danh không biết dùng cái nào
	MaVachThiTHPTQG: string;
	/* #endregion */


	/* #region  Thông tin bằng cao đẳng đại học */
	MaTruongCDDH: string;
	TenTruongCDDH: string;
	LoaiHinhDaoTaoCDDH: string;

	XepHangCDDH: string;
	ThangNamTotNghiepCDDH: string;
	SoHieuBangTotNghiepCDDH: string;
	SoVaoSoBangTotNghiepCDDH: string;
	NgayKyCapBangTotNghiep: string;
	TotNghiepCaoDang: boolean;
	DiemTBTotNghiepCDDH: number;
	/* #endregion */

	/* #region  Thông tin bằng cao đẳng đại học thứ 2*/
	MaTruongCDDH2: string;
	TenTruongCDDH2: string;
	LoaiHinhDaoTaoCDDH2: string;

	XepHangCDDH2: string;
	ThangNamTotNghiepCDDH2: string;
	SoHieuBangTotNghiepCDDH2: string;
	SoVaoSoBangTotNghiepCDDH2: string;
	NgayKyCapBangTotNghiep2: string;
	/* #endregion */



	ThongTinNangCao: string; // lưu tất cả thông tin trong json
	QuanHuyenId: number; // không biết có dùng không
	PhuongXaId: number;// không biết có dùng không




	/* #region  Thông tin thường trú */
	TinhThanhId: number;
	TinhThanhThuongTruTen: string;
	TinhThanhThuongTru: QuanHuyen;


	QuanHuyenThuongTruId: string;
	QuanHuyenThuongTruTen: string;
	QuanHuyenThuongTru: QuanHuyen;



	PhuongXaThuongTruId: string;
	PhuongXaThuongTruTen: string;
	PhuongXaThuongTru: QuanHuyen;

	DiaChiThuongTru: string;

	DiaChiLienLac: string;
	/* #endregion */


	/* #region  Thông tin tạm trú */

	TinhThanhTamTruId: number;
	TinhThanhTamTruTen: string;
	TinhThanhTamTru: QuanHuyen;

	QuanHuyenTamTruId: number;
	QuanHuyenTamTruTen: string;
	QuanHuyenTamTru: QuanHuyen;

	PhuongXaTamTruId: number;
	PhuongXaTamTruTen: string;
	PhuongXaTamTru: QuanHuyen;
	DiaChiLienLacTamTru: string;
	/* #endregion */


	/* #region  thông tin kiểm tra năng lực */
	NgayKiemTraNangLuc: string;
	SoBaoDanhThiKiemTraNangLuc: string;
	DiaDiemThiNangLuc: string;
	PhongThiNangLuc: string;
	GioThiNangLuc: string;
	DiemThiNangLuc: string;
	/* #endregion */
	HinhThucXet: string;
	DonViLienKet: number;

	//thông tin hình thức sau đại học
	DonViCongTac: string;
	ChucVu: string;
	SoNamCongTac: number;
	DiaChiNoiCongTac: string;
	NganhDHCD: string;
	ChuyenNganhDHCD: string;

	NganhDHCD2: string;
	ChuyenNganhDHCD2: string;
	NgoaiNguDuThi:string;
	DiemThiNgoaiNgu:number;
	DiaDiemDaoTao: number;

	//cột điểm sau khi xét tuyển
	DiemHocBa: string;
	DiemThiTHPT: string;
	DiemKTNL: string;
	CongDiemSauQD:string;
	DiemTong: string;
	MaNganh:string;
	ToHop: string;

	//mã vạch nhưng thí sinh đã nộp hồ sơ tại trường
	MaVach: string;

	/**
	 *
	 */
	constructor(thiSinh?) {
		thiSinh = thiSinh || {},


			/* #region  Thong tin thi sinh */
			this.Id = thiSinh.Id || null,
			this.HoLotVaTen = thiSinh.HoLotVaTen || '',
			this.HoLot = thiSinh.HoLot || null,
			this.Ten = thiSinh.Ten || null,
			this.GioiTinh = thiSinh.GioiTinh || null,
			this.DanToc = thiSinh.DanToc || new DanToc(),
			this.NoiSinhObject = thiSinh.NoiSinhObject || {},
			this.NoiSinh = thiSinh.NoiSinh || null,
			this.NgaySinh = thiSinh.NgaySinh || null,
			this.CMND = thiSinh.CMND || null,
			this.NgayCapCMND = thiSinh.NgayCapCMND || null,
			this.NoiCapCMND = thiSinh.NoiCapCMND || '';
			this.Email = thiSinh.Email || null,
			this.TenDangNhap = thiSinh.TenDangNhap || null,
			this.MatKhau = thiSinh.MatKhau || null,
			this.HoSoNopId = thiSinh.HoSoNopId || null,
			this.KichHoat = thiSinh.KichHoat || null,
			this.NgayTao = thiSinh.NgayTao || null,
			this.NgaySua = thiSinh.NgaySua || null,
			this.NguoiTao = thiSinh.NguoiTao || null,
			this.NguoiSua = thiSinh.NguoiSua || null,
			this.DienThoaiBoHoacMe = thiSinh.DienThoaiBoHoacMe || '';
		this.ThongTinNangCao = thiSinh.ThongTinNangCao || '';

		/* #endregion */


		/* #region  Dia chi Thuong Tru */
		this.TinhThanhId = thiSinh.TinhThanhId || null,
			this.QuanHuyenId = thiSinh.QuanHuyenId || null,
			this.PhuongXaId = thiSinh.PhuongXaId || null,

			this.TinhThanhThuongTru = thiSinh.TinhThanhThuongTru || {},
			this.QuanHuyenThuongTru = thiSinh.QuanHuyenThuongTru || {},
			this.PhuongXaThuongTru = thiSinh.PhuongXaThuongTru || {},
			this.DiaChiLienLac = thiSinh.DiaChiLienLac || null, //  thuong tru
			this.DiaChiThuongTru = thiSinh.DiaChiThuongTru || '',
			/* #endregion */


			/* #region  Dia Chi Tam Tru */
			this.TinhThanhTamTruId = thiSinh.TinhThanhId || null,
			this.QuanHuyenTamTruId = thiSinh.QuanHuyenId || null,
			this.PhuongXaTamTruId = thiSinh.PhuongXaId || null,
			this.TinhThanhTamTru = thiSinh.TinhThanhTamTru || {},
			this.QuanHuyenTamTru = thiSinh.QuanHuyenTamTru || {},
			this.PhuongXaTamTru = thiSinh.PhuongXaTamTru || {},
			this.DiaChiLienLacTamTru = thiSinh.DiaChiLienLacTamTru || null,
			/* #endregion */

			/* #region  THPT 10 */
			this.TinhThanhTHPT10 = thiSinh.TinhThanhTHPT10 || {},
			this.QuanHuyenTHPT10 = thiSinh.QuanHuyenTHPT10 || {},
			this.TruongTHPT10 = thiSinh.TruongTHPT10 || {},
			this.TruongTHPT10Id = thiSinh.TruongTHPT10Id || null,
			this.TruongTHPT10MaTruong = thiSinh.TruongTHPT10MaTruong || null,
			this.TruongTHPT10MaTinh = thiSinh.TruongTHPT10MaTinh || null,

			/* #endregion */



			/* #region  THPT 11 */
			this.TinhThanhTHPT11 = thiSinh.TinhThanhTHPT11 || {},
			this.QuanHuyenTHPT11 = thiSinh.QuanHuyenTHPT11 || {},
			this.TruongTHPT11 = thiSinh.TruongTHPT11 || {},
			this.TruongTHPT11Id = thiSinh.TruongTHPT11Id || null,
			this.TruongTHPT11MaTruong = thiSinh.TruongTHPT11MaTruong || null,
			this.TruongTHPT11MaTinh = thiSinh.TruongTHPT11MaTinh || null,
			/* #endregion */


			/* #region  THPT 12 */
			this.TinhThanhTHPT12 = thiSinh.TinhThanhTHPT12 || {},
			this.QuanHuyenTHPT12 = thiSinh.QuanHuyenTHPT12 || {},
			this.TruongTHPT12 = thiSinh.TruongTHPT12 || {},
			this.TruongTHPT12Id = thiSinh.TruongTHPT12Id || null,
			this.TruongTHPT12MaTruong = thiSinh.TruongTHPT12MaTruong || null,
			this.TruongTHPT12MaTinh = thiSinh.TruongTHPT12MaTinh || null,
			/* #endregion */

			/* #region  Thi THPTQG */
			this.HanhKiemTotNghiepTHPT = thiSinh.HanhKiemTotNghiepTHPT || '',
			this.HocLucTotNghiepTHPT = thiSinh.HocLucTotNghiepTHPT || '',
			this.NamTotNghiepTHPT = thiSinh.NamTotNghiepTHPT || 0,
			this.SoBaoDanhThiTHPTQG = thiSinh.SoBaoDanhThiTHPTQG || '',
			this.SoBaoDanh = thiSinh.SoBaoDanh || null,// khong biet dung cai nao

			this.MaVachThiTHPTQG = thiSinh.MaVachThiTHPTQG || '',
			this.DanTocId = thiSinh.DanTocId || null,
			this.TonGiaoId = thiSinh.TonGiaoId || null,
			this.DoiTuongUuTienId = thiSinh.DoiTuongUuTienId || null,
			this.KhuVucUuTienId = thiSinh.KhuVucUuTienId || null,
			this.DoiTuong3TId = thiSinh.DoiTuong3TId || null,
			this.DoiTuong3T = thiSinh.DoiTuong3T || {},
			this.KhaoSatId = thiSinh.KhaoSatId || null,

			/* #endregion */


			/* #region Bang Cao Dang & Dai Hoc  */

			this.LoaiHinhDaoTaoCDDH = thiSinh.LoaiHinhDaoTaoCDDH || null,
			this.XepHangCDDH = thiSinh.XepHangCDDH || '',
			this.ThangNamTotNghiepCDDH = thiSinh.ThangNamTotNghiepCDDH || '',
			this.SoHieuBangTotNghiepCDDH = thiSinh.SoHieuBangTotNghiepCDDH || '',
			this.SoVaoSoBangTotNghiepCDDH = thiSinh.SoVaoSoBangTotNghiepCDDH || '',
			this.NgayKyCapBangTotNghiep = thiSinh.NgayKyCapBangTotNghiep || '',
			this.TotNghiepCaoDang = thiSinh.TotNghiepCaoDang || false,
			this.DiemTBTotNghiepCDDH = thiSinh.DiemTBTotNghiepCDDH || 0,
			/* #endregion */

			/* #region  Chứng chỉ */
			this.CoDuThiOlympia = thiSinh.CoDuThiOlympia || false;
		this.CoChungChiQuocTe = thiSinh.CoChungChiQuocTe || false;
		this.DongYHeVuaHocVuaLam = thiSinh.DongYHeVuaHocVuaLam || false;
		this.DongYHocQuanTriKinhDoanh = thiSinh.DongYHocQuanTriKinhDoanh || false;
		this.DiaChiNhanBaoTin = thiSinh.DiaChiNhanBaoTin || ''; // địa chỉ nhận giấy báo

		this.ChungChi = thiSinh.ChungChi || {};
		/* #endregion */

		/* #region  thông tin kiểm tra năng lực */
		this.NgayKiemTraNangLuc = thiSinh.NgayKiemTraNangLuc || '';


		this.SoBaoDanhThiKiemTraNangLuc = thiSinh.SoBaoDanhThiKiemTraNangLuc || '';
		this.DiaDiemThiNangLuc = thiSinh.DiaDiemThiNangLuc || '';
		this.PhongThiNangLuc = thiSinh.PhongThiNangLuc || '';
		this.GioThiNangLuc = thiSinh.GioThiNangLuc || '';
		this.DiemThiNangLuc = thiSinh.DiemThiNangLuc || '';
		/* #endregion */

		this.HinhThucXet = thiSinh.HinhThucXet || '';
		this.DonViLienKet = thiSinh.DonViLienKet || null;

		//thông tin sau đại học
		this.DonViCongTac = thiSinh.DonViCongTac || '';
		this.ChucVu = thiSinh.ChucVu || '';
		this.SoNamCongTac = thiSinh.SoNamCongTac || null;
		this.DiaChiNoiCongTac = thiSinh.DiaChiNoiCongTac || '';
		this.NganhDHCD = thiSinh.NganhDHCD || '';
		this.ChuyenNganhDHCD = thiSinh.ChuyenNganhDHCD || '';

		// thông tin văn bằng đại học thứ 2 
		this.MaTruongCDDH2 = thiSinh.MaTruongCDDH2 || '';
		this.TenTruongCDDH2 = thiSinh.TenTruongCDDH2 || '';
		this.LoaiHinhDaoTaoCDDH2 = thiSinh.LoaiHinhDaoTaoCDDH2 || '';
		this.XepHangCDDH2 =thiSinh.XepHangCDDH2 || '';
		this.ThangNamTotNghiepCDDH2 = thiSinh.ThangNamTotNghiepCDDH2 || '';
		this.SoHieuBangTotNghiepCDDH2 = thiSinh.SoHieuBangTotNghiepCDDH2 || '';
		this.NganhDHCD2 = thiSinh.NganhDHCD2 || null;
		this.ChuyenNganhDHCD2 = thiSinh.ChuyenNganhDHCD2 || null;
		this.NgoaiNguDuThi = thiSinh.NgoaiNguDuThi || '';
		this.DiemThiNgoaiNgu = thiSinh.DiemThiNgoaiNgu || null;
		this.DiaDiemDaoTao = thiSinh.DiaDiemDaoTao || null;
		this.TenDanToc = thiSinh.TenDanToc || null;
		this.QuocTich = thiSinh.QuocTich || null;

		//điểm sau khi xét tuyển
		this.DiemHocBa= thiSinh.DiemHocBa || null;
		this.DiemThiTHPT= thiSinh.DiemThiTHPT || null;
		this.DiemKTNL= thiSinh.DiemKTNL || null;
		this.CongDiemSauQD= thiSinh.CongDiemSauQD || null;
		this.DiemTong= thiSinh.DiemTong || null;
		this.MaNganh= thiSinh.MaNganh || null;
		this.ToHop= thiSinh.ToHop || null;

		this.MaVach = thiSinh.MaVach || null;
	}
}

