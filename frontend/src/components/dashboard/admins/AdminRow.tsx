import AdminStatusBadge from "@/components/dashboard/admins/AdminStatusBadge";
import AdminActionsDropdown from "@/components/dashboard/admins/AdminActionsDropdown";
import type { Admin } from "@/types/admin";

interface AdminRowProps {
  admin: Admin;
  onView: (admin: Admin) => void;
  onEdit: (admin: Admin) => void;
  onStatusChanged: () => void;
}

export default function AdminRow({
  admin,
  onView,
  onEdit,
  onStatusChanged,
}: AdminRowProps) {
  return (
    <>
      <style>
        {`
          .admin-row {
            border-bottom: 1px solid #f1f5f9;
            transition: background-color 0.15s ease;
          }

          .admin-row:last-child {
            border-bottom: none;
          }

          .admin-row:hover {
            background-color: #fafbfc;
          }

          .admin-row td {
            padding: 16px;
            vertical-align: middle;
          }

          .admin-row .admin-name {
            font-weight: 500;
            color: #0f172a;
          }

          .admin-row .admin-email {
            color: #475569;
          }

          .admin-row .admin-phone {
            color: #475569;
          }

          .admin-row .admin-language {
            color: #475569;
            font-weight: 500;
          }

          .admin-row .admin-language .lang-badge {
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

          .admin-row .admin-language .lang-badge.en {
            background-color: #dbeafe;
            color: #1e40af;
          }

          .admin-row .admin-language .lang-badge.ar {
            background-color: #fef3c7;
            color: #92400e;
          }

          .admin-row .admin-language .lang-badge.fr {
            background-color: #d1fae5;
            color: #065f46;
          }

          .admin-row .admin-language .lang-badge.es {
            background-color: #fce7f3;
            color: #9d174d;
          }

          .admin-row .admin-language .lang-badge.de {
            background-color: #e0e7ff;
            color: #3730a3;
          }

          .admin-row .admin-language .lang-badge.it {
            background-color: #fef2f2;
            color: #991b1b;
          }

          .admin-row .admin-language .lang-badge.pt {
            background-color: #ecfdf5;
            color: #065f46;
          }

          .admin-row .admin-language .lang-badge.ru {
            background-color: #f3e8ff;
            color: #5b21b6;
          }

          .admin-row .admin-language .lang-badge.zh {
            background-color: #fefce8;
            color: #854d0e;
          }

          .admin-row .admin-language .lang-badge.ja {
            background-color: #fdf2f8;
            color: #9d174d;
          }

          .admin-row .admin-language .lang-badge.ko {
            background-color: #eef2ff;
            color: #3730a3;
          }

          /* Container for actions dropdown */
          .admin-row .actions-container {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .admin-row td {
              padding: 12px;
              font-size: 13px;
            }
          }
        `}
      </style>

      <tr className="admin-row">
        <td>
          <div className="admin-name">{admin.name}</div>
        </td>

        <td className="admin-email">{admin.email}</td>

        <td className="admin-phone">{admin.phone ?? "-"}</td>

        <td>
          <AdminStatusBadge status={admin.status} />
        </td>

        <td className="admin-language">
          <span className={`lang-badge ${admin.language.toLowerCase()}`}>
            {admin.language.toUpperCase()}
          </span>
        </td>

        <td>
          <div className="actions-container">
            <AdminActionsDropdown
              admin={admin}
              onView={onView}
              onEdit={onEdit}
              onStatusChanged={onStatusChanged}
            />
          </div>
        </td>
      </tr>
    </>
  );
}