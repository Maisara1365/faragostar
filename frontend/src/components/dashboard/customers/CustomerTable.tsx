"use client";

import CustomerRow from "@/components/dashboard/customers/CustomerRow";
import { useLanguage } from "@/context/language-context";
import type { Customer } from "@/types/customer";

interface CustomerTableProps {
  customers: Customer[];
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onActivate: (customer: Customer) => void;
  onBlock: (customer: Customer) => void;
}

export default function CustomerTable({
  customers,
  onView,
  onEdit,
  onActivate,
  onBlock,
}: CustomerTableProps) {
  const { t } = useLanguage();

  return (
    <div className="rounded-lg border overflow-hidden">
      <style>
        {`
          .customer-table {
            width: 100%;
            border-collapse: collapse;
          }

          .customer-table thead {
            background-color: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
          }

          .customer-table thead th {
            padding: 12px 16px;
            text-align: left;
            font-size: 14px;
            font-weight: 600;
            color: #475569;
            letter-spacing: 0.025em;
            text-transform: uppercase;
            font-size: 12px;
          }

          .customer-table tbody tr {
            border-bottom: 1px solid #f1f5f9;
            transition: background-color 0.15s ease;
          }

          .customer-table tbody tr:last-child {
            border-bottom: none;
          }

          .customer-table tbody tr:hover {
            background-color: #fafbfc;
          }

          .customer-table tbody td {
            padding: 16px;
            vertical-align: middle;
          }

          /* Enhanced Button Styles */
          .action-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            min-width: 38px;
            padding: 0;
            border-radius: 9px;
            border: 1px solid #e2e8f0;
            background-color: #ffffff;
            color: #475569;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 14px;
            font-weight: 500;
            text-decoration: none;
            position: relative;
          }

          .action-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          }

          .action-button:active {
            transform: translateY(0px);
          }

          .action-button svg {
            width: 18px;
            height: 18px;
            display: block;
            flex-shrink: 0;
          }

          /* View Button */
          .action-button-view {
            border-color: #cbd5e1;
            color: #475569;
          }

          .action-button-view:hover {
            background-color: #f1f5f9;
            border-color: #94a3b8;
            color: #334155;
          }

          /* Edit Button */
          .action-button-edit {
            background-color: #eff6ff;
            border-color: #bfdbfe;
            color: #2563eb;
          }

          .action-button-edit:hover {
            background-color: #dbeafe;
            border-color: #93c5fd;
            color: #1d4ed8;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
          }

          .action-button-edit svg {
            color: #2563eb;
            stroke: #2563eb;
          }

          .action-button-edit:hover svg {
            color: #1d4ed8;
            stroke: #1d4ed8;
          }

          /* Delete Button */
          .action-button-delete {
            background-color: #fee2e2;
            border-color: #fecaca;
            color: #dc2626;
          }

          .action-button-delete:hover {
            background-color: #fecaca;
            border-color: #fca5a5;
            color: #b91c1c;
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
          }

          .action-button-delete svg {
            color: #dc2626;
            stroke: #dc2626;
            stroke-width: 2.2;
          }

          .action-button-delete:hover svg {
            color: #b91c1c;
            stroke: #b91c1c;
          }

          .action-button-group {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }

          .action-button-group .action-button:last-child {
            margin-right: 0;
          }

          /* Badge Styles */
          .status-badge {
            display: inline-flex;
            align-items: center;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.01em;
          }

          .status-badge-active {
            background-color: #dcfce7;
            color: #166534;
          }

          .status-badge-inactive {
            background-color: #fee2e2;
            color: #991b1b;
          }

          .status-badge-suspended {
            background-color: #fef3c7;
            color: #92400e;
          }

          .language-badge {
            display: inline-flex;
            align-items: center;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 500;
            background-color: #f1f5f9;
            color: #475569;
          }

          /* Avatar styles (if CustomerRow uses them) */
          .customer-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f1f5f9;
            border: 1px solid #e2e8f0;
            font-weight: 600;
            font-size: 16px;
            color: #64748b;
            flex-shrink: 0;
          }

          .customer-avatar img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
          }

          .customer-info {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .customer-name {
            font-weight: 500;
            color: #0f172a;
          }

          .customer-email {
            font-size: 13px;
            color: #64748b;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .customer-table thead th,
            .customer-table tbody td {
              padding: 12px;
              font-size: 13px;
            }

            .action-button {
              width: 34px;
              height: 34px;
              min-width: 34px;
            }

            .action-button svg {
              width: 16px;
              height: 16px;
            }
          }
        `}
      </style>

      <div className="overflow-x-auto">
        <table className="customer-table">
          <thead>
            <tr>
              <th>{t.dashboard.customers.name}</th>
              <th>{t.dashboard.customers.email}</th>
              <th>{t.dashboard.customers.phone}</th>
              <th>{t.dashboard.customers.status}</th>
              <th>{t.dashboard.customers.language}</th>
              <th>{t.dashboard.customers.actions}</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                onView={onView}
                onEdit={onEdit}
                onActivate={onActivate}
                onBlock={onBlock}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}