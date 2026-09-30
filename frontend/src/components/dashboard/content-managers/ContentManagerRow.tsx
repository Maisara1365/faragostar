"use client";

import ContentManagerStatusBadge from "@/components/dashboard/content-managers/ContentManagerStatusBadge";
import ContentManagerActionsDropdown from "@/components/dashboard/content-managers/ContentManagerActionsDropdown";
import type { ContentManager } from "@/types/content-manager";

interface ContentManagerRowProps {
  contentManager: ContentManager;
  onView: (contentManager: ContentManager) => void;
  onEdit: (contentManager: ContentManager) => void;
  onStatusChanged: () => void;
}

export default function ContentManagerRow({
  contentManager,
  onView,
  onEdit,
  onStatusChanged,
}: ContentManagerRowProps) {
  return (
    <>
      <style>
        {`
          .content-manager-row {
            border-bottom: 1px solid #f1f5f9;
            transition: background-color 0.15s ease;
          }

          .content-manager-row:last-child {
            border-bottom: none;
          }

          .content-manager-row:hover {
            background-color: #fafbfc;
          }

          .content-manager-row td {
            padding: 16px;
            vertical-align: middle;
          }

          .content-manager-row .content-manager-name {
            font-weight: 500;
            color: #0f172a;
          }

          .content-manager-row .content-manager-email {
            color: #475569;
          }

          .content-manager-row .content-manager-phone {
            color: #475569;
          }

          .content-manager-row .content-manager-language {
            color: #475569;
            font-weight: 500;
          }

          .content-manager-row .content-manager-language .lang-badge {
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

          .content-manager-row .content-manager-language .lang-badge.en {
            background-color: #dbeafe;
            color: #1e40af;
          }

          .content-manager-row .content-manager-language .lang-badge.ar {
            background-color: #fef3c7;
            color: #92400e;
          }

          .content-manager-row .content-manager-language .lang-badge.fr {
            background-color: #d1fae5;
            color: #065f46;
          }

          .content-manager-row .content-manager-language .lang-badge.es {
            background-color: #fce7f3;
            color: #9d174d;
          }

          .content-manager-row .content-manager-language .lang-badge.de {
            background-color: #e0e7ff;
            color: #3730a3;
          }

          .content-manager-row .content-manager-language .lang-badge.it {
            background-color: #fef2f2;
            color: #991b1b;
          }

          .content-manager-row .content-manager-language .lang-badge.pt {
            background-color: #ecfdf5;
            color: #065f46;
          }

          .content-manager-row .content-manager-language .lang-badge.ru {
            background-color: #f3e8ff;
            color: #5b21b6;
          }

          .content-manager-row .content-manager-language .lang-badge.zh {
            background-color: #fefce8;
            color: #854d0e;
          }

          .content-manager-row .content-manager-language .lang-badge.ja {
            background-color: #fdf2f8;
            color: #9d174d;
          }

          .content-manager-row .content-manager-language .lang-badge.ko {
            background-color: #eef2ff;
            color: #3730a3;
          }

          /* Container for actions dropdown */
          .content-manager-row .actions-container {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Enhanced Button Styles - Same as AdminRow */
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

          /* Avatar styles */
          .content-manager-avatar {
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

          .content-manager-avatar img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
          }

          .content-manager-info {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .content-manager-row td {
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

      <tr className="content-manager-row">
        <td>
          <div className="content-manager-info">
            {contentManager.profile_photo_url ? (
              <img
                src={contentManager.profile_photo_url}
                alt={contentManager.name}
                className="content-manager-avatar"
              />
            ) : (
              <div className="content-manager-avatar">
                {contentManager.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="content-manager-name">{contentManager.name}</div>
          </div>
        </td>

        <td className="content-manager-email">{contentManager.email}</td>

        <td className="content-manager-phone">{contentManager.phone ?? "-"}</td>

        <td>
          <ContentManagerStatusBadge status={contentManager.status} />
        </td>

        <td className="content-manager-language">
          <span className={`lang-badge ${contentManager.language.toLowerCase()}`}>
            {contentManager.language.toUpperCase()}
          </span>
        </td>

        <td>
          <div className="actions-container">
            <ContentManagerActionsDropdown
              contentManager={contentManager}
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