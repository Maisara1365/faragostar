"use client";

import { ReactNode } from "react";
import { useLanguage } from "@/context/language-context";

interface DashboardPageTitleProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function DashboardPageTitle({
  title,
  description,
  action,
}: DashboardPageTitleProps) {
  const { language } = useLanguage();
  const isRTL = language === "fa";

  return (
    <div
      className="
        mb-8
        flex
        flex-col
        gap-6
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          {title}
        </h1>
        {description && (
          <p
            className="
              mt-2
              max-w-2xl
              text-slate-500
              leading-7
            "
          >
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className={isRTL ? "lg:text-left" : "lg:text-right"}>
          {action}
        </div>
      )}
    </div>
  );
}