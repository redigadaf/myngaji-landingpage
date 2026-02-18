import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PakejKelas } from "@/components/sections/data/data-pakej-kelas";

interface PakejSesuaiUntukProps {
  data: PakejKelas;
}

export function PakejSesuaiUntuk({ data }: PakejSesuaiUntukProps) {
  return (
    <section className="py-20 md:py-24 bg-green-50/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #059669 1px, transparent 0)", backgroundSize: "16px 16px" }}></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12 tracking-tight">Sesuai Untuk Siapa?</h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {data.sesuaiUntuk.map((item, index) => (
            <Card key={index} className="border-0 shadow-lg shadow-green-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl bg-white overflow-hidden group">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <CheckCircle2 className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="font-semibold text-lg text-slate-700 group-hover:text-slate-900 transition-colors duration-300">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
