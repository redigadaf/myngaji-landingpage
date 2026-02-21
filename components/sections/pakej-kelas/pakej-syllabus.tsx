import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";
import { PakejKelas } from "@/components/sections/data/data-pakej-kelas";

interface PakejSyllabusProps {
  data: PakejKelas;
}

export function PakejSyllabus({ data }: PakejSyllabusProps) {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">Apa Yang Akan Dipelajari</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Kurikulum kami disusun rapi untuk memastikan setiap pelajar mendapat pemahaman yang menyeluruh dan praktikal.</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {data.syllabus.map((modul, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-slate-200 last:border-b last:border-slate-200 rounded-2xl px-6 bg-slate-50 data-[state=open]:bg-white data-[state=open]:shadow-lg transition-all duration-300 mb-2"
            >
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">{String(index + 1).padStart(2, "0")}</div>
                  <span className="text-lg md:text-xl font-semibold text-slate-900 group-hover:text-primary transition-colors">{modul.tajuk}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-2 pl-14">
                <ul className="grid sm:grid-cols-2 gap-3">
                  {modul.topik.map((topik, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{topik}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
