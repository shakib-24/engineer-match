import { Award } from "lucide-react";
import { CertificationCard } from "@/components/engineer/profile/CertificationCard";
import { ENGINEER_DETAIL_META, type EngineerCertification } from "@/constants/company-engineers";

interface EngineerProfileCertificationsProps {
  certifications: EngineerCertification[];
}

export function EngineerProfileCertifications({
  certifications,
}: EngineerProfileCertificationsProps) {
  if (certifications.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Award className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {ENGINEER_DETAIL_META.certificationsTitle}
        </h3>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {certifications.map((cert) => (
          <CertificationCard
            key={cert.name}
            name={cert.name}
            issuer={cert.issuer}
            acquiredDate={cert.acquiredDate}
          />
        ))}
      </div>
    </section>
  );
}
