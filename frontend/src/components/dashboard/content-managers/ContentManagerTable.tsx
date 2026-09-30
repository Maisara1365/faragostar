import ContentManagerRow from "@/components/dashboard/content-managers/ContentManagerRow";
import { useLanguage } from "@/context/language-context";
import type { ContentManager } from "@/types/content-manager";

interface ContentManagerTableProps {
  contentManagers: ContentManager[];
  onView: (contentManager: ContentManager) => void;
  onEdit: (contentManager: ContentManager) => void;
  onStatusChanged: () => void;
}

export default function ContentManagerTable({
  contentManagers,
  onView,
  onEdit,
  onStatusChanged,
}: ContentManagerTableProps) {
  const { t } = useLanguage();

  return (
    <div className="rounded-lg border overflow-hidden">
      <style>
        {`
          .content-manager-table {
            width: 100%;
            border-collapse: collapse;
          }

          .content-manager-table thead {
            background-color: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
          }

          .content-manager-table thead th {
            padding: 12px 16px;
            text-align: left;
            font-size: 14px;
            font-weight: 600;
            color: #475569;
            letter-spacing: 0.025em;
            text-transform: uppercase;
            font-size: 12px;
          }

          .content-manager-table tbody tr {
            border-bottom: 1px solid #f1f5f9;
            transition: background-color 0.15s ease;
          }

          .content-manager-table tbody tr:last-child {
            border-bottom: none;
          }

          .content-manager-table tbody tr:hover {
            background-color: #fafbfc;
          }

          .content-manager-table tbody td {
            padding: 16px;
            vertical-align: middle;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .content-manager-table thead th,
            .content-manager-table tbody td {
              padding: 12px;
              font-size: 13px;
            }
          }
        `}
      </style>

      <div className="overflow-x-auto">
        <table className="content-manager-table">
          <thead>
            <tr>
              <th>{t.dashboard.contentManagers.name}</th>
              <th>{t.dashboard.contentManagers.email}</th>
              <th>{t.dashboard.contentManagers.phone}</th>
              <th>{t.dashboard.contentManagers.status}</th>
              <th>{t.dashboard.contentManagers.language}</th>
              <th>{t.dashboard.contentManagers.actions}</th>
            </tr>
          </thead>
          <tbody>
            {contentManagers.map((contentManager) => (
              <ContentManagerRow
                key={contentManager.id}
                contentManager={contentManager}
                onView={onView}
                onEdit={onEdit}
                onStatusChanged={onStatusChanged}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}