"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ServiceData } from "@/lib/types/stats";
import { formatRelativeTime } from "@/lib/stats/utils";
import { StatsDashboard } from "./stats-dashboard";
import { serviceIcons, serviceColors } from "@/lib/stats/service-icons";

interface StatsCardProps {
  service: ServiceData;
  defaultExpanded?: boolean;
}

export function StatsCard({
  service,
  defaultExpanded = false,
}: StatsCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const Icon = serviceIcons[service.type];
  const iconColor = serviceColors[service.type];

  return (
    <motion.div
      layout
      className="border border-border rounded-lg bg-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Collapsed Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          {/* Service Logo */}
          <div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-lg bg-muted/50">
            {Icon && <Icon className="w-6 h-6" style={{ color: iconColor }} />}
          </div>

          {/* Service Name & Primary Metric */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-lg">{service.name}</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {service.primaryMetric.value}
              </span>
              {service.primaryMetric.unit && (
                <span className="text-sm text-muted-foreground">
                  {service.primaryMetric.unit}
                </span>
              )}
              <span className="text-xs text-muted-foreground">
                {service.primaryMetric.label}
              </span>
            </div>
          </div>
        </div>

        {/* Expand Icon & Last Updated */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground hidden sm:block">
            {formatRelativeTime(service.lastUpdated)}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </div>
      </button>

      {/* Expanded Dashboard */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 border-t border-border">
              {service.error && (
                <div className="mb-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-sm">
                  ⚠️ {service.error}
                </div>
              )}
              <StatsDashboard service={service} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
