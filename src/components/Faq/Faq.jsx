import { PlusIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

const items = [
  {
    id: "1",
    title: "How do I register for the meal plan?",
    content:
      "Students can register for the meal plan online using their university account. Once registered, you can choose between daily, weekly, or monthly meal options.",
  },
  {
    id: "2",
    title: "Can I customize my meals?",
    content:
      "Yes! You can pre-select meals from the menu each week. Vegetarian, vegan, and halal options are also available.",
  },
  {
    id: "3",
    title: "How are payments handled?",
    content:
      "Payments can be made online through the student portal or at the university finance office. Meal balances are updated in real-time.",
  },
  {
    id: "4",
    title: "What if I miss a meal?",
    content:
      "If you miss a meal, you can request a packed meal in advance or carry forward unused meals within the same week, depending on your subscription plan.",
  },
  {
    id: "5",
    title: "Is the system available on mobile?",
    content:
      "Yes, the system is fully responsive and mobile-friendly, so you can check menus, book meals, and make payments directly from your phone.",
  },
];

export default function FAQ() {
  return (
    <div id="faq" className="py-10 bg-orange-50 dark:bg-gray-900">
      <div className="space-y-4 container mx-auto px-4">
      <div className="flex justify-center">
          <h2 className="inline-block bg-orange-100 dark:bg-orange-700 text-orange-600 dark:text-orange-100 px-4 py-2 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-10">
          Frequently Asked Questions
        </h2>
      </div>
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-2"
          defaultValue="1"
        >
          {items.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm px-4 py-1 outline-none"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between rounded-md py-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 transition-all outline-none focus-visible:ring-0">
                  {item.title}
                  <PlusIcon
                    size={16}
                    className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-gray-600 dark:text-gray-400 pb-2 text-sm">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
