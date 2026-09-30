"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardShell from "@/components/dashboard/shell/DashboardShell";

import ReportStatistics from "@/components/dashboard/reports/ReportStatistics";
import OrdersStatusChart from "@/components/dashboard/reports/OrdersStatusChart";
import ServiceStatusChart from "@/components/dashboard/reports/ServiceStatusChart";
import PortfolioChart from "@/components/dashboard/reports/PortfolioChart";
import TestimonialChart from "@/components/dashboard/reports/TestimonialChart";
import RecentOrdersTable from "@/components/dashboard/reports/RecentOrdersTable";
import RecentCustomersTable from "@/components/dashboard/reports/RecentCustomersTable";

import reportService from "@/services/report";

import type { ReportsData } from "@/types/report";

import { useLanguage } from "@/context/language-context";

import {
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

// Import Header and Footer
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const styles = {
  page: {
    height: "100vh",
    width: "100%",
    overflow: "hidden" as const,
    background:
      "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
    position: "relative" as const,
  },
  background: {
    position: "absolute" as const,
    inset: 0,
    background:
      "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.03) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)",
    pointerEvents: "none" as const,
    zIndex: 0,
  },
  scrollArea: {
    height: "100%",
    width: "100%",
    overflowY: "auto" as const,
    overflowX: "hidden" as const,
    position: "relative" as const,
    zIndex: 1,
  },
  main: {
    width: "100%",
    maxWidth: "1440px",
    margin: "0 auto",
    padding: "24px",
    boxSizing: "border-box" as const,
  },
  content: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "32px",
    padding: "8px 0 40px",
  },
  loading: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: "24px",
  },
  spinnerWrapper: {
    position: "relative" as const,
    width: "64px",
    height: "64px",
  },
  spinnerBackground: {
    position: "absolute" as const,
    inset: 0,
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))",
    filter: "blur(20px)",
  },
  spinner: {
    position: "relative" as const,
    width: "64px",
    height: "64px",
    color: "#3b82f6",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#64748b",
  },
  error: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: "24px",
    textAlign: "center" as const,
  },
  errorIconWrapper: {
    position: "relative" as const,
    width: "80px",
    height: "80px",
  },
  errorIconBackground: {
    position: "absolute" as const,
    inset: 0,
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(249, 115, 22, 0.15))",
    filter: "blur(20px)",
  },
  errorIcon: {
    position: "relative" as const,
    width: "80px",
    height: "80px",
    color: "#ef4444",
  },
  errorTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#dc2626",
    marginBottom: "8px",
  },
  errorSubtext: {
    fontSize: "14px",
    color: "#94a3b8",
  },
  retryButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 24px",
    borderRadius: "12px",
    border: "none",
    background:
      "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow:
      "0 4px 16px rgba(59, 130, 246, 0.3)",
  },
  refreshSection: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 4px",
  },
  refreshButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 20px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(8px)",
    border:
      "1px solid rgba(226, 232, 240, 0.7)",
    boxShadow:
      "0 2px 8px rgba(0, 0, 0, 0.04)",
    fontSize: "14px",
    fontWeight: "500",
    color: "#475569",
    cursor: "pointer",
  },
  statisticsSection: {
    position: "relative" as const,
  },
  statisticsBackground: {
    position: "absolute" as const,
    inset: "-20px",
    background:
      "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))",
    borderRadius: "32px",
    filter: "blur(40px)",
    zIndex: -1,
  },
  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: "24px",
  },
  card: {
    position: "relative" as const,
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "blur(8px)",
    border:
      "1px solid rgba(226, 232, 240, 0.6)",
    boxShadow:
      "0 4px 16px rgba(0, 0, 0, 0.04)",
    overflow: "hidden" as const,
  },
  gradientBar: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    zIndex: 10,
  },
  decoration: {
    height: "2px",
    width: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent)",
    borderRadius: "999px",
  },
};

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
  hover: {
    scale: 1.01,
    boxShadow:
      "0 20px 40px rgba(0,0,0,0.08)",
    transition: {
      duration: 0.2,
    },
  },
};

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
  },
};

export default function ReportsPage() {
  const { t } = useLanguage();

  const [loading, setLoading] =
    useState(true);

  const [reports, setReports] =
    useState<ReportsData | null>(null);

  const [error, setError] =
    useState("");

  const [refreshing, setRefreshing] =
    useState(false);

  async function loadReports() {
    try {
      setLoading(true);
      setError("");

      const data =
        await reportService.getReports();

      setReports(data);
    } catch (error) {
      console.error(
        "REPORTS LOAD ERROR:",
        error
      );

      setError(
        t.common.somethingWentWrong
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await loadReports();
  }

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div style={styles.page}>
        <div style={styles.background} />

        <div style={styles.scrollArea}>
          <Header />

          <motion.main
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={styles.main}
          >
            <DashboardShell
              title={
                t.dashboard.reports.title
              }
              description={
                t.dashboard.reports.description
              }
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    style={
                      styles.loading
                    }
                  >
                    <div
                      style={
                        styles.spinnerWrapper
                      }
                    >
                      <div
                        style={
                          styles.spinnerBackground
                        }
                      />

                      <Loader2
                        style={
                          styles.spinner
                        }
                      />
                    </div>

                    <p
                      style={
                        styles.loadingText
                      }
                    >
                      {t.dashboard
                        .reports
                        .loadingMessage ||
                        "Loading reports..."}
                    </p>
                  </motion.div>
                ) : error ||
                  !reports ? (
                  <motion.div
                    key="error"
                    initial={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                    style={
                      styles.error
                    }
                  >
                    <div
                      style={
                        styles.errorIconWrapper
                      }
                    >
                      <div
                        style={
                          styles.errorIconBackground
                        }
                      />

                      <AlertCircle
                        style={
                          styles.errorIcon
                        }
                      />
                    </div>

                    <div>
                      <p
                        style={
                          styles.errorTitle
                        }
                      >
                        {error ||
                          "Failed to load reports"}
                      </p>

                      <p
                        style={
                          styles.errorSubtext
                        }
                      >
                        {t.dashboard
                          .reports
                          .errorSubtext ||
                          "Please check your connection and try again"}
                      </p>
                    </div>

                    <button
                      onClick={
                        handleRefresh
                      }
                      style={
                        styles.retryButton
                      }
                    >
                      <RefreshCw
                        size={16}
                      />

                      {t.common
                        .retry}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    variants={
                      containerVariants
                    }
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={
                      styles.content
                    }
                  >
                    <motion.div
                      variants={
                        itemVariants
                      }
                      style={
                        styles.refreshSection
                      }
                    >
                      <button
                        onClick={
                          handleRefresh
                        }
                        disabled={
                          refreshing
                        }
                        style={
                          styles.refreshButton
                        }
                      >
                        <RefreshCw
                          size={16}
                          style={{
                            animation:
                              refreshing
                                ? "spin 1s linear infinite"
                                : "none",
                          }}
                        />

                        {refreshing
                          ? t
                              .common
                              .refreshing ||
                            "Refreshing..."
                          : t
                              .common
                              .refresh ||
                            "Refresh"}
                      </button>
                    </motion.div>

                    <motion.div
                      variants={
                        itemVariants
                      }
                      style={
                        styles.statisticsSection
                      }
                    >
                      <div
                        style={
                          styles.statisticsBackground
                        }
                      />

                      <ReportStatistics
                        statistics={
                          reports.statistics
                        }
                      />
                    </motion.div>

                    <motion.div
                      variants={
                        itemVariants
                      }
                      style={
                        styles.grid
                      }
                      className="reports-grid"
                    >
                      <motion.div
                        variants={
                          cardVariants
                        }
                        whileHover="hover"
                        style={
                          styles.card
                        }
                      >
                        <div
                          style={{
                            ...styles.gradientBar,
                            background:
                              "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                          }}
                        />

                        <OrdersStatusChart
                          statistics={
                            reports.statistics
                          }
                        />
                      </motion.div>

                      <motion.div
                        variants={
                          cardVariants
                        }
                        whileHover="hover"
                        style={
                          styles.card
                        }
                      >
                        <div
                          style={{
                            ...styles.gradientBar,
                            background:
                              "linear-gradient(90deg, #10b981, #34d399)",
                          }}
                        />

                        <ServiceStatusChart
                          statistics={
                            reports.statistics
                          }
                        />
                      </motion.div>

                      <motion.div
                        variants={
                          cardVariants
                        }
                        whileHover="hover"
                        style={
                          styles.card
                        }
                      >
                        <div
                          style={{
                            ...styles.gradientBar,
                            background:
                              "linear-gradient(90deg, #f59e0b, #f97316)",
                          }}
                        />

                        <PortfolioChart
                          statistics={
                            reports.statistics
                          }
                        />
                      </motion.div>

                      <motion.div
                        variants={
                          cardVariants
                        }
                        whileHover="hover"
                        style={
                          styles.card
                        }
                      >
                        <div
                          style={{
                            ...styles.gradientBar,
                            background:
                              "linear-gradient(90deg, #ec4899, #db2777)",
                          }}
                        />

                        <TestimonialChart
                          testimonials={
                            reports.testimonials
                          }
                        />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      variants={
                        itemVariants
                      }
                      style={
                        styles.grid
                      }
                      className="reports-grid"
                    >
                      <motion.div
                        variants={
                          cardVariants
                        }
                        whileHover="hover"
                        style={
                          styles.card
                        }
                      >
                        <div
                          style={{
                            ...styles.gradientBar,
                            background:
                              "linear-gradient(90deg, #6366f1, #8b5cf6)",
                          }}
                        />

                        <RecentOrdersTable
                          orders={
                            reports.recentOrders
                          }
                        />
                      </motion.div>

                      <motion.div
                        variants={
                          cardVariants
                        }
                        whileHover="hover"
                        style={
                          styles.card
                        }
                      >
                        <div
                          style={{
                            ...styles.gradientBar,
                            background:
                              "linear-gradient(90deg, #f59e0b, #eab308)",
                          }}
                        />

                        <RecentCustomersTable
                          customers={
                            reports.recentCustomers
                          }
                        />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      variants={
                        itemVariants
                      }
                      style={
                        styles.decoration
                      }
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </DashboardShell>
          </motion.main>

          <Footer />
        </div>

        <style>{`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .reports-grid {
            grid-template-columns: repeat(
              2,
              minmax(0, 1fr)
            );
          }

          @media (max-width: 1279px) {
            .reports-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 768px) {
            .reports-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </AuthGuard>
  );
}