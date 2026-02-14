import { PageHeader } from "@/components/page-header";

export default function HubungiPage() {
  return (
    <main>
      <PageHeader
        title={
          <>
            Hubungi <span className="text-secondary">Kami</span>
          </>
        }
        description="Adakah anda mempunyai sebarang soalan? Jangan ragu-ragu untuk menghubungi kami. Pasukan kami sedia membantu anda."
      />
      {/* Content will be added later */}
      <div className="container mx-auto px-6 py-12">
        <p className="text-center text-gray-500">Content coming soon...</p>
      </div>
    </main>
  );
}
