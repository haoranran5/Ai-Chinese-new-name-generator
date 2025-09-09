"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";

export function FAQSection() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t("questions.what.question"),
      answer: t("questions.what.answer"),
    },
    {
      question: t("questions.skills.question"),
      answer: t("questions.skills.answer"),
    },
    {
      question: t("questions.types.question"),
      answer: t("questions.types.answer"),
    },
    {
      question: t("questions.time.question"),
      answer: t("questions.time.answer"),
    },
    {
      question: t("questions.infrastructure.question"),
      answer: t("questions.infrastructure.answer"),
    },
    {
      question: t("questions.customization.question"),
      answer: t("questions.customization.answer"),
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="mb-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0 transition-colors duration-200">
              <div
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="py-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg px-4 -mx-4 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                    {openIndex === index ? (
                      <Minus className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    ) : (
                      <Plus className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    )}
                  </button>
                </div>

                {openIndex === index && (
                  <div className="mt-4 pr-10 animate-in slide-in-from-top-2 duration-200">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
