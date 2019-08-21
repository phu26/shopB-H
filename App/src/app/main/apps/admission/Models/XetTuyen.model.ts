import { NganhDaoTao } from "./NganhDaoTao.model";

export class XetTuyen {
    Id: number;
    NganhDaoTaoId: number;
    DotTuyenSinhId: number;
    NganhDaoTao: NganhDaoTao;
    ChiTieu: number;
    ChiTieuVuot: number;
    DiemSan: number;
    DiemChuan: number;
    DanhSachToHopMon: string;
    constructor(xetTuyen?) {
        xetTuyen = xetTuyen || {};
        this.Id = xetTuyen.Id || null,
        this.NganhDaoTaoId = xetTuyen.NganhDaoTaoId || null,
        this.DotTuyenSinhId = xetTuyen.DotTuyenSinhId || null,
        this.NganhDaoTao = xetTuyen.NganhDaoTao || null,
        this.ChiTieu = xetTuyen.ChiTieu || 0,
        this.ChiTieuVuot = xetTuyen.ChiTieuVuot || 0,
        this.DiemSan = xetTuyen.DiemSan || 0,
        this.DiemChuan = xetTuyen.DiemChuan || 0,
        this.DanhSachToHopMon = xetTuyen.DanhSachToHopMon || '';       
    }
}