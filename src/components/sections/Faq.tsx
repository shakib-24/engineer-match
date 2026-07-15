import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ, FAQ_ITEMS } from "@/constants/lp";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-[72px] bg-surface py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          headingId="faq-heading"
          label={FAQ.label}
          title={FAQ.title}
          description={FAQ.description}
          align="center"
        />

        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border bg-surface p-2 shadow-sm sm:p-4">
          <Accordion.Root className="flex flex-col divide-y divide-border">
            {FAQ_ITEMS.map((faq) => (
              <Accordion.Item key={faq.question} className="px-4 py-2 sm:px-6">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none">
                    {faq.question}
                    <ChevronDown
                      className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[open]:rotate-180"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden text-sm leading-relaxed whitespace-pre-line text-muted-foreground transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
                  <p className="pb-4">{faq.answer}</p>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}
