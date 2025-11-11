"use client"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">Về chúng tôi</h4>
            <p className="text-sm text-muted-foreground">
              Khám phá lịch sử vật liệu và ảnh hưởng của chúng đến kinh tế toàn cầu
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Liên kết</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#timeline" className="hover:text-foreground transition">
                  Timeline
                </a>
              </li>
              <li>
                <a href="#materials" className="hover:text-foreground transition">
                  Vật liệu
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-foreground transition">
                  Ảnh hưởng
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Tài nguyên</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Bài viết
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Nghiên cứu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Thống kê
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:info@materialshistory.com" className="hover:text-foreground transition">
                  Email
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2025 Materials History. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Chính sách bảo mật
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Điều khoản sử dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
