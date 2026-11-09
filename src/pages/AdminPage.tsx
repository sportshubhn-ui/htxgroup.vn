import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { companyInfo, productsData, facilitiesData, equipmentData } from '@/data/htxData'
import {
  Users,
  Layers,
  Warehouse,
  RefreshCw,
  Search,
  Trash2,
  ExternalLink
} from 'lucide-react'

interface Inquiry {
  code: string
  type: string
  submittedAt: string
  customerName: string
  companyName: string
  phone: string
  email: string
  projectLocation?: string
  wasteType?: string
  estimatedVolume?: string
  notes?: string
  status?: string
}

export function AdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [activeTab, setActiveTab] = useState<'leads' | 'products' | 'facilities' | 'settings'>('leads')
  const [searchLead, setSearchLead] = useState('')

  const loadInquiries = () => {
    try {
      const stored = localStorage.getItem('htx_inquiries')
      if (stored) {
        setInquiries(JSON.parse(stored))
      } else {
        // Seed initial sample inquiries for preview testing
        const sampleInquiries: Inquiry[] = [
          {
            code: 'HTX-202611-8821',
            type: 'thu-gom',
            submittedAt: '09/11/2026, 09:30:15',
            customerName: 'Trần Văn Minh',
            companyName: 'Công ty XD Thăng Long',
            phone: '0912 345 678',
            email: 'minh.tv@thanglongxd.vn',
            projectLocation: 'Dự án Kim Mã, Ba Đình, Hà Nội',
            wasteType: 'Bê tông tháo dỡ',
            estimatedVolume: '45 m³',
            notes: 'Cần khảo sát ngay trong tuần này',
            status: 'new'
          },
          {
            code: 'HTX-202611-6540',
            type: 'dua-vao-bai',
            submittedAt: '08/11/2026, 14:10:00',
            customerName: 'Hoàng Anh Tuấn',
            companyName: 'Đội xe vận tải 36',
            phone: '0988 776 554',
            email: '',
            projectLocation: 'Ngõ 46 Liên Mạc, Thượng Cát, Tây Hồ',
            wasteType: 'Trạc gạch vỡ công trình',
            estimatedVolume: '3 xe 4 chân',
            notes: 'Xe đến lúc 15:00',
            status: 'contacted'
          }
        ]
        setInquiries(sampleInquiries)
        localStorage.setItem('htx_inquiries', JSON.stringify(sampleInquiries))
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadInquiries()
  }, [])

  const updateLeadStatus = (code: string, newStatus: string) => {
    const updated = inquiries.map((item) =>
      item.code === code ? { ...item, status: newStatus } : item
    )
    setInquiries(updated)
    localStorage.setItem('htx_inquiries', JSON.stringify(updated))
  }

  const deleteLead = (code: string) => {
    if (confirm(`Bạn có chắc muốn xóa yêu cầu mã ${code}?`)) {
      const updated = inquiries.filter((i) => i.code !== code)
      setInquiries(updated)
      localStorage.setItem('htx_inquiries', JSON.stringify(updated))
    }
  }

  const filteredInquiries = inquiries.filter(
    (i) =>
      i.customerName?.toLowerCase().includes(searchLead.toLowerCase()) ||
      i.code?.toLowerCase().includes(searchLead.toLowerCase()) ||
      i.phone?.includes(searchLead)
  )

  return (
    <div className="bg-gray-100 min-h-screen py-8 text-[#172D24]">
      <SEO
        title="Cổng Quản Trị Hệ Thống (Preview CMS) – Hành Tinh Xanh"
        description="Bảng điều khiển quản trị hệ thống tiếp nhận yêu cầu báo giá và quản lý nội dung danh mục Hành Tinh Xanh."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-emerald-100 text-[#064D35] text-[10px] font-bold rounded uppercase">
                Admin Console Preview
              </span>
              <span className="text-xs text-gray-500">Môi trường thử nghiệm</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Quản Trị Hành Tinh Xanh (HTX Group)
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 flex items-center gap-1.5"
            >
              <span>Xem trang ngoài</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={loadInquiries}
              className="px-4 py-2 bg-[#064D35] text-white rounded-xl text-xs font-bold uppercase flex items-center gap-1.5 hover:bg-[#043826] cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Tải lại dữ liệu</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'leads' ? 'bg-[#064D35] text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Yêu cầu báo giá ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'products' ? 'bg-[#064D35] text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Danh mục vật liệu ({productsData.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('facilities')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'facilities' ? 'bg-[#064D35] text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Warehouse className="w-4 h-4" />
            <span>Cơ sở & Thiết bị ({facilitiesData.length + equipmentData.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'settings' ? 'bg-[#064D35] text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>Cấu hình pháp nhân</span>
          </button>
        </div>

        {/* Tab 1: Leads */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <h3 className="font-bold text-sm text-gray-900 uppercase">
                Danh sách yêu cầu tiếp nhận trực tuyến
              </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchLead}
                  onChange={(e) => setSearchLead(e.target.value)}
                  placeholder="Tìm theo tên, SĐT, mã..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-700">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Mã số / Thời gian</th>
                    <th className="py-3 px-4">Loại hình</th>
                    <th className="py-3 px-4">Khách hàng / SĐT</th>
                    <th className="py-3 px-4">Nội dung / Khối lượng</th>
                    <th className="py-3 px-4">Trạng thái</th>
                    <th className="py-3 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-400">
                        Chưa có yêu cầu nào được ghi nhận.
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inq) => (
                      <tr key={inq.code} className="hover:bg-gray-50 transition">
                        <td className="py-3 px-4 font-mono">
                          <span className="font-bold text-[#064D35] block">{inq.code}</span>
                          <span className="text-[10px] text-gray-400">{inq.submittedAt}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded font-semibold text-[10px]">
                            {inq.type === 'thu-gom'
                              ? 'Thu gom công trình'
                              : inq.type === 'dua-vao-bai'
                              ? 'Vào bãi Liên Mạc'
                              : 'Mua vật liệu'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <strong className="text-gray-900 block">{inq.customerName}</strong>
                          <span className="text-gray-500">{inq.phone}</span>
                          {inq.companyName && <span className="block text-[10px] text-gray-400">{inq.companyName}</span>}
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <span className="font-semibold block">{inq.wasteType || 'Đơn hàng vật liệu'}</span>
                          <span className="text-gray-500">{inq.estimatedVolume}</span>
                          {inq.projectLocation && (
                            <span className="block text-[10px] text-gray-400 truncate">Vị trí: {inq.projectLocation}</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={inq.status || 'new'}
                            onChange={(e) => updateLeadStatus(inq.code, e.target.value)}
                            className="text-xs p-1 rounded border border-gray-300 bg-white font-medium"
                          >
                            <option value="new">Mới tiếp nhận (New)</option>
                            <option value="contacted">Đã liên hệ (Contacted)</option>
                            <option value="quoted">Đã báo giá (Quoted)</option>
                            <option value="in_progress">Đang thực hiện (In Progress)</option>
                            <option value="closed">Hoàn tất (Closed)</option>
                            <option value="cancelled">Hủy (Cancelled)</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => deleteLead(inq.code)}
                            className="p-1 text-red-500 hover:text-red-700"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Products */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase">
              Danh mục 06 hạt nhân vật liệu (product-seeds.json)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productsData.map((p) => (
                <div key={p.slug} className="p-4 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-xs text-gray-900">{p.name}</h4>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] rounded font-bold uppercase">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500">{p.specification}</p>
                  <div className="text-[11px] text-gray-700 pt-1 flex justify-between">
                    <span>Đơn vị: {p.unit}</span>
                    <span className="font-semibold text-[#064D35]">{p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Facilities */}
        {activeTab === 'facilities' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
              <h3 className="font-bold text-sm text-gray-900 uppercase">
                Bãi tập kết & Xử lý chất thải rắn xây dựng
              </h3>
              {facilitiesData.map((f) => (
                <div key={f.id} className="p-4 bg-gray-50 rounded-xl space-y-2 text-xs">
                  <strong className="text-sm font-bold text-[#064D35] block">{f.name}</strong>
                  <p className="text-gray-700"><strong>Địa chỉ:</strong> {f.address}</p>
                  <p className="text-gray-700"><strong>Giờ mở cửa:</strong> {f.openingHours}</p>
                  <p className="text-gray-700"><strong>Trạm cân:</strong> {f.weighbridge}</p>
                  <p className="text-gray-700"><strong>Tọa độ:</strong> {f.coordinates}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
              <h3 className="font-bold text-sm text-gray-900 uppercase">
                Danh sách thiết bị cơ giới ({equipmentData.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equipmentData.map((eq) => (
                  <div key={eq.slug} className="p-4 border border-gray-200 rounded-xl space-y-1 text-xs">
                    <h4 className="font-bold text-gray-900">{eq.name}</h4>
                    <p className="text-gray-600">{eq.role}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-[#064D35] text-[10px] font-bold rounded">
                      {eq.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-gray-900 uppercase">
              Cấu hình thông tin doanh nghiệp (company.config.json)
            </h3>
            <div className="space-y-3 max-w-xl">
              <div>
                <span className="text-gray-500 block">Tên pháp nhân:</span>
                <span className="font-bold text-gray-900">{companyInfo.name}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Slogan:</span>
                <span className="font-semibold text-[#064D35]">"{companyInfo.slogan}"</span>
              </div>
              <div>
                <span className="text-gray-500 block">Hotline 24/7:</span>
                <span className="font-bold text-gray-900">{companyInfo.hotline}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Trụ sở chính:</span>
                <span className="text-gray-800">{companyInfo.officeAddress}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Bãi tập kết tiếp nhận:</span>
                <span className="text-gray-800 font-bold">{companyInfo.yardAddress}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
