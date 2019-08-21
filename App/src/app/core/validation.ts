export class RegExpClass {
    public static readonly Email = "^([a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,})){1}(;[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,}))*$";
    public static readonly CMND = "^[0-9]{9}([0-9]{3})?$";
    //public static readonly SDT ="^[0-9]{10}([0-9]{2})?$";
    public static readonly SDT = "^(\\+84|0)[0-9]{8,10}$";
    public static readonly Diem = "^(10|[0-9]{1}(\\.[0-9]{1,2})?)$";
    public static readonly DiemSAT = "^([0-9]{3,4}(\\.[0-9]{1,2})?)$";
    public static readonly DiemHon10 = "^([0-9]+(\\.[0-9]{1,2})?)$";
    public static readonly SoLuongNV = "^([0-9]\d{1})$";
}