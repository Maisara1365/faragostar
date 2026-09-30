"use client";

import CustomerStatusBadge from "@/components/dashboard/customers/CustomerStatusBadge";
import CustomerActionsDropdown from "@/components/dashboard/customers/CustomerActionsDropdown";
import type { Customer } from "@/types/customer";

interface CustomerRowProps {
  customer: Customer;
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onActivate: (customer: Customer) => void;
  onBlock: (customer: Customer) => void;
}

export default function CustomerRow({
  customer,
  onView,
  onEdit,
  onActivate,
  onBlock,
}: CustomerRowProps) {
  return (
    <>
      <style>
        {`
          .customer-row {
            border-bottom: 1px solid #f1f5f9;
            transition: background-color 0.15s ease;
          }

          .customer-row:last-child {
            border-bottom: none;
          }

          .customer-row:hover {
            background-color: #fafbfc;
          }

          .customer-row td {
            padding: 16px;
            vertical-align: middle;
          }

          .customer-row .customer-name {
            font-weight: 500;
            color: #0f172a;
          }

          .customer-row .customer-email {
            color: #475569;
          }

          .customer-row .customer-phone {
            color: #475569;
          }

          .customer-row .customer-language {
            color: #475569;
            font-weight: 500;
          }

          .customer-row .customer-language .lang-badge {
            display: inline-flex;
            align-items: center;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 500;
            background-color: #f1f5f9;
            color: #475569;
            letter-spacing: 0.025em;
          }

          .customer-row .customer-language .lang-badge.en {
            background-color: #dbeafe;
            color: #1e40af;
          }

          .customer-row .customer-language .lang-badge.ar {
            background-color: #fef3c7;
            color: #92400e;
          }

          .customer-row .customer-language .lang-badge.fr {
            background-color: #d1fae5;
            color: #065f46;
          }

          .customer-row .customer-language .lang-badge.es {
            background-color: #fce7f3;
            color: #9d174d;
          }

          .customer-row .customer-language .lang-badge.de {
            background-color: #e0e7ff;
            color: #3730a3;
          }

          .customer-row .customer-language .lang-badge.it {
            background-color: #fef2f2;
            color: #991b1b;
          }

          .customer-row .customer-language .lang-badge.pt {
            background-color: #ecfdf5;
            color: #065f46;
          }

          .customer-row .customer-language .lang-badge.ru {
            background-color: #f3e8ff;
            color: #5b21b6;
          }

          .customer-row .customer-language .lang-badge.zh {
            background-color: #fefce8;
            color: #854d0e;
          }

          .customer-row .customer-language .lang-badge.ja {
            background-color: #fdf2f8;
            color: #9d174d;
          }

          .customer-row .customer-language .lang-badge.ko {
            background-color: #eef2ff;
            color: #3730a3;
          }

          /* Container for actions dropdown */
          .customer-row .actions-container {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Avatar styles */
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
            .customer-row td {
              padding: 12px;
              font-size: 13px;
            }
          }
        `}
      </style>

      <tr className="customer-row">
        <td>
          <div className="customer-info">
            {customer.profile_photo_url ? (
              <img
                src={customer.profile_photo_url}
                alt={customer.name}
                className="customer-avatar"
              />
            ) : (
              <div className="customer-avatar">
                {customer.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="customer-name">{customer.name}</div>
          </div>
        </td>

        <td className="customer-email">{customer.email}</td>

        <td className="customer-phone">{customer.phone ?? "-"}</td>

        <td>
          <CustomerStatusBadge status={customer.status} />
        </td>

        <td className="customer-language">
          <span className={`lang-badge ${customer.language.toLowerCase()}`}>
            {customer.language.toUpperCase()}
          </span>
        </td>

        <td>
          <div className="actions-container">
            <CustomerActionsDropdown
              customer={customer}
              onView={onView}
              onEdit={onEdit}
              onActivate={onActivate}
              onBlock={onBlock}
            />
          </div>
        </td>
      </tr>
    </>
  );
}