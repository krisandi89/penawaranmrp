{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ useState, useEffect \} from 'react';\
import \{ PlusCircle, Trash2, Printer \} from 'lucide-react';\
\
export default function App() \{\
  // State variables\
  const [nomorSurat, setNomorSurat] = useState('');\
  const [tanggalSurat, setTanggalSurat] = useState(new Date());\
  const [perusahaan, setPerusahaan] = useState(\{\
    nama: '',\
    jalan: '',\
    kecamatan: '',\
    kelurahan: '',\
    kota: '',\
    provinsi: '',\
    kodePos: ''\
  \});\
  const [up, setUp] = useState(\{\
    nama: '',\
    jabatan: '',\
    telepon: '',\
    email: ''\
  \});\
  const [hal, setHal] = useState('Penawaran Harga Material Geomembrane & Instalasi');\
  const [proyek, setProyek] = useState('');\
  const [kalimatPembuka, setKalimatPembuka] = useState(\
    'Menindaklanjuti permohonan penawaran harga resmi kami untuk proyek tersebut, maka bersama ini saya kirimkan harga produk kami sebagai berikut:'\
  );\
  const [showTotal, setShowTotal] = useState(true);\
  const [termsType, setTermsType] = useState('material-installation');\
  const [customTerms, setCustomTerms] = useState('');\
  const [paymentMethod, setPaymentMethod] = useState('default');\
  const [customPayment, setCustomPayment] = useState('');\
  const [useDefaultValidity, setUseDefaultValidity] = useState(true);\
  const [validityDate, setValidityDate] = useState(new Date());\
  const [signatory, setSignatory] = useState('krisandi');\
  const [tableRows, setTableRows] = useState([\
    \{ \
      material: 'GEOMEMBRANE HDPE Merk: HUITEX 30 MIL Ketebalan: 0,75mm Dimensi Roll: 7m x 210m', \
      volume: '15000', \
      harga: '38000', \
      satuan: 'm\'b2' \
    \},\
    \{ \
      material: 'Instalasi Geomembrane', \
      volume: '15000', \
      harga: '8500', \
      satuan: 'm\'b2' \
    \}\
  ]);\
\
  // Signatory templates\
  const signatories = [\
    \{\
      id: 'isparmo',\
      name: 'Ir. Isparmo, IPM',\
      position: 'Marketing Manager',\
      contact: '0812 108 3060'\
    \},\
    \{\
      id: 'nuruzzaman',\
      name: 'Ir. Nuruzzaman',\
      position: 'Technical & Marketing Manager',\
      contact: '0811-877-022'\
    \},\
    \{\
      id: 'krisandi',\
      name: 'Ir. Krisandi Saptyanto',\
      position: 'Design and Project Manager',\
      contact: '+62-821-1012-8965'\
    \},\
    \{\
      id: 'astri',\
      name: 'Ir. Astri Juwita P.',\
      position: 'Design & Product Manager',\
      contact: '+62 813-1772-1939'\
    \},\
    \{\
      id: 'antonius',\
      name: 'Ir. Antonius Bagus Wijaya',\
      position: 'Design & Estimate Manager',\
      contact: '+62 817 690 4874'\
    \}\
  ];\
\
  // Terms templates\
  const termsMaterialInstallation = `\'95 Harga Material Locco Gudang Multibangun di Bitung, Tangerang.\
\'95 Harga Material dan Instalasi belum termasuk PPN 11%.\
\'95 Harga Instalasi tidak termasuk genset 10 kVA & dewatering pump.\
\'95 Harga Instalasi tidak termasuk persiapan lahan dan pekerjaan tanah seperti penggalian, penimbunan dan pembuatan angkur.\
\'95 Harga Instalasi tidak termasuk Unskilled labor (kuli gelar) dan besi angkur.\
\'95 Harga Instalasi tidak termasuk peralatan tambahan seperti plat strip, baut, dll bila diperlukan.\
\'95 Harga Instalasi tidak termasuk biaya langsir Material.\
\'95 Harga Instalasi sudah termasuk akomodasi, transportasi, penginapan dan tes kesehatan untuk installer.\
\'95 Harga Instalasi dengan asumsi pekerjaan dilakukan bukan pada musim hujan.\
\'95 Harga Material dan Instalasi di atas sesuai dengan kebutuhan volume $\{calculateTotalVolume()\} m\'b2.`;\
\
  const termsMaterialOnly = `\'95 Harga Material Locco Gudang Multibangun di Bitung, Tangerang.\
\'95 Harga Material belum termasuk PPN 11%.\
\'95 Harga Material di atas sesuai dengan kebutuhan volume $\{calculateTotalVolume()\} m\'b2.`;\
\
  // Payment method templates\
  const paymentDefault = `\'95 Material: Cash in Advance.\
\'95 Instalasi: DP 50%, sisa pelunasan sesuai dengan prosentase progress pekerjaan secara bertahap.\
\'95 Pengambilan Material setelah Purchase Order dan pembayaran diterima.\
\'95 Material Ready Stock.`;\
\
  const paymentCustom = `\'95 Material: Cash in Advance.\
\'95 Instalasi: DP XX%, sisa pelunasan sesuai dengan prosentase progress pekerjaan secara bertahap.\
\'95 Pengambilan Material setelah Purchase Order dan pembayaran diterima.\
\'95 Material Ready Stock.`;\
\
  // Helper functions\
  const formatDate = (date) => \{\
    if (!date) return '';\
    const options = \{ day: 'numeric', month: 'long', year: 'numeric' \};\
    return date.toLocaleDateString('id-ID', options);\
  \};\
\
  const formatRupiah = (num) => \{\
    if (num === '' || num === null || num === undefined) return '';\
    const number = typeof num === 'string' ? parseFloat(num.replace(/[^0-9]/g, '')) : num;\
    if (isNaN(number)) return 'Rp 0';\
    return 'Rp ' + number.toLocaleString('id-ID');\
  \};\
\
  const parseRupiah = (str) => \{\
    return str.replace(/[^0-9]/g, '');\
  \};\
\
  const addWorkingDays = (startDate, days) => \{\
    let date = new Date(startDate);\
    let count = 0;\
    while (count < days) \{\
      date.setDate(date.getDate() + 1);\
      // 0 is Sunday, 6 is Saturday\
      if (date.getDay() > 0 && date.getDay() < 6) \{\
        count++;\
      \}\
    \}\
    return date;\
  \};\
\
  const calculateTotalVolume = () => \{\
    return tableRows.reduce((sum, row) => \{\
      const volume = parseFloat(row.volume) || 0;\
      return sum + volume;\
    \}, 0).toLocaleString('id-ID');\
  \};\
\
  const calculateTotalHarga = () => \{\
    return tableRows.reduce((sum, row) => \{\
      const volume = parseFloat(row.volume) || 0;\
      const harga = parseFloat(row.harga) || 0;\
      return sum + (volume * harga);\
    \}, 0);\
  \};\
\
  // Effects\
  useEffect(() => \{\
    // Set default validity date (12 working days from today)\
    const defaultValidity = addWorkingDays(new Date(), 12);\
    setValidityDate(defaultValidity);\
  \}, []);\
\
  // Event handlers\
  const handleAddRow = () => \{\
    setTableRows([...tableRows, \{ material: '', volume: '', harga: '', satuan: 'm\'b2' \}]);\
  \};\
\
  const handleRemoveRow = (index) => \{\
    const newRows = [...tableRows];\
    newRows.splice(index, 1);\
    setTableRows(newRows);\
  \};\
\
  const handleRowChange = (index, field, value) => \{\
    const newRows = [...tableRows];\
    newRows[index][field] = value;\
    setTableRows(newRows);\
  \};\
\
  const handlePrint = () => \{\
    window.print();\
  \};\
\
  // Render\
  return (\
    <div className="min-h-screen bg-gray-50 print:bg-white">\
      <div className="max-w-6xl mx-auto p-6">\
        <div className="flex justify-between items-center mb-8 no-print">\
          <h1 className="text-2xl font-bold text-gray-800">PenawaranPro - Pembuat Surat Penawaran Harga</h1>\
          <div className="flex gap-3">\
            <button \
              onClick=\{handlePrint\}\
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"\
            >\
              <Printer size=\{18\} />\
              Cetak Surat\
            </button>\
          </div>\
        </div>\
\
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">\
          \{/* Form Section */\}\
          <div className="bg-white p-6 rounded-xl shadow-md">\
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">Form Input Surat Penawaran</h2>\
            \
            \{/* Nomor Surat */\}\
            <div className="mb-6">\
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Surat</label>\
              <input\
                type="text"\
                value=\{nomorSurat\}\
                onChange=\{(e) => setNomorSurat(e.target.value)\}\
                placeholder="XXX/MRP/PWRN/V/2024"\
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
              />\
              <p className="mt-1 text-sm text-gray-500">Contoh: 216/MRP/PWRN/VIII/2025</p>\
            </div>\
\
            \{/* Informasi Perusahaan Penerima */\}\
            <div className="mb-6">\
              <h3 className="text-lg font-medium mb-4">Informasi Perusahaan Penerima</h3>\
              \
              <div className="space-y-4">\
                <div>\
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan</label>\
                  <input\
                    type="text"\
                    value=\{perusahaan.nama\}\
                    onChange=\{(e) => setPerusahaan(\{...perusahaan, nama: e.target.value\})\}\
                    placeholder="PT HISENOR TECHNOLOGY INDONESIA"\
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                  />\
                </div>\
                \
                <div>\
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jalan & Nomor</label>\
                  <input\
                    type="text"\
                    value=\{perusahaan.jalan\}\
                    onChange=\{(e) => setPerusahaan(\{...perusahaan, jalan: e.target.value\})\}\
                    placeholder="Jl. Raya Raja Basa RT/RW: 010/004"\
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                  />\
                </div>\
                \
                <div className="grid grid-cols-2 gap-4">\
                  <div>\
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>\
                    <input\
                      type="text"\
                      value=\{perusahaan.kecamatan\}\
                      onChange=\{(e) => setPerusahaan(\{...perusahaan, kecamatan: e.target.value\})\}\
                      placeholder="Raja Basa"\
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                    />\
                  </div>\
                  \
                  <div>\
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kelurahan</label>\
                    <input\
                      type="text"\
                      value=\{perusahaan.kelurahan\}\
                      onChange=\{(e) => setPerusahaan(\{...perusahaan, kelurahan: e.target.value\})\}\
                      placeholder="Kunjir"\
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                    />\
                  </div>\
                </div>\
                \
                <div className="grid grid-cols-2 gap-4">\
                  <div>\
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>\
                    <input\
                      type="text"\
                      value=\{perusahaan.kota\}\
                      onChange=\{(e) => setPerusahaan(\{...perusahaan, kota: e.target.value\})\}\
                      placeholder="Lampung Selatan"\
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                    />\
                  </div>\
                  \
                  <div>\
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>\
                    <input\
                      type="text"\
                      value=\{perusahaan.provinsi\}\
                      onChange=\{(e) => setPerusahaan(\{...perusahaan, provinsi: e.target.value\})\}\
                      placeholder="LAMPUNG"\
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                    />\
                  </div>\
                </div>\
                \
                <div>\
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>\
                  <input\
                    type="text"\
                    value=\{perusahaan.kodePos\}\
                    onChange=\{(e) => setPerusahaan(\{...perusahaan, kodePos: e.target.value\})\}\
                    placeholder="12345"\
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                  />\
                </div>\
              </div>\
            </div>\
\
            \{/* UP Section */\}\
            <div className="mb-6">\
              <h3 className="text-lg font-medium mb-4">Informasi UP (Untuk Perhatian)</h3>\
              \
              <div className="space-y-4">\
                <div>\
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>\
                  <input\
                    type="text"\
                    value=\{up.nama\}\
                    onChange=\{(e) => setUp(\{...up, nama: e.target.value\})\}\
                    placeholder="Bapak Sikan Tan"\
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                  />\
                </div>\
                \
                <div>\
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>\
                  <input\
                    type="text"\
                    value=\{up.jabatan\}\
                    onChange=\{(e) => setUp(\{...up, jabatan: e.target.value\})\}\
                    placeholder="Project Manager"\
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                  />\
                </div>\
                \
                <div>\
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>\
                  <input\
                    type="text"\
                    value=\{up.telepon\}\
                    onChange=\{(e) => setUp(\{...up, telepon: e.target.value\})\}\
                    placeholder="0812 7898 9893"\
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                  />\
                </div>\
                \
                <div>\
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>\
                  <input\
                    type="email"\
                    value=\{up.email\}\
                    onChange=\{(e) => setUp(\{...up, email: e.target.value\})\}\
                    placeholder="hisenorlampung@gmail.com"\
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                  />\
                </div>\
              </div>\
            </div>\
\
            \{/* Informasi Surat */\}\
            <div className="mb-6">\
              <h3 className="text-lg font-medium mb-4">Informasi Surat</h3>\
              \
              <div className="space-y-4">\
                <div>\
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hal</label>\
                  <select\
                    value=\{hal\}\
                    onChange=\{(e) => setHal(e.target.value)\}\
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                  >\
                    <option value="Penawaran Harga Material Geomembrane & Instalasi">Penawaran Harga Material Geomembrane & Instalasi</option>\
                    <option value="Penawaran Harga Material Geomembrane">Penawaran Harga Material Geomembrane</option>\
                    <option value="Penawaran Harga Instalasi Geomembrane">Penawaran Harga Instalasi Geomembrane</option>\
                    <option value="custom">Custom</option>\
                  </select>\
                  \{hal === 'custom' && (\
                    <input\
                      type="text"\
                      value=\{hal\}\
                      onChange=\{(e) => setHal(e.target.value)\}\
                      placeholder="Masukkan hal surat"\
                      className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                    />\
                  )\}\
                </div>\
                \
                <div>\
                  <label className="block text-sm font-medium text-gray-700 mb-1">Proyek</label>\
                  <input\
                    type="text"\
                    value=\{proyek\}\
                    onChange=\{(e) => setProyek(e.target.value)\}\
                    placeholder="Hatchery Vaname, Lampung"\
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                  />\
                </div>\
                \
                <div>\
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kalimat Pembuka</label>\
                  <textarea\
                    value=\{kalimatPembuka\}\
                    onChange=\{(e) => setKalimatPembuka(e.target.value)\}\
                    rows="3"\
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                  />\
                </div>\
              </div>\
            </div>\
\
            \{/* Tabel Penawaran */\}\
            <div className="mb-6">\
              <div className="flex justify-between items-center mb-4">\
                <h3 className="text-lg font-medium">Tabel Penawaran</h3>\
                <button\
                  onClick=\{handleAddRow\}\
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"\
                >\
                  <PlusCircle size=\{18\} />\
                  Tambah Baris\
                </button>\
              </div>\
              \
              <div className="overflow-x-auto">\
                <table className="w-full border-collapse">\
                  <thead>\
                    <tr className="bg-gray-50">\
                      <th className="border border-gray-300 px-3 py-2 text-left">Material</th>\
                      <th className="border border-gray-300 px-3 py-2 text-left">Volume</th>\
                      <th className="border border-gray-300 px-3 py-2 text-left">Harga</th>\
                      <th className="border border-gray-300 px-3 py-2 text-left">Jumlah Harga</th>\
                      <th className="border border-gray-300 px-3 py-2"></th>\
                    </tr>\
                  </thead>\
                  <tbody>\
                    \{tableRows.map((row, index) => (\
                      <tr key=\{index\}>\
                        <td className="border border-gray-300 px-3 py-2">\
                          <input\
                            type="text"\
                            value=\{row.material\}\
                            onChange=\{(e) => handleRowChange(index, 'material', e.target.value)\}\
                            className="w-full outline-none"\
                            placeholder="GEOMEMBRANE HDPE Merk: HUITEX 30 MIL..."\
                          />\
                        </td>\
                        <td className="border border-gray-300 px-3 py-2">\
                          <div className="flex">\
                            <input\
                              type="number"\
                              value=\{row.volume\}\
                              onChange=\{(e) => handleRowChange(index, 'volume', e.target.value)\}\
                              className="w-20 outline-none text-right"\
                              placeholder="0"\
                            />\
                            <select\
                              value=\{row.satuan\}\
                              onChange=\{(e) => handleRowChange(index, 'satuan', e.target.value)\}\
                              className="ml-1 border-none outline-none bg-transparent"\
                            >\
                              <option value="m\'b2">m\'b2</option>\
                              <option value="m\'b3">m\'b3</option>\
                              <option value="unit">unit</option>\
                              <option value="roll">roll</option>\
                              <option value="hari">hari</option>\
                            </select>\
                          </div>\
                        </td>\
                        <td className="border border-gray-300 px-3 py-2">\
                          <input\
                            type="text"\
                            value=\{formatRupiah(row.harga)\}\
                            onChange=\{(e) => \{\
                              const rawValue = parseRupiah(e.target.value);\
                              handleRowChange(index, 'harga', rawValue);\
                            \}\}\
                            onBlur=\{(e) => \{\
                              const rawValue = parseRupiah(e.target.value);\
                              handleRowChange(index, 'harga', rawValue);\
                            \}\}\
                            className="w-full outline-none text-right"\
                            placeholder="Rp 0"\
                          />\
                        </td>\
                        <td className="border border-gray-300 px-3 py-2 font-medium">\
                          \{formatRupiah((parseFloat(row.volume) || 0) * (parseFloat(row.harga) || 0))\}\
                        </td>\
                        <td className="border border-gray-300 px-3 py-2">\
                          <button\
                            onClick=\{() => handleRemoveRow(index)\}\
                            className="text-red-500 hover:text-red-700"\
                          >\
                            <Trash2 size=\{16\} />\
                          </button>\
                        </td>\
                      </tr>\
                    ))\}\
                  </tbody>\
                </table>\
              </div>\
              \
              <div className="mt-3 flex items-center">\
                <input\
                  type="checkbox"\
                  id="showTotal"\
                  checked=\{showTotal\}\
                  onChange=\{(e) => setShowTotal(e.target.checked)\}\
                  className="mr-2"\
                />\
                <label htmlFor="showTotal" className="text-sm text-gray-700">Tampilkan total harga di tabel</label>\
              </div>\
            </div>\
\
            \{/* Kondisi Penawaran */\}\
            <div className="mb-6">\
              <h3 className="text-lg font-medium mb-4">Kondisi Penawaran</h3>\
              \
              <div className="space-y-3 mb-4">\
                <label className="flex items-center">\
                  <input\
                    type="radio"\
                    name="termsType"\
                    value="material-only"\
                    checked=\{termsType === 'material-only'\}\
                    onChange=\{(e) => setTermsType(e.target.value)\}\
                    className="mr-2"\
                  />\
                  Material saja\
                </label>\
                \
                <label className="flex items-center">\
                  <input\
                    type="radio"\
                    name="termsType"\
                    value="material-installation"\
                    checked=\{termsType === 'material-installation'\}\
                    onChange=\{(e) => setTermsType(e.target.value)\}\
                    className="mr-2"\
                  />\
                  Material dan Instalasi\
                </label>\
                \
                <label className="flex items-center">\
                  <input\
                    type="radio"\
                    name="termsType"\
                    value="custom"\
                    checked=\{termsType === 'custom'\}\
                    onChange=\{(e) => setTermsType(e.target.value)\}\
                    className="mr-2"\
                  />\
                  Custom\
                </label>\
              </div>\
              \
              \{termsType === 'custom' ? (\
                <textarea\
                  value=\{customTerms\}\
                  onChange=\{(e) => setCustomTerms(e.target.value)\}\
                  rows="6"\
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                  placeholder="Masukkan kondisi penawaran custom..."\
                />\
              ) : (\
                <div className="bg-gray-50 p-4 rounded-md min-h-[200px]">\
                  <pre className="whitespace-pre-wrap font-sans text-sm">\{termsType === 'material-only' ? termsMaterialOnly : termsMaterialInstallation\}</pre>\
                </div>\
              )\}\
            </div>\
\
            \{/* Metode Pembayaran */\}\
            <div className="mb-6">\
              <h3 className="text-lg font-medium mb-4">Metode Pembayaran</h3>\
              \
              <div className="space-y-3 mb-4">\
                <label className="flex items-center">\
                  <input\
                    type="radio"\
                    name="paymentMethod"\
                    value="default"\
                    checked=\{paymentMethod === 'default'\}\
                    onChange=\{(e) => setPaymentMethod(e.target.value)\}\
                    className="mr-2"\
                  />\
                  Template Default\
                </label>\
                \
                <label className="flex items-center">\
                  <input\
                    type="radio"\
                    name="paymentMethod"\
                    value="custom"\
                    checked=\{paymentMethod === 'custom'\}\
                    onChange=\{(e) => setPaymentMethod(e.target.value)\}\
                    className="mr-2"\
                  />\
                  Custom\
                </label>\
              </div>\
              \
              \{paymentMethod === 'custom' ? (\
                <textarea\
                  value=\{customPayment\}\
                  onChange=\{(e) => setCustomPayment(e.target.value)\}\
                  rows="5"\
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                  placeholder="Masukkan metode pembayaran custom..."\
                />\
              ) : (\
                <div className="bg-gray-50 p-4 rounded-md min-h-[150px]">\
                  <pre className="whitespace-pre-wrap font-sans text-sm">\{paymentDefault\}</pre>\
                </div>\
              )\}\
            </div>\
\
            \{/* Masa Berlaku Penawaran */\}\
            <div className="mb-6">\
              <h3 className="text-lg font-medium mb-4">Masa Berlaku Penawaran</h3>\
              \
              <div className="flex items-center mb-2">\
                <input\
                  type="checkbox"\
                  id="defaultValidity"\
                  checked=\{useDefaultValidity\}\
                  onChange=\{(e) => \{\
                    setUseDefaultValidity(e.target.checked);\
                    if (!e.target.checked) \{\
                      setValidityDate(new Date());\
                    \} else \{\
                      setValidityDate(addWorkingDays(new Date(), 12));\
                    \}\
                  \}\}\
                  className="mr-2"\
                />\
                <label htmlFor="defaultValidity" className="text-sm text-gray-700">Hitung 12 hari kerja dari hari ini</label>\
              </div>\
              \
              \{!useDefaultValidity && (\
                <input\
                  type="date"\
                  value=\{validityDate.toISOString().split('T')[0]\}\
                  onChange=\{(e) => setValidityDate(new Date(e.target.value))\}\
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"\
                />\
              )\}\
              \
              <div className="mt-3 p-3 bg-blue-50 rounded-md">\
                <p className="text-sm text-blue-800">\
                  Penawaran harga ini berlaku sampai dengan tanggal <strong>\{formatDate(validityDate)\}</strong>\
                </p>\
              </div>\
            </div>\
\
            \{/* Penandatangan */\}\
            <div className="mb-6">\
              <h3 className="text-lg font-medium mb-4">Penandatangan</h3>\
              \
              <div className="space-y-2">\
                \{signatories.map((sig) => (\
                  <label key=\{sig.id\} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">\
                    <input\
                      type="radio"\
                      name="signatory"\
                      value=\{sig.id\}\
                      checked=\{signatory === sig.id\}\
                      onChange=\{(e) => setSignatory(e.target.value)\}\
                      className="mr-2"\
                    />\
                    <div>\
                      <div className="font-medium">\{sig.name\}</div>\
                      <div className="text-sm text-gray-600">\{sig.position\}</div>\
                      <div className="text-sm text-gray-500">\{sig.contact\}</div>\
                    </div>\
                  </label>\
                ))\}\
              </div>\
            </div>\
          </div>\
\
          \{/* Preview Section */\}\
          <div className="bg-white p-6 rounded-xl shadow-md print:shadow-none print:p-0">\
            <h2 className="text-xl font-semibold mb-6 border-b pb-2 no-print">Preview Surat Penawaran</h2>\
            \
            <div className="print:border print:p-6">\
              \{/* Surat Penawaran */\}\
              <div className="font-serif">\
                <div className="text-right mb-6">\
                  <p className="font-medium">No. \{nomorSurat || 'XXX /MRP/PWRN/ V/2024'\}</p>\
                  <p>\{tanggalSurat ? `Jakarta, $\{formatDate(tanggalSurat)\}` : 'Jakarta, XX Mei 2024'\}</p>\
                </div>\
                \
                <div className="mb-6">\
                  <p className="font-medium">Kepada Yth.:</p>\
                  <p className="font-bold uppercase">\{perusahaan.nama || 'NAMA PERUSAHAAN LENGKAP DAN HURUF KAPITAL SEMUA'\}</p>\
                  \{perusahaan.jalan && <p>\{perusahaan.jalan\}</p>\}\
                  \{perusahaan.kecamatan && perusahaan.kelurahan && (\
                    <p>\{perusahaan.kecamatan\}, \{perusahaan.kelurahan\}</p>\
                  )\}\
                  \{perusahaan.kota && perusahaan.provinsi && (\
                    <p>\{perusahaan.kota\} \'96 \{perusahaan.provinsi.toUpperCase()\}, \{perusahaan.kodePos\}</p>\
                  )\}\
                  <p className="mt-2">Up &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;\{up.nama || 'Bapak/Ibu Nama'\}</p>\
                  \{up.telepon && <p>Telepon &nbsp;: &nbsp;\{up.telepon\}</p>\}\
                  \{up.email && <p>Email &nbsp;&nbsp;&nbsp;: &nbsp;\{up.email\}</p>\}\
                  <p>Hal &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;\{hal\}</p>\
                  <p>Proyek &nbsp;&nbsp;: &nbsp;\{proyek || 'Nama Proyek Harus Ada'\}</p>\
                </div>\
                \
                <p className="mb-4">Dengan hormat,</p>\
                \
                <p className="mb-6 whitespace-pre-wrap">\{kalimatPembuka\}</p>\
                \
                \{/* Tabel */\}\
                <div className="mb-6 overflow-x-auto">\
                  <table className="w-full border-collapse">\
                    <thead>\
                      <tr>\
                        <th className="border border-gray-400 px-3 py-2 text-left">Material</th>\
                        <th className="border border-gray-400 px-3 py-2 text-left">Volume</th>\
                        <th className="border border-gray-400 px-3 py-2 text-left">Harga</th>\
                        <th className="border border-gray-400 px-3 py-2 text-left">Jumlah Harga</th>\
                      </tr>\
                    </thead>\
                    <tbody>\
                      \{tableRows.map((row, index) => (\
                        <tr key=\{index\}>\
                          <td className="border border-gray-400 px-3 py-2">\{row.material\}</td>\
                          <td className="border border-gray-400 px-3 py-2">\{row.volume\} \{row.satuan\}</td>\
                          <td className="border border-gray-400 px-3 py-2">\{formatRupiah(row.harga)\}</td>\
                          <td className="border border-gray-400 px-3 py-2">\{formatRupiah((parseFloat(row.volume) || 0) * (parseFloat(row.harga) || 0))\}</td>\
                        </tr>\
                      ))\}\
                      \{showTotal && (\
                        <tr className="font-bold">\
                          <td className="border border-gray-400 px-3 py-2">Total</td>\
                          <td className="border border-gray-400 px-3 py-2"></td>\
                          <td className="border border-gray-400 px-3 py-2"></td>\
                          <td className="border border-gray-400 px-3 py-2">\{formatRupiah(calculateTotalHarga())\}</td>\
                        </tr>\
                      )\}\
                    </tbody>\
                  </table>\
                </div>\
                \
                \{/* Kondisi Penawaran */\}\
                <div className="mb-6">\
                  <p className="font-medium mb-2">Kondisi Penawaran:</p>\
                  <pre className="whitespace-pre-wrap font-sans ml-4" style=\{\{ lineHeight: '1.6' \}\}>\
                    \{termsType === 'material-only' \
                      ? termsMaterialOnly \
                      : termsType === 'material-installation' \
                        ? termsMaterialInstallation \
                        : customTerms\}\
                  </pre>\
                </div>\
                \
                \{/* Metode Pembayaran */\}\
                <div className="mb-6">\
                  <p className="font-medium mb-2">Metode Pembayaran</p>\
                  <pre className="whitespace-pre-wrap font-sans ml-4" style=\{\{ lineHeight: '1.6' \}\}>\
                    \{paymentMethod === 'default' ? paymentDefault : customPayment\}\
                  </pre>\
                  <p className="ml-4">\'95 Penawaran harga ini berlaku sampai dengan tanggal \{formatDate(validityDate)\}.</p>\
                </div>\
                \
                <p className="mb-6">Demikian penawaran harga ini kami sampaikan. Atas perhatian dan kerjasamanya kami ucapkan terima kasih.</p>\
                \
                <p className="mb-6">Hormat kami,</p>\
                \
                \{/* Penandatangan */\}\
                <div>\
                  \{signatories.find(s => s.id === signatory) && (\
                    <>\
                      <p className="font-medium">\{signatories.find(s => s.id === signatory).name\}</p>\
                      <p>\{signatories.find(s => s.id === signatory).position\}</p>\
                      <p>\{signatories.find(s => s.id === signatory).contact\}</p>\
                    </>\
                  )\}\
                </div>\
              </div>\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>\
  );\
\}}