import React, { useContext, useRef, useState, useEffect } from "react";
import useIntersectionShow from "@/utils/observerFunc";
import { PageBackground } from "../components/contact-us-page-components/pageBackgrouns";
import { ContactHero } from "../components/contact-us-page-components/contactHero";
import { ContactInfoCard } from "../components/contact-us-page-components/contactInfoCard";
import { ContactFormCard } from "../components/contact-us-page-components/contactFormCard";
import { ContactExtras } from "../components/contact-us-page-components/contactExtras";

export const ContactPage = () => {
  useIntersectionShow();
  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-x-hidden">
      <PageBackground />
      <ContactHero />

      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <ContactInfoCard />
          <ContactFormCard />
        </div>
      </section>

      <ContactExtras />
    </div>
  );
};
