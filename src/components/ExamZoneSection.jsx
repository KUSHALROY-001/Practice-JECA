import { MapPin, Building2, Hash, Map } from "lucide-react";

const examZones = [
  { id: 1, district: "Bankura", zone: "Bankura", code: "11" },
  { id: 2, district: "Cooch Behar", zone: "Cooch Behar", code: "15" },
  { id: 3, district: "Darjeeling", zone: "Siliguri", code: "18" },
  { id: 4, district: "Hooghly", zone: "Serampore", code: "21" },
  { id: 5, district: "Howrah", zone: "Howrah Maidan/Shibpur", code: "22" },
  { id: 6, district: "Howrah", zone: "Salkia/Bally/Uttarpara", code: "23" },
  { id: 7, district: "Howrah", zone: "Santragachi/Domjur", code: "24" },
  { id: 8, district: "Howrah", zone: "Uluberia", code: "25" },
  {
    id: 9,
    district: "Kolkata",
    zone: "Central Kolkata (Moulali/ Beliaghata/ Narkel Danga/ Phool Bagan/ Kakurgachi/ Park Circus)",
    code: "29",
  },
  {
    id: 10,
    district: "Kolkata",
    zone: "North Kolkata (Shyam bazar/ Bagh Bazar/ Girish Park/ Burra Bazar/ College Street/ Sealdah)",
    code: "30",
  },
  {
    id: 11,
    district: "Kolkata",
    zone: "Salt Lake/New Town (Salt Lake/ Lake Town/ New Town/ Rajar Hat)",
    code: "31",
  },
  {
    id: 12,
    district: "Kolkata",
    zone: "South Kolkata (Ballygaunge/ Minto Park/ Bhowanipore/ Tollygaunge/ Jadavpur)",
    code: "32",
  },
  {
    id: 13,
    district: "Kolkata",
    zone: "West Kolkata (Joka/ Behala/ Alipore/ Chetla/ Khidirpore/ Budge Budge)",
    code: "33",
  },
  { id: 14, district: "Malda", zone: "Malda", code: "34" },
  { id: 15, district: "Murshidabad", zone: "Berhampore", code: "35" },
  { id: 16, district: "Nadia", zone: "Kalyani", code: "38" },
  {
    id: 17,
    district: "North 24 Parganas",
    zone: "Barrackpur (Dum Dum Jn. to Barrackpur)",
    code: "43",
  },
  { id: 18, district: "Paschim Burdwan", zone: "Asansol", code: "45" },
  { id: 19, district: "Paschim Burdwan", zone: "Durgapur", code: "46" },
  { id: 20, district: "Paschim Medinipur", zone: "Kharagpur", code: "48" },
  { id: 21, district: "Paschim Medinipur", zone: "Medinipur", code: "49" },
  { id: 22, district: "Purba Burdwan", zone: "Burdwan", code: "50" },
  { id: 23, district: "Purba Medinipur", zone: "Haldia", code: "52" },
  {
    id: 24,
    district: "South 24 Parganas",
    zone: "Garia/Sonarpur/Baruipur",
    code: "55",
  },
];

export const ExamZoneSection = () => {
  return (
    <div className="mt-16 w-full pb-16 md:mt-24">
      <div className="mb-10 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-black text-white md:text-4xl">
          Examination Zones
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
          Candidates must choose any three (3) of the following zones in order
          of their preference during application.
        </p>
      </div>

      <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 backdrop-blur-xl transition hover:bg-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/60 text-xs font-bold uppercase text-slate-400">
              <tr>
                <th
                  scope="col"
                  className="whitespace-nowrap border-b border-white/5 px-3 py-4"
                >
                  <div className="flex items-center gap-2">
                    <Hash size={16} /> Sl. No.
                  </div>
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap border-b border-white/5 py-4"
                >
                  <div className="flex items-center gap-2">
                    <Map size={16} /> District of W.B.
                  </div>
                </th>
                <th scope="col" className="border-b border-white/5 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Building2 size={16} /> Zone
                  </div>
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap border-b border-white/5 px-6 py-4"
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={16} /> Zone Code
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {examZones.map((row) => (
                <tr
                  key={row.id}
                  className="transition duration-150 hover:bg-cyan-500/10 hover:text-cyan-100"
                >
                  <td className="px-6 py-4 font-semibold">{row.id}</td>
                  <td className=" py-4 font-semibold text-base text-slate-200">
                    {row.district}
                  </td>
                  <td className="pl-6 py-4 leading-relaxed">{row.zone}</td>
                  <td className="px-6 py-4 text-center sm:text-left">
                    <span className="inline-block rounded-lg bg-cyan-500/20 px-3 py-1 text-sm font-bold text-cyan-300 ring-1 ring-cyan-400/30">
                      {row.code}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
