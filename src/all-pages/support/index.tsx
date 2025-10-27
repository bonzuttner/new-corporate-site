'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/accordion';

import React from 'react';
import { Button } from '@nextui-org/react';
import Container from '@/shared-components/Container';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';


interface Step {
  step: string;
  title: string;
  content: string;
}


const Index = () => {
  const t = useTranslations('support');



  const steps: Step[] = [
    {
      step: t('flow.steps.step1.step'),
      title: t('flow.steps.step1.title'),
      content: t('flow.steps.step1.content'),
    },
    {
      step: t('flow.steps.step2.step'),
      title: t('flow.steps.step2.title'),
      content: t('flow.steps.step2.content'),
    },
    {
      step: t('flow.steps.step3.step'),
      title: t('flow.steps.step3.title'),
      content: t('flow.steps.step3.content'),
    },
    {
      step: t('flow.steps.step4.step'),
      title: t('flow.steps.step4.title'),
      content: t('flow.steps.step4.content'),
    },
  ];


  return (
    <section className="relative w-full">
      {/* Hero Section */}
      <section className="relative w-full lg:h-[calc(80vh-90px)] flex">
        <div className="relative w-full lg:w-3/4 h-[200px] lg:h-80">
          <div className="absolute left-4 top-6 lg:left-28 lg:top-20 z-10">
            <h1 className="text-3xl lg:text-4xl font-medium leading-snug">
              {t('hero.title')}
            </h1>
            <p className="text-sm lg:text-base font-normal leading-6 my-2">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {t('hero.tags').split(', ').map((tag, index) => (
                <span key={index} className="bg-[#00A1E980] px-3 py-1 rounded-sm text-white text-xs lg:text-sm font-medium">
                  #{tag.trim()}
                </span>
              ))}
            </div>


          </div>
          <Image
            src="/images/support/creative-left.svg"
            alt={t('hero.images.leftAlt')}
            fill
            className="object-cover"
          />
        </div>
        <div className="hidden lg:block absolute bottom-32 right-0 w-[400px] lg:w-[630px] h-80">
          <Image
            src="/images/support/support-hero.png"
            alt={t('hero.images.rightAlt')}
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-28 py-16 overflow-hidden">
        <div className="relative w-full sm:w-auto mb-8 sm:mb-0 bg-black">
          <div className="absolute right-4 lg:top-4 w-[250px] h-[60px] sm:w-[350px] sm:h-[80px] lg:w-[450px] lg:h-[97px]">
            <Image
              src="/images/support/Hands-on Support.png"
              alt={t('about.imageAlt')}
              fill
              className="object-contain hidden lg:block"
            />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-snug max-w-5xl text-center lg:text-left">
          {t.rich('about.title', {
            br: () => <br />,
            highlight: (chunks) => <span className="text-[#00A1E980]">{chunks}</span>,
            bold: (chunks) => <span className="font-bold text-yellow-300">{chunks}</span>
          })}
        </h1>
        <p className="text-sm sm:text-base font-normal mt-8 leading-6 max-w-5xl">
          {t('about.description')}
        </p>
      </section>

      <section className="bg-[#F5F5F5] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-medium text-black mb-8">
            {t('section2.title')}
          </h1>
          <div className="max-w-3xl mx-auto text-black leading-relaxed text-base space-y-6">
            <p>
              {t('section2.content1')}
            </p>
            <p>
              {t('section2.content2')}
            </p>
            <p>
              {t('section2.content3')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-black text-center mb-16">
            {t('caseStudies.title')}
          </h2>

          <div className="space-y-8">
            {/* Case Study 1 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
              <div className="lg:w-1/2 h-[300] relative">
                <Image
                  fill
                  src="/images/support/service1.png"
                  alt="AI implementation challenge"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-8 relative">
                <div className="absolute top-0 right-0 bg-[#FFE300] text-white w-12 h-12 flex items-center justify-center font-medium text-lg">
                  01
                </div>
                <h3 className="text-xl font-medium text-black mb-4 pr-12">
                  {t('caseStudies.case1.title')}
                </h3>
                <p className="text-black leading-relaxed">
                  {t('caseStudies.case1.content')}
                </p>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row-reverse">
              <div className="lg:w-1/2 h-[300] relative">
                <Image
                  fill
                  src="/images/support/service2.png"
                  alt="Workplace resistance to AI"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-8 relative">
                <div className="absolute top-0 left-0 bg-[#FFE300] text-white w-12 h-12 flex items-center justify-center font-medium text-lg">
                  02
                </div>
                <h3 className="text-xl font-medium text-black mb-4 pl-12">
                  {t('caseStudies.case2.title')}
                </h3>
                <p className="text-black leading-relaxed">
                  {t('caseStudies.case2.content')}
                </p>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
              <div className="lg:w-1/2 h-[300] relative">
                <Image
                  fill
                  src="/images/support/service3.png"
                  alt="AI tool selection challenges"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-8 relative">
                <div className="absolute top-0 right-0 bg-[#FFE300] text-white w-12 h-12 flex items-center justify-center font-medium text-lg">
                  03
                </div>
                <h3 className="text-xl font-medium text-black mb-4 pr-12">
                  {t('caseStudies.case3.title')}
                </h3>
                <p className="text-black leading-relaxed">
                  {t('caseStudies.case3.content')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blue AI Relationship Section */}
      <section className="bg-[#00A1E9] py-20 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
            {t("relationship.title1")}<br />
            {t("relationship.title2")}
          </h2>
          <div className="max-w-3xl mx-auto text-white leading-relaxed space-y-6">
            <p>
              {t('relationship.content1')}
            </p>
            <p>
              {t('relationship.content2')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section with Background */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0">
          <Image
            width={200}
            height={100}
            src="/images/support/service-bg.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-white">
          <h2 className="text-3xl md:text-4xl font-medium text-center mb-8">
            {t('services.title')}
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            {t('services.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Service 1 */}
            <div className="bg-white bg-opacity-95 rounded-lg p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6 text-[#00A1E9B2]">
                <span className="text-2xl font-medium text-[#00A1E9] opacity-70">01</span>
                <h3 className="text-2xl font-medium text-[#00A1E9] opacity-70">{t("services.service1.title")}</h3>
              </div>
              <div className="text-black space-y-2">
                <p>{t("services.service1.description1")}</p>
                <p>{t("services.service1.description2")}</p>
                <p>{t("services.service1.description3")}</p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white bg-opacity-95 rounded-lg p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6 text-[#00A1E9B2]">
                <span className="text-2xl font-medium text-[#00A1E9] opacity-70">02</span>
                <h3 className="text-2xl font-medium text-[#00A1E9] opacity-70">{t("services.service2.title")}</h3>
              </div>
              <div className="text-black space-y-2">
                <p>{t("services.service2.description1")}</p>
                <p>{t("services.service2.description2")}</p>
                <p>{t("services.service2.description3")}</p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white bg-opacity-95 rounded-lg p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6 text-[#00A1E9B2]">
                <span className="text-2xl font-medium text-[#00A1E9] opacity-70">03</span>
                <h3 className="text-2xl font-medium text-[#00A1E9] opacity-70">{t("services.service3.title")}</h3>
              </div>
              <div className="text-black space-y-2">
                <p>{t("services.service3.description1")}</p>
                <p>{t("services.service3.description2")}</p>
                <p>{t("services.service3.description3")}</p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-white bg-opacity-95 rounded-lg p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6 text-[#00A1E9B2]">
                <span className="text-2xl font-medium text-[#00A1E9] opacity-70">04</span>
                <h3 className="text-2xl font-medium text-[#00A1E9] opacity-70">{t("services.service4.title")}</h3>
              </div>
              <div className="text-black space-y-2">
                <p>{t("services.service4.description1")}</p>
                <p>{t("services.service4.description2")}</p>
                <p>{t("services.service4.description3")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Section */}
      <section className="relative w-full py-16 px-4 sm:px-8 lg:px-10">
        <h1 className="text-[32px] sm:text-[36px] lg:text-[40px] text-black font-semibold text-left lg:text-center px-5">
          {t('flow.title')}
        </h1>
        <div className="flex flex-wrap justify-center gap-2 lg:gap-6 mt-10">
          {steps.map((step, index) => (
            <div key={index} className="bg-transparent text-left w-[48%] lg:w-[22%] px-4">
              <h3 className="text-[16px] sm:text-[20px] bg-[#A2FF92] font-semibold text-center py-2 sm:py-3 mb-4 rounded text-">
                {step.step}
              </h3>
              <p className="text-[16px] sm:text-[20px] font-medium text-center text-black mb-3 leading-7">
                {step.title}
              </p>
              <p className="text-[12px] sm:text-base text-black font-normal leading-6 whitespace-pre-line">
                {step.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#F5F5F5] rounded-2xl p-12 text-center">
            <h2 className="text-2xl font-medium text-black mb-4">
              {t('section5.title1')}<br />
              <br />
              {t('section5.title2')}
            </h2>
            <p className="text-black mb-8">
              {t('section5.content')}
            </p>
            <button className="bg-[#00A1E9] text-white px-8 py-4 rounded-full font-medium hover:bg-opacity-90 transition-colors flex items-center gap-3 mx-auto">
              {t('section5.btn-content')}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-[#00A1E9]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-white text-center mb-8">FAQ</h2>

          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1" className="border-b last:border-0">
                <AccordionTrigger className="text-[#00A1E9] text-base md:text-lg">
                  {t('faq.q1.question')}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  {t('faq.q1.answer')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2" className="border-b last:border-0">
                <AccordionTrigger className="text-[#00A1E9] text-base md:text-lg">
                  {t('faq.q2.question')}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  {t('faq.q2.answer')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3" className="border-b last:border-0">
                <AccordionTrigger className="text-[#00A1E9] text-base md:text-lg">
                  {t('faq.q3.question')}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  {t('faq.q3.answer')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4" className="border-b last:border-0">
                <AccordionTrigger className="text-[#00A1E9] text-base md:text-lg">
                  {t('faq.q4.question')}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  {t('faq.q4.answer')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5" className="">
                <AccordionTrigger className="text-[#00A1E9] text-base md:text-lg">
                  {t('faq.q5.question')}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  {t('faq.q5.answer')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pt-14 pb-24" id="contact">
        <Container className="w-full flex items-center justify-center">
          <h1 className="text-[32px] font-medium leading-10 mb-6">
            {t('otherContents.title')}
          </h1>
          <div className="w-full max-w-4xl gap-5 flex flex-1 sm:items-center items-start justify-between rounded-3xl flex-col sm:flex-row mb-20">
            <div className="sm:w-2/5 w-full">
              <div className="flex">
                <hr className="w-[10%] border-[#00A1E9] mr-4"></hr>
                <hr className="w-[85%] border-[#666666]"></hr>
              </div>
              <Link href="/product-development" className="flex mt-4 justify-between sm:justify-end">
                <span className="w-full text-left text-[20px] font-medium leading-7 ml-[15%]">
                  {t('otherContents.link1')}
                </span>
                <Image
                  src="/images/support/arrow-right.svg"
                  alt={t('otherContents.arrowAlt')}
                  width={23}
                  height={23}
                />
              </Link>
            </div>
            <div className="sm:w-2/5 w-full">
              <div className="flex">
                <hr className="w-[10%] border-[#00A1E9] mr-4"></hr>
                <hr className="w-[85%] border-[#666666]"></hr>
              </div>
              <Link href="/creative" className="flex mt-4 justify-between sm:justify-end">
                <span className="w-full text-left text-[20px] font-medium leading-7 ml-[15%]">
                  {t('otherContents.link2')}
                </span>
                <Image
                  src="/images/support/arrow-right.svg"
                  alt={t('otherContents.arrowAlt')}
                  width={23}
                  height={23}
                />
              </Link>
            </div>
          </div>
          <div className="bg-[#F5F5F5] w-full max-w-4xl lg:px-32 py-14 flex items-center justify-between rounded-3xl flex-col lg:flex-row gap-y-3">
            <div className="space-y-3 lg:space-y-1">
              <h2 className="font-normal text-xl lg:text-4xl text-center lg:text-left">
                {t('contact.title')}
              </h2>
              <p className="font-normal text-xs lg:text-base">
                {t('contact.subtitle')}
              </p>
            </div>
            <Button
              as={Link}
              href="/contact"
              className="bg-[#00A1E9] text-white px-10 lg:py-4 mt-5 h-[60px] rounded-[30px]"
            >
              <span className="font-normal text-xs lg:text-base">
                {t('contact.buttonText')}
              </span>
              <Image
                src="/images/arrow-left.svg"
                alt={t('contact.arrowAlt')}
                width={10}
                height={20}
              />
            </Button>
          </div>
        </Container>
      </section>
    </section>
  );
};

export default Index;