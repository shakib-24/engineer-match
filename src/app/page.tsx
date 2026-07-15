import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Faq } from "@/components/sections/Faq";
import { FeaturedOpportunities } from "@/components/sections/FeaturedOpportunities";
import { FinalCta } from "@/components/sections/FinalCta";
import { ForCompanies } from "@/components/sections/ForCompanies";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ItssSection } from "@/components/sections/ItssSection";
import { PopularSkills } from "@/components/sections/PopularSkills";
import { ServiceCategories } from "@/components/sections/ServiceCategories";
import { Statistics } from "@/components/sections/Statistics";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Statistics />
      <ServiceCategories />
      <PopularSkills />
      <FeaturedOpportunities />
      <WhyChooseUs />
      <ItssSection />
      <HowItWorks />
      <ForCompanies />
      <Faq />
      <FinalCta />

      <Footer />
    </>
  );
}
